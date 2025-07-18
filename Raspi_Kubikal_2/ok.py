import time
import struct
import math
import pymysql
from pymodbus.client.sync import ModbusSerialClient as ModbusClient
from datetime import datetime
import serial

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

# Define Registers
REGISTER_POWER = [
    (3203, "active_energy_delivered"),
    (3207, "active_energy_received"),
    (3211, "active_energy_delivered_received"),
    (3215, "active_energy_delivered_minus_received"),
    (3219, "reactive_energy_delivered"),
    (3223, "reactive_energy_received"),
    (3227, "reactive_energy_delivered_received"),
    (3231, "reactive_energy_delivered_minus_received"),
    (3235, "apparent_energy_delivered"),
    (3239, "apparent_energy_received"),
    (3243, "apparent_energy_delivered_received"),
    (3247, "apparent_energy_delivered_minus_received")
]

FLOAT32_REGISTERS = [
    (2999, "current_a"),
    (3001, "current_b"),
    (3003, "current_c"),
    (3005, "current_n"),
    (3009, "current_avg"),
    (3019, "voltage_ab"),
    (3021, "voltage_bc"),
    (3023, "voltage_ca"),
    (3025, "voltage_ll_avg"),
    (3027, "voltage_an"),
    (3029, "voltage_bn"),
    (3031, "voltage_cn"),
    (3035, "voltage_ln_avg"),
    (3053, "active_power_a"),
    (3055, "active_power_b"),
    (3057, "active_power_c"),
    (3059, "active_power_total"),
    (3061, "reactive_power_a"),
    (3063, "reactive_power_b"),
    (3065, "reactive_power_c"),
    (3067, "reactive_power_total"),
    (3069, "apparent_power_a"),
    (3071, "apparent_power_b"),
    (3073, "apparent_power_c"),
    (3075, "apparent_power_total"),
    (3077, "power_factor_a"),
    (3079, "power_factor_b"),
    (3081, "power_factor_c"),
    (3083, "power_factor_total"),
    (3109, "frequency")
]

REGISTER_DATETIME = [
    (1836, "year"),
    (1837, "month"),
    (1838, "day"),
    (1839, "hour"),
    (1840, "minute"),
    (1841, "second"),
    (1842, "millisecond")
]

# Inisialisasi koneksi serial ke ESP32
try:
    ser_esp = serial.Serial(
        port=SERIAL_PORT_ESP,
        baudrate=SERIAL_BAUDRATE_ESP,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1
    )
    print(f"ESP32 serial port {SERIAL_PORT_ESP} initialized at {SERIAL_BAUDRATE_ESP} baud")
except serial.SerialException as e:
    print(f"Failed to initialize ESP32 serial port: {e}")
    ser_esp = None

# Inisialisasi Modbus Client (RTU via USB)
client = ModbusClient(
    method='rtu',
    port=MODBUS_PORT,
    baudrate=MODBUS_BAUDRATE,
    parity=MODBUS_PARITY,
    stopbits=MODBUS_STOPBITS,
    bytesize=MODBUS_BYTESIZE,
    timeout=3
)

# Connect to MySQL
db_connection = pymysql.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME
)

def get_current_table_name():
    """Generate the table name based on the current month and year."""
    now = datetime.now()
    month = now.strftime("%b").lower()
    year = now.strftime("%Y")
    return f"table_energy_listrik_otics_{month}_{year}"

def create_table_if_not_exists(table_name):
    """Create the table with complete structure if it doesn't exist."""
    cursor = db_connection.cursor()
    
    sql = f"""
    CREATE TABLE IF NOT EXISTS `{table_name}` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `active_energy_delivered` BIGINT,
        `active_energy_received` BIGINT,
        `active_energy_delivered_received` BIGINT,
        `active_energy_delivered_minus_received` BIGINT,
        `reactive_energy_delivered` BIGINT,
        `reactive_energy_received` BIGINT,
        `reactive_energy_delivered_received` BIGINT,
        `reactive_energy_delivered_minus_received` BIGINT,
        `apparent_energy_delivered` BIGINT,
        `apparent_energy_received` BIGINT,
        `apparent_energy_delivered_received` BIGINT,
        `apparent_energy_delivered_minus_received` BIGINT,
        `current_a` FLOAT,
        `current_b` FLOAT,
        `current_c` FLOAT,
        `current_n` FLOAT,
        `current_g` FLOAT,
        `current_avg` FLOAT,
        `voltage_ab` FLOAT,
        `voltage_bc` FLOAT,
        `voltage_ca` FLOAT,
        `voltage_ll_avg` FLOAT,
        `voltage_an` FLOAT,
        `voltage_bn` FLOAT,
        `voltage_cn` FLOAT,
        `voltage_ln_avg` FLOAT,
        `active_power_a` FLOAT,
        `active_power_b` FLOAT,
        `active_power_c` FLOAT,
        `active_power_total` FLOAT,
        `reactive_power_a` FLOAT,
        `reactive_power_b` FLOAT,
        `reactive_power_c` FLOAT,
        `reactive_power_total` FLOAT,
        `apparent_power_a` FLOAT,
        `apparent_power_b` FLOAT,
        `apparent_power_c` FLOAT,
        `apparent_power_total` FLOAT,
        `power_factor_a` FLOAT,
        `power_factor_b` FLOAT,
        `power_factor_c` FLOAT,
        `power_factor_total` FLOAT,
        `frequency` FLOAT,
        `year` INT,
        `month` TINYINT,
        `day` TINYINT,
        `hour` TINYINT,
        `minute` TINYINT,
        `second` TINYINT,
        `millisecond` SMALLINT
    );
    """
    
    try:
        cursor.execute(sql)
        db_connection.commit()
        print(f"Table '{table_name}' created or already exists.")
    except pymysql.MySQLError as e:
        print(f"Error creating table '{table_name}':", e)
        db_connection.rollback()
    finally:
        cursor.close()

def read_modbus_register(address, count, is_float=False):
    """Membaca register Modbus dengan penanganan error"""
    try:
        response = client.read_holding_registers(address, count, unit=UNIT_ID)
        
        if response.isError():
            print(f"Modbus error: {response}")
            return None
        
        return response.registers
    
    except Exception as e:
        print(f"Exception reading register {address}: {e}")
        return None

def fetch_modbus_data():
    data = {}

    # Read power registers (64-bit values)
    for address, name in REGISTER_POWER:
        registers = read_modbus_register(address, 4)
        if registers and len(registers) == 4:
            try:
                # Gabungkan 4 register menjadi 64-bit integer
                int64_value = (registers[0] << 48) | (registers[1] << 32) | (registers[2] << 16) | registers[3]
                data[name] = int64_value
            except Exception as e:
                print(f"Error converting registers to int64: {e}")
                data[name] = None
        else:
            print(f"Error reading {name} at address {address}")
            data[name] = None

    # Read float32 registers
    for address, name in FLOAT32_REGISTERS:
        registers = read_modbus_register(address, 2)
        if registers and len(registers) == 2:
            try:
                # Konversi 2 register menjadi float
                byte_data = struct.pack('>HH', registers[0], registers[1])
                float_value = struct.unpack('>f', byte_data)[0]
                
                if math.isnan(float_value):
                    print(f"NaN detected for {name} at address {address}")
                    data[name] = None
                else:
                    data[name] = float_value
            except Exception as e:
                print(f"Error converting registers to float: {e}")
                data[name] = None
        else:
            print(f"Error reading {name} at address {address}")
            data[name] = None

    # Read datetime registers
    for address, name in REGISTER_DATETIME:
        registers = read_modbus_register(address, 1)
        if registers:
            data[name] = registers[0]
        else:
            print(f"Error reading {name} at address {address}")
            data[name] = None

    return data

def insert_data_into_db(data):
    """Insert data into the appropriate table."""
    table_name = get_current_table_name()
    create_table_if_not_exists(table_name)

    cursor = db_connection.cursor()
    
    # Tambahkan current_g sebagai NULL
    data['current_g'] = None
    
    # Prepare data for insertion
    columns = ', '.join([f"`{key}`" for key in data.keys()])
    placeholders = ', '.join(['%s'] * len(data))
    sql = f"INSERT INTO `{table_name}` ({columns}) VALUES ({placeholders})"
    
    try:
        cursor.execute(sql, list(data.values()))
        db_connection.commit()
        print("Data inserted successfully into table:", table_name)
        
        # Kirim data ke ESP32 setelah berhasil disimpan
        send_to_esp32(data)
        
    except pymysql.MySQLError as e:
        print("Error inserting data:", e)
        db_connection.rollback()
    finally:
        cursor.close()

def send_to_esp32(data):
    """Kirim data penting ke ESP32 melalui serial"""
    if ser_esp and ser_esp.is_open:
        try:
            # Format data yang akan dikirim (contoh: data power total)
            power_total = data.get('active_power_total', 0)
            message = f"PWR:{power_total:.2f}\n"
            
            ser_esp.write(message.encode('utf-8'))
            print(f"Sent to ESP32: {message.strip()}")
            
            # Tunggu dan baca respon jika ada
            response = ser_esp.readline().decode('utf-8').strip()
            if response:
                print(f"Received from ESP32: {response}")
                
        except serial.SerialException as e:
            print(f"Error sending to ESP32: {e}")

def main():
    try:
        # Buka koneksi Modbus
        if not client.connect():
            print("Modbus connection failed.")
            return
        
        print("Starting energy monitoring system with Modbus RTU...")
        print(f"Modbus port: {MODBUS_PORT}")
        print(f"Modbus baudrate: {MODBUS_BAUDRATE}")
        print("Press Ctrl+C to stop the program")
        
        while True:
            print("\nReading Modbus data...")
            start_time = time.time()
            data = fetch_modbus_data()
            
            if data:
                print("Data fetched successfully. Inserting into database...")
                insert_data_into_db(data)
                elapsed = time.time() - start_time
                print(f"Cycle completed in {elapsed:.2f} seconds")
            else:
                print("No data fetched from Modbus registers.")
            
            time.sleep(10)
            
    except KeyboardInterrupt:
        print("\nProgram stopped by user")
    except Exception as e:
        print("An error occurred:", e)
    finally:
        print("Closing connections...")
        client.close()
        db_connection.close()
        if ser_esp and ser_esp.is_open:
            ser_esp.close()
            print("ESP32 serial port closed")
        print("All connections closed. Exiting program.")

if __name__ == "__main__":
    main()
