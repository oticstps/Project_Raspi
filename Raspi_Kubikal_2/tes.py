import serial
import time

def test_serial_communication(port='/dev/ttyAMA0', baudrate=115200):
    """
    Menguji komunikasi serial dengan mengirim pesan dan menerima balasan
    """
    try:
        ser = serial.Serial(
            port=port,
            baudrate=baudrate,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE,
            bytesize=serial.EIGHTBITS,
            timeout=1
        )
        print(f"Serial port {port} opened at {baudrate} baud")
        
        while True:
            # Kirim pesan test
            message = "Hello ESP32!\n"
            ser.write(message.encode('utf-8'))
            print(f"Sent: {message.strip()}")
            
            # Baca balasan
            response = ser.readline().decode('utf-8').strip()
            if response:
                print(f"Received: {response}")
            
            time.sleep(2)
            
    except serial.SerialException as e:
        print(f"Serial communication error: {e}")
    except KeyboardInterrupt:
        print("\nTest stopped by user")
        if 'ser' in locals() and ser.is_open:
            ser.close()
            print("Serial port closed")

if __name__ == "__main__":
    test_serial_communication()
