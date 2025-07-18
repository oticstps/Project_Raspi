#!/usr/bin/env python3
import time
import struct
import math
import pymysql
from pymodbus.client import ModbusSerialClient as ModbusClient
from datetime import datetime
import serial
import logging
from typing import Dict, Optional, List, Tuple, Union

# Konfigurasi Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s',
    handlers=[
        logging.FileHandler("energy_monitor.log"),
        logging.StreamHandler()
    ]
)

# Konfigurasi Serial untuk ESP32 (GPIO UART)
SERIAL_PORT_ESP = '/dev/ttyAMA0'
SERIAL_BAUDRATE_ESP = 115200

# Konfigurasi Modbus RTU via USB
MODBUS_PORT = '/dev/ttyUSB0'
MODBUS_BAUDRATE = 9600
MODBUS_PARITY = 'N'
MODBUS_STOPBITS = 1
MODBUS_BYTESIZE = 8
UNIT_ID = 1

# MySQL Database Configuration
DB_HOST = 'localhost'
DB_USER = 'otics'
DB_PASSWORD = 'tuanku'
DB_NAME = 'database_energy_area_compressor'

# Define Registers - Hanya register yang diperlukan
REGISTER_POWER: List[Tuple[int, str]] = [
    (3203, "active_energy_delivered"),  # WH yang dihitung untuk pembayaran PLN
    (3207, "active_energy_received"),
    (3215, "active_energy_delivered_minus_received")
]

FLOAT32_REGISTERS: List[Tuple[int, str]] = [
    (3009, "current_avg"),
    (3035, "voltage_ln_avg"),
    (3059, "active_power_total"),
    (3109, "frequency")
]

REGISTER_DATETIME: List[Tuple[int, str]] = [
    (1836, "year"),
    (1837, "month"),
    (1838, "day"),
    (1839, "hour"),
    (1840, "minute"),
    (1841, "second")
]

# Global variables
client: ModbusClient = None
db_connection: pymysql.Connection = None
ser_esp: serial.Serial = None

def initialize_serial_esp32() -> bool:
    """Initialize ESP32 serial connection"""
    global ser_esp
    try:
        ser_esp = serial.Serial(
            port=SERIAL_PORT_ESP,
            baudrate=SERIAL_BAUDRATE_ESP,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE,
            bytesize=serial.EIGHTBITS,
            timeout=1
        )
        logging.info(f"ESP32 serial port {SERIAL_PORT_ESP} initialized at {SERIAL_BAUDRATE_ESP} baud")
        return True
    except serial.SerialException as e:
        logging.error(f"Failed to initialize ESP32 serial port: {e}")
        return False

def initialize_modbus_client() -> ModbusClient:
    """Initialize and return Modbus client"""
    return ModbusClient(
        method='rtu',
        port=MODBUS_PORT,
        baudrate=MODBUS_BAUDRATE,
        parity=MODBUS_PARITY,
        stopbits=MODBUS_STOPBITS,
        bytesize=MODBUS_BYTESIZE,
        timeout=3
    )

def connect_database() -> bool:
    """Connect to MySQL database"""
    global db_connection
    try:
        db_connection = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            autocommit=True
        )
        logging.info("Connected to MySQL database")
        return True
    except pymysql.MySQLError as e:
        logging.error(f"Database connection error: {e}")
        return False

def get_current_table_name() -> str:
    """Generate the table name based on the current month and year."""
    now = datetime.now()
    month = now.strftime("%b").lower()
    year = now.strftime("%Y")
    return f"table_energy_listrik_otics_{month}_{year}"

def create_table_if_not_exists(table_name: str) -> bool:
    """Create the table with simplified structure"""
    if not db_connection:
        if not connect_database():
            return False

    cursor = db_connection.cursor()
    
    sql = f"""
    CREATE TABLE IF NOT EXISTS `{table_name}` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `active_energy_delivered` BIGINT,
        `active_energy_received` BIGINT,
        `active_energy_delivered_minus_received` BIGINT,
        `current_avg` FLOAT,
        `voltage_ln_avg` FLOAT,
        `active_power_total` FLOAT,
        `frequency` FLOAT,
        `year` INT,
        `month` TINYINT,
        `day` TINYINT,
        `hour` TINYINT,
        `minute` TINYINT,
        `second` TINYINT
    );
    """
    
    try:
        cursor.execute(sql)
        db_connection.commit()
        logging.info(f"Table '{table_name}' created or already exists.")
        return True
    except pymysql.MySQLError as e:
        logging.error(f"Error creating table '{table_name}': {e}")
        return False
    finally:
        cursor.close()

def connect_modbus() -> bool:
    """Connect to Modbus device with retry"""
    global client
    if client is None:
        client = initialize_modbus_client()
    
    try:
        if not client.connected:
            if not client.connect():
                logging.error("Modbus connection failed")
                return False
        return True
    except Exception as e:
        logging.error(f"Modbus connection error: {e}")
        return False

def read_modbus_register(address: int, count: int, is_float: bool = False, retries: int = 3) -> Optional[Union[List[int], float]]:
    """Read Modbus register with error handling and retry"""
    for attempt in range(retries):
        try:
            if not connect_modbus():
                time.sleep(1)
                continue
                
            response = client.read_holding_registers(address, count, unit=UNIT_ID)
            
            if response.isError():
                logging.warning(f"Modbus error ({attempt+1}/{retries}): {response}")
                time.sleep(0.5)
                continue
                
            registers = response.registers
            
            if not is_float:
                return registers
                
            # Handle float conversion
            if len(registers) != 2:
                logging.error(f"Expected 2 registers for float, got {len(registers)}")
                return None
                
            # Check for invalid values
            if registers[0] == 0xFFFF and registers[1] == 0xFFFF:
                return None
                
            byte_data = struct.pack('>HH', registers[0], registers[1])
            float_value = struct.unpack('>f', byte_data)[0]
            
            if math.isinf(float_value) or math.isnan(float_value):
                return None
                
            return float_value
            
        except Exception as e:
            logging.error(f"Exception reading register {address} ({attempt+1}/{retries}): {e}")
            time.sleep(1)
    
    logging.error(f"Failed after {retries} attempts for register {address}")
    return None

def fetch_modbus_data() -> Optional[Dict[str, Union[int, float]]]:
    """Fetch all Modbus data with error handling"""
    data: Dict[str, Union[int, float]] = {}

    # Read power registers (64-bit values)
    for address, name in REGISTER_POWER:
        registers = read_modbus_register(address, 4)
        if registers and len(registers) == 4:
            try:
                # Combine 4 registers into 64-bit integer
                int64_value = (registers[0] << 48) | (registers[1] << 32) | (registers[2] << 16) | registers[3]
                data[name] = int64_value
            except Exception as e:
                logging.error(f"Error converting registers to int64 for {name}: {e}")
                data[name] = None
        else:
            logging.warning(f"Error reading {name} at address {address}")
            data[name] = None

    # Read float32 registers
    for address, name in FLOAT32_REGISTERS:
        float_value = read_modbus_register(address, 2, is_float=True)
        if float_value is not None:
            data[name] = float_value
        else:
            logging.warning(f"Error reading {name} at address {address}")
            data[name] = None

    # Read datetime registers
    for address, name in REGISTER_DATETIME:
        registers = read_modbus_register(address, 1)
        if registers:
            data[name] = registers[0]
        else:
            logging.warning(f"Error reading {name} at address {address}")
            data[name] = None

    return data

def validate_data(data: Dict[str, Union[int, float]]) -> bool:
    """Validate essential values before saving"""
    required_keys = [
        'active_energy_delivered',  # Data WH untuk pembayaran PLN
        'voltage_ln_avg', 
        'active_power_total',
        'year',
        'month'
    ]
    
    for key in required_keys:
        if data.get(key) is None:
            logging.warning(f"Missing required value: {key}")
            return False
            
    # Validate value ranges
    if data['voltage_ln_avg'] < 100 or data['voltage_ln_avg'] > 300:
        logging.warning(f"Invalid voltage: {data['voltage_ln_avg']}")
        return False
        
    if data['active_power_total'] < 0:
        logging.warning(f"Invalid power: {data['active_power_total']}")
        return False
        
    return True

def insert_data_into_db(data: Dict[str, Union[int, float]]) -> bool:
    """Insert data into the appropriate table with error handling"""
    global db_connection
    
    # Check database connection
    try:
        db_connection.ping(reconnect=True)
    except Exception:
        if not connect_database():
            return False
    
    table_name = get_current_table_name()
    if not create_table_if_not_exists(table_name):
        return False
    
    cursor = db_connection.cursor()
    
    # Prepare data for insertion
    columns = ', '.join([f"`{key}`" for key in data.keys()])
    placeholders = ', '.join(['%s'] * len(data))
    sql = f"INSERT INTO `{table_name}` ({columns}) VALUES ({placeholders})"
    
    try:
        cursor.execute(sql, list(data.values()))
        db_connection.commit()
        logging.info(f"Data inserted successfully into {table_name}")
        return True
    except pymysql.MySQLError as e:
        logging.error(f"Error inserting data: {e}")
        return False
    finally:
        cursor.close()

def send_to_esp32(data: Dict[str, Union[int, float]]) -> bool:
    """Send WH data to ESP32 in required format: *KUB2,DATA WH,DATA WATT,#"""
    global ser_esp
    
    if ser_esp is None:
        if not initialize_serial_esp32():
            return False
            
    if not ser_esp.is_open:
        try:
            ser_esp.open()
        except serial.SerialException as e:
            logging.error(f"Failed to open ESP32 serial: {e}")
            return False
    
    try:
        # Format data to send
        wh_data = data.get('active_energy_delivered', 0)  # Data WH untuk pembayaran PLN
        watt_data = data.get('active_power_total', 0)     # Data Watt
        
        # Format: *KUB2,DATA WH,DATA WATT,#
        message = f"*KUB2,{wh_data},{watt_data},#\n"
        
        ser_esp.write(message.encode('utf-8'))
        logging.info(f"Sent to ESP32: {message.strip()}")
        
        # Wait for response with timeout
        start = time.time()
        while time.time() - start < 0.5:
            if ser_esp.in_waiting > 0:
                response = ser_esp.readline().decode('utf-8').strip()
                if response:
                    logging.info(f"ESP32 response: {response}")
                break
                
        return True
    except serial.SerialException as e:
        logging.error(f"ESP32 communication error: {e}")
        try:
            ser_esp.close()
        except:
            pass
        return False

def cleanup():
    """Clean up all resources"""
    logging.info("Cleaning up resources...")
    
    if client and client.connected:
        client.close()
        logging.info("Modbus connection closed")
    
    if db_connection:
        db_connection.close()
        logging.info("Database connection closed")
    
    if ser_esp and ser_esp.is_open:
        ser_esp.close()
        logging.info("ESP32 serial port closed")

def main():
    """Main program loop"""
    try:
        # Initialize connections
        if not initialize_serial_esp32():
            logging.warning("ESP32 serial not available, continuing without it")
            
        if not connect_database():
            logging.error("Failed to connect to database")
            return
            
        if not connect_modbus():
            logging.error("Failed to connect to Modbus device")
            return
            
        logging.info("Energy monitoring system started")
        logging.info(f"Modbus port: {MODBUS_PORT}")
        logging.info(f"Modbus baudrate: {MODBUS_BAUDRATE}")
        
        cycle_count = 0
        last_success_time = time.time()
        
        while True:
            cycle_start = time.time()
            cycle_count += 1
            logging.info(f"\nStarting cycle #{cycle_count}")
            
            # Read Modbus data
            data = fetch_modbus_data()
            if not data:
                logging.warning("No data received from Modbus")
                time.sleep(10)
                continue
                
            # Validate and save data
            if validate_data(data):
                if insert_data_into_db(data):
                    last_success_time = time.time()
                    send_to_esp32(data)  # Kirim data ke ESP32
                else:
                    logging.warning("Failed to save data to database")
            else:
                logging.warning("Invalid data skipped")
                
            # Calculate sleep time (10 seconds between cycles)
            elapsed = time.time() - cycle_start
            sleep_time = max(0, 10 - elapsed)
            
            # Log system status
            uptime = time.time() - last_success_time
            logging.info(f"Cycle completed in {elapsed:.2f}s. Uptime: {uptime:.1f}s")
            
            if sleep_time > 0:
                time.sleep(sleep_time)
                
    except KeyboardInterrupt:
        logging.info("\nProgram stopped by user")
    except Exception as e:
        logging.exception("Unexpected error in main loop")
    finally:
        cleanup()
        logging.info("Program exited")

if __name__ == "__main__":
    main()
