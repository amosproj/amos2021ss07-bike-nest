# flask_web/app.py
from flask import Flask, request
import serial

app = Flask(__name__)
# choose correct port e.g. not clear yet, can be /dev/ttyS0, /dev/serial1 or /dev/serial0 aswell
port = '/dev/ttyAMA0'
baud = 115200

# if needed add constants like this
EOT = bytes.fromhex('04')
ACK = bytes.fromhex('06')
CR = bytes.fromhex('0d')

# check timeout
#ser = serial.Serial(port, baudrate=115200,
#                    timeout=1,
#                    parity=serial.PARITY_NONE)

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
    pass
    # get side left right
    # if gate == left:
        # gate = 1
    # else: 
        # gate = 2
    # TODO: Check status of gate
    # ser.write('$11#01****<cr>'.encode('ascii'))

    # if station locked -> open
    # check response here
    # out = ser.read() # not working code
    # if out=='$11#0<cr>': 
        # ser.write('$01#0102**<cr>'.encode('ascii'))
    # if station unlocked
        # else:
        # if gate open -> close gate
            # ser.write(('$12#0'+gate+****<cr>').encode('ascii'))
            # check response here
            # out = ser.read() # not working code
            # if out=='$12#1<cr>':
                # ser.write(('$02#0'+gate+****<cr>').encode('ascii'))
        # lock station
        # ser.write('$01#0101**<cr>'.encode('ascii'))


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

    # TODO: Check if gate is already open
    # ser.write(('$12#0'+gate+****<cr>').encode('ascii'))
        # check response here
        # out = ser.read() # not working code
        # if out=='$12#1<cr>':
            # ser.write(('$02#0'+gate+****<cr>').encode('ascii'))
        # else:
            # gate was already open

    return '''$02#0{}****<cr>'''.format(gate)


@app.route('/close_gate')
def close_gate():
    gate = request.args.get('gate')

    if gate == 'left':
        gate = 1
    elif gate == 'right':
        gate = 2
    else:
        return "Error, correct Gate was not detected!"

    #TODO: Check if gate is already closed
    # ser.write(('$12#0'+gate+****<cr>').encode('ascii'))
        # check response here
        # out = ser.read() # not working code
        # if out!='$12#1<cr>':
            # ser.write(('$03#0'+gate+****<cr>').encode('ascii'))
        # else:
            # gate was already closed

    return '''$03#0{}****<cr>'''.format(gate)


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
    
    ser.write(('$04#'+spot_number+color+blink_state+'<cr>').encode('ascii'))

@app.route('/get_status_station_lock')
def get_status_station_lock():
    # TODO: Check status of station lock
    # Check if locked or unlocked
    # Return status
    status = 'closed'

    # ser.write('$11#01****<cr>'.encode('ascii'))
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

    # ser.write(('$12#'+gate+'****<cr>').encode('ascii'))
    # out = ser.read() # not working code 
    # if out=='$12#1<cr>':
    #     status = 'open'

    return status

@app.route('/get_status_bikespot')
def get_status_bikespot():
    # TODO: Check status of a bikespot
    # Check if occupied or empty
    # Return status

    status = 'occupied'

    spot = request.args.get('spot_number')
    spot = str(spot).zfill(2)

    ser.write(('$13#'+spot+'****<cr>').encode('ascii'))
    out = ser.read() # not working code 
    if out=='$13#0<cr>':
        status = 'empty'

    return status

@app.route('/get_error_status')
def get_error_status():
    # TODO: Unclear, because errors are not defined yet
    return


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
