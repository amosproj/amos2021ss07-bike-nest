# flask_web/app.py
from flask import Flask, request
import serial
import serial.tools.list_ports as port_list
import time

app = Flask(__name__)
# choose correct port e.g. not clear yet, can be /dev/ttyS0, /dev/serial1 or /dev/serial0 aswell
# port = '/dev/ttyAMA0'
ports = list(port_list.comports())
print(ports)

#port = '/dev/ttyS0'
port = ports[0]
baud = 57600

# if needed add constants like this
EOT = bytes.fromhex('04')
ACK = bytes.fromhex('06')
CR = bytes.fromhex('0d')

ACK_EOT = ACK+EOT

# check timeout
ser = serial.Serial(port, baud,timeout=1, parity=serial.PARITY_NONE)

responseText = "no connection"

# https://www.raspberrypi.org/documentation/configuration/uart.md

def hello():
    print("hello, world")

@app.route('/returnPorts')
def open_connection():
    text = ""
    if ser.isOpen():
        ports = list(port_list.comports())
        responseText = "available ports: " + ports
    return text

@app.route('/openConnection')
def open_connection():
    if ser.isOpen():
        responseText = ser.name + ' is open.'
    responseText = ports
    return responseText

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'


@app.route('/toggle_station_lock')
def toggle_station_lock():
    responseText = "Error!"
    # get side left right
    gate = request.args.get('gate')
    if gate == "left":
        gate = "1"
    else: 
        gate = "2"
    # Check status of station
    ser.write('$11#0'+gate+'****<cr>'.encode('ascii'))
    time.sleep(0.5)
    #if station locked -> open
    out = ser.read() 
    if out ==  ACK + b'$11#0<cr>': 
        ser.write('$01#0'+gate+'02**<cr>'.encode('ascii'))
        time.sleep(0.5)
        # expecting ACK->EOT 
        out = ser.read()  
        if out == ACK_EOT:
            responseText = "Station Unlocked"
        else:
            responseText += " serial response = " + out.decode('ascii')
    # if station unlocked
    elif out ==  ACK + b'$11#1<cr>': 
        # ask gate state
        ser.write(('$12#0'+gate+'****<cr>').encode('ascii'))
        time.sleep(0.5)
        out = ser.read() 
        #if gate open -> close gate
        if out== ACK + b'$12#1<cr>':
            ser.write(('$03#0'+gate+'****<cr>').encode('ascii'))
            time.sleep(0.5)
            out = ser.read() 
            # lock station
            if out == ACK_EOT:
                responseText = "gate closed, station lock unchanged"
                ser.write('$01#0101**<cr>'.encode('ascii'))
                time.sleep(0.5)
                out = ser.read() 

                if out == ACK_EOT:
                   responseText = "gate closed, station locked"
                else:
                    responseText += " serial response = " + out.decode('ascii')
            else:
                responseText += " serial response = " + out.decode('ascii')
        else:
            responseText += " serial response = " + out.decode('ascii')        
    else:
        responseText += " serial response = " + out.decode('ascii')

    return responseText

@app.route('/open_gate')
def open_gate():
    gate = request.args.get('gate')
    responseText = "error"

    # Validate correct gate specifier
    if gate == 'left':
        gate = "1"
    elif gate == 'right':
        gate = "2"
    else:
        return "Error, correct Gate was not detected!"

    #  Check if gate is already open
    ser.write(('$12#0'+gate+'****<cr>').encode('ascii'))
    time.sleep(0.5)

    # check response here
    out = ser.read() 
    if out == ACK + b'$12#1<cr>':
        ser.write(('$02#0'+gate+'****<cr>').encode('ascii'))
        time.sleep(0.5)
        out = ser.read() 

        if out == ACK_EOT:
            responseText = "gate opened"
        else:
            responseText += " serial response = " + out.decode('ascii')
    elif out == ACK + b'$12#0<cr>':
        responseText = "gate was already open"
    else:
        responseText += " serial response = " + out.decode('ascii')

    return responseText


@app.route('/close_gate')
def close_gate():
    gate = request.args.get('gate')
    responseText = "error"

    if gate == 'left':
        gate = 1
    elif gate == 'right':
        gate = 2
    else:
        return "Error, correct Gate was not detected!"

    #Check if gate is already closed
    ser.write(('$12#0'+gate+'****<cr>').encode('ascii'))
    time.sleep(0.5)

    #check response here
    out = ser.read() 
    if out == ACK + '$12#0<cr>':
        responseText += "gate already closed"
    elif out == ACK + '$12#1<cr>':
        ser.write(('$03#0'+gate+'****<cr>').encode('ascii'))
        time.sleep(0.5)
        out = ser.read() 

        if out == ACK_EOT:
            responseText = "gate opened"
        else:
            responseText += " serial response = " + out.decode('ascii')
    else:
        responseText += " serial response = " + out.decode('ascii')
    return '''$03#0{}****<cr>'''.format(gate)


# @app.route('/show_booked_spot')
# def show_booked_spot():
#     spot_number = request.args.get('spot_number')
#     rgb_value = request.args.get('rgb_value')
#     blink_state = request.args.get('blink_state')

#     #nn = number of spot [1 - 20]
#     #rgb = color of LED [0 == off, 1 == on]
#     #b = LED state [0 == off, 1 == blink]
#     return '''$04#{}{}{}<cr>'''.format(spot_number, rgb_value, blink_state)

@app.route('/set_spot_reserved')
def set_spot_reserved():
    responseText = "error"

    spot_number = request.args.get('spot_number')
    color = request.args.get('rgb_value')
    blink_state = request.args.get('blink_state')

    spot_number = str(spot_number).zfill(2)
    
    ser.write(('$04#'+spot_number+color+blink_state+'<cr>').encode('ascii'))
    time.sleep(0.5)
    out = ser.read()
    if out == ACK_EOT:
            responseText = "gate opened"
    else:
        responseText += " serial response = " + out.decode('ascii')

    return responseText

@app.route('/get_status_station_lock')
def get_status_station_lock():
    responseText = 'error'

    # Check if locked or unlocked
    ser.write('$11#01****<cr>'.encode('ascii'))
    time.sleep(0.5)

    # check response here
    out = ser.read() 
    if out=='$11#1<cr>':
        responseText = 'open'
    elif out=='$11#0<cr>':
        responseText = 'closed'
    else:
        responseText += " serial response = " + out.decode('ascii')
    return responseText

@app.route('/get_status_gate_position')
def get_status_gate_position():
    responseText = 'error'

    gate = request.args.get('gate')

    if gate == 'left':
        gate = 1
    elif gate == 'right':
        gate = 2
    else:
        return "Error, correct Gate was not detected!"

    # Check if open or closed
    ser.write(('$12#'+gate+'****<cr>').encode('ascii'))
    time.sleep(1)

    out = ser.read()
    if out=='$12#1<cr>':
         responseText = 'open'
    elif out=='$12#0<cr>':
         responseText = 'closed'
    else:
        responseText += " serial response = " + out.decode('ascii')    

    return responseText

@app.route('/get_status_bikespot')
def get_status_bikespot():
    responseText = 'error'

    spot = request.args.get('spot_number')
    spot = str(spot).zfill(2)

    # Check if occupied or empty
    ser.write(('$13#'+spot+'****<cr>').encode('ascii'))
    time.sleep(0.5)    
    out = ser.read()  
    if out=='$13#0<cr>':
        responseText = 'empty'
    elif out =='$13#1<cr>':
        responseText = 'occupied'
    else:
        responseText += " serial response = " + out.decode('ascii') 
    return responseText

@app.route('/get_error_status')
def get_error_status():
    # TODO: Unclear, because errors are not defined yet
    return

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')