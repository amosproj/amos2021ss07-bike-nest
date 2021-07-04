# flask_web/app.py
from flask import Flask, request
import serial

app = Flask(__name__)

# IF RASPI USE BELOW INSTEAD OF LINE 13 !!
port = '/dev/serial0'

# ports = list(port_list.comports())
# print(ports)
# port = ports[0].name
baud = 57600

# if needed add constants like this
EOT = bytes.fromhex('04')
ACK = bytes.fromhex('06')
CR = bytes.fromhex('0d')

# check timeout
ser = serial.Serial(port, baudrate=115200,
                    timeout=1,
                    parity=serial.PARITY_NONE)

responseText = "no connection"

# https://www.raspberrypi.org/documentation/configuration/uart.md


@app.route('/openConnection')
def open_connection():
    if ser.isOpen():
        responseText = ser.name + ' is open.'

    return responseText


@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'


@app.route('/toggle_station_lock')
def toggle_station_lock():
    # get side left right
    gate = request.args.get('gate')
    if gate == "left":
        gate = "1"
    else: 
        gate = "2"
    # Check status of station
    ser.reset_input_buffer()
    cmd = '$11#0'+gate+'****'
    for i in cmd:
        time.sleep(0.01)
        ser.write(i.encode())
    time.sleep(0.01)
    ser.write(CR)
    #ser.write('$11#0'+gate+'****'.encode('ascii')+CR)
    #if station locked -> open
    out = ser.read(7) 
    if out ==  ACK + b'$11#0'+CR:
        ser.reset_input_buffer()
        cmd = '$01#0'+gate+'02**'
        for i in cmd:
            time.sleep(0.01)
            ser.write(i.encode())
        time.sleep(0.01)
        ser.write(CR)
        #ser.write('$01#0'+gate+'02**'.encode('ascii')+CR)
        # expecting ACK->EOT 
        out = ser.read(2)  
        if out == ACK_EOT:
            responseText = "Station Unlocked"
        else:
            responseText += " serial response = " + out.decode('ascii')
    # if station unlocked
    elif out ==  ACK + b'$11#1'+CR: 
        # ask gate state
        ser.reset_input_buffer()
        cmd = '$12#0'+gate+'****'
        for i in cmd:
            time.sleep(0.01)
            ser.write(i.encode())
        time.sleep(0.01)
        ser.write(CR)
        #ser.write(('$12#0'+gate+'****').encode('ascii')+CR)
        out = ser.read(7) 
        #if gate open -> close gate
        if out== ACK + b'$12#1'+CR:
            ser.reset_input_buffer()
            cmd = '$03#0'+gate+'****'
            for i in cmd:
                time.sleep(0.01)
                ser.write(i.encode())
            time.sleep(0.01)
            ser.write(CR)
            #ser.write(('$03#0'+gate+'****').encode('ascii')+CR)
            out = ser.read(2) 
            # lock station
            if out == ACK_EOT:
                responseText = "gate closed, station lock unchanged"
                ser.reset_input_buffer()
                cmd = '$01#0101**'
                for i in cmd:
                    time.sleep(0.01)
                    ser.write(i.encode())
                time.sleep(0.01)
                ser.write(CR)
                #ser.write('$01#0101**'.encode('ascii')+CR)
                out = ser.read(2) 

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


@app.route('/open_gate')
def open_gate():
    gate = request.args.get('gate')

    # Validate correct gate specifier
    if gate == 'left':
        gate = 1
    elif gate == 'right':
        gate = 2
    else:
        return "Error, correct Gate was not detected!"

    #  Check if gate is already open
    ser.reset_input_buffer()
    cmd = '$12#0'+gate+'****'
    for i in cmd:
        time.sleep(0.01)
        ser.write(i.encode())
    time.sleep(0.01)
    ser.write(CR)
    #ser.write(('$12#0'+gate+'****').encode('ascii')+CR)

    # check response here
    out = ser.read(7) 
    if out == ACK + b'$12#1'+CR:
        ser.reset_input_buffer()
        cmd = '$02#0'+gate+'****'
        for i in cmd:
            time.sleep(0.01)
            ser.write(i.encode())
        time.sleep(0.01)
        ser.write(CR)
        #ser.write(('$02#0'+gate+'****').encode('ascii')+CR)
        out = ser.read(2) 

        if out == ACK_EOT:
            responseText = "gate opened"
        else:
            if out.decode('ascii') == "":
                responseText += " TIMEOUT"
            else:
                responseText += " inner serial response = " + out.decode('ascii')
    elif out == ACK + b'$12#0'+CR:
        responseText = "gate was already open"
    else:
        if out.decode('ascii') == "":
            responseText += " TIMEOUT"
        else:
            responseText += " outer serial response = " + out.decode('ascii')

    return responseText


@app.route('/close_gate')
def close_gate():
    gate = request.args.get('gate')

    if gate == 'left':
        gate = 1
    elif gate == 'right':
        gate = 2
    else:
        return "Error, correct Gate was not detected!"

    #Check if gate is already closed
    ser.reset_input_buffer()

    cmd = '$12#0'+gate+'****'
    for i in cmd:
        time.sleep(0.01)
        ser.write(i.encode())
    time.sleep(0.01)
    ser.write(CR)
    #ser.write(('$12#0'+gate+'****').encode('ascii')+CR)

    #check response here
    out = ser.read(7) 
    if out == ACK + b'$12#0'+CR:
        responseText += " gate already closed"
    elif out == ACK + b'$12#1'+CR:
        ser.reset_input_buffer()
        cmd = '$03#0'+gate+'****'
        for i in cmd:
            time.sleep(0.01)
            ser.write(i.encode())
        time.sleep(0.01)
        ser.write(CR)
        #ser.write(('$03#0'+gate+'****').encode('ascii')+CR)
        out = ser.read(2) 

        if out == ACK_EOT:
            responseText = "gate closed"
        else:
            if out.decode('ascii') == "":
                responseText += " TIMEOUT"
            else:
                responseText += " serial response = " + out.decode('ascii')
    else:
        if out.decode('ascii') == "":
            responseText += " TIMEOUT"
        else:
            responseText += " serial response = " + out.decode('ascii')
    return responseText


@app.route('/show_booked_spot')
def show_booked_spot():
    spot_number = request.args.get('spot_number')
    rgb_value = request.args.get('rgb_value')
    blink_state = request.args.get('blink_state')

    #nn = number of spot [1 - 20]
    #rgb = color of LED [0 == off, 1 == on]
    #b = LED state [0 == off, 1 == blink]
    # niko: checke nicht ganz was wir hier machen sollen
    return '''$04#{}{}{}<cr>'''.format(spot_number, rgb_value, blink_state)

@app.route('/set_spot_reserved')
def set_spot_reserved():
    spot_number = request.args.get('spot_number')
    color = request.args.get('rgb_value')
    blink_state = request.args.get('blink_state')

    spot_number = str(spot_number).zfill(2)
    
    ser.reset_input_buffer()
    cmd = '$04#'+spot_number+color+blink_state
    for i in cmd:
        time.sleep(0.01)
        ser.write(i.encode())
    time.sleep(0.01)
    ser.write(CR)
    #ser.write(('$04#'+spot_number+color+blink_state).encode('ascii')+CR)
    out = ser.read(2)
    if out == ACK_EOT:
            responseText = "light on"
    else:
        if out.decode('ascii') == "":
            responseText += " TIMEOUT"
        else:
            responseText += " serial response = " + out.decode('ascii')

    return responseText

@app.route('/get_status_station_lock')
def get_status_station_lock():
    # TODO: Check status of station lock
    # Check if locked or unlocked
    ser.reset_input_buffer()
    cmd = '$11#01****'
    for i in cmd:
        time.sleep(0.01)
        ser.write(i.encode())
    time.sleep(0.01)
    ser.write(CR)
    #ser.write('$11#01****'.encode('ascii')+CR)
    # check response here
        # out = ser.read() # not working code
        # if out=='$11#1<cr>':
            # status = 'open'
    return status

@app.route('/get_status_gate_position')
def get_status_gate_position():
    # TODO: Check status of gate position
    # Check if open or closed
    # Return status
    status = 'closed'

    gate = request.args.get('gate')

    if gate == 'left':
        gate = 1
    elif gate == 'right':
        gate = 2
    else:
        return "Error, correct Gate was not detected!"

    # Check if open or closed
    ser.reset_input_buffer()

    cmd = '$12#0'+gate+'****'
    for i in cmd:
        time.sleep(0.01)
        ser.write(i.encode())
    time.sleep(0.01)
    ser.write(CR)
    #ser.write(('$12#0'+gate+'****').encode('ascii')+CR)
    
    out = ser.read(7)
    if out==ACK+b'$12#1'+CR:
         responseText = 'open'
    elif out==ACK+b'$12#0'+CR:
         responseText = 'closed'
    else:
        if out.decode('ascii') == "":
            responseText += " TIMEOUT"
        else:
            responseText += " serial response = " + out.decode('ascii')

    return status

@app.route('/get_status_bikespot')
def get_status_bikespot():
    # TODO: Check status of a bikespot
    # Check if occupied or empty
    # Return status

    status = 'occupied'

    spot = request.args.get('spot_number')
    spot = str(spot).zfill(2)

    # Check if occupied or empty
    ser.reset_input_buffer()
    cmd = '$13#'+spot+'****'
    for i in cmd:
        time.sleep(0.01)
        ser.write(i.encode())
    time.sleep(0.01)
    ser.write(CR)
    #ser.write(('$13#'+spot+'****').encode('ascii')+CR)

    out = ser.read(7)  
    if out==ACK + b'$13#0'+CR:
        responseText = 'empty'
    elif out == ACK + b'$13#1'+CR:
        responseText = 'occupied'
    else:
        if out.decode('ascii') == "":
            responseText += " TIMEOUT"
        else:
            responseText += " serial response = " + out.decode('ascii')
    return responseText

@app.route('/get_error_status')
def get_error_status():
    # TODO: Unclear, because errors are not defined yet
    return


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
