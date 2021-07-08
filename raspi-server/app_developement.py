# flask_web/app.py
from flask import Flask, request
import serial
import serial.tools.list_ports as port_list
import time

app = Flask(__name__)

responseText = "no connection"

station_open = False
gate_left_open = False
gate_right_open = False
lock_left_open = False
lock_right_open = False

spot_dict = {}
for x in range(1,21):
  spot_dict[str(x)] = "1"

@app.route('/openConnection')
def open_connection():

    responseText = 'connection is open.'
    return responseText

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'


@app.route('/open_stationlock')
def open_stationlock():
    global lock_left_open, lock_right_open, gate_left_open, gate_right_open
    gate = request.args.get('gate')
    if gate == 'left':
        lock_left_open = True
        return "1"
    elif gate == 'right':
        lock_right_open = True
        return "1"
    else:
        return "0"

@app.route('/close_stationlock')
def close_stationlock():
    global lock_left_open, lock_right_open, gate_left_open, gate_right_open
    gate = request.args.get('gate')
    if gate == 'left':
        lock_left_open = False
        return "1"
    elif gate == 'right':
        lock_right_open = False
        return "1"
    else:
        return "0"

@app.route('/open_gate')
def open_gate():
    global lock_left_open, lock_right_open, gate_left_open, gate_right_open
    gate = request.args.get('gate')

    if gate == 'left':
        if lock_left_open == False:
            return "0"
        gate_left_open = True
        return "1"
    elif gate == 'right':
        if lock_right_open == False:
            return "0"
        gate_right_open = True
        return "1"
    else:
        return "0"

@app.route('/close_gate')
def close_gate():
    global lock_left_open, lock_right_open, gate_left_open, gate_right_open
    gate = request.args.get('gate')

    if gate == 'left':
        if lock_left_open == False:
            return "0"
        gate_left_open = False
        return "1"
    elif gate == 'right':
        if lock_right_open == False:
            return "0"
        gate_right_open = False
        return "1"
    else:
        return "0"


# @app.route('/show_booked_spot')
# def show_booked_spot():
#     spot_number = request.args.get('spot_number')
#     rgb_value = request.args.get('rgb_value')
#     blink_state = request.args.get('blink_state')

#     #nn = number of spot [1 - 20]
#     #rgb = color of LED [0 == off, 1 == on]
#     #b = LED state [0 == off, 1 == blink]
#     return '''$04#{}{}{}+CR'''.format(spot_number, rgb_value, blink_state)

@app.route('/set_spot_reserved')
def set_spot_reserved():
    responseText = "error"

    spot_number = request.args.get('spot_number')
    color = request.args.get('rgb_value')
    blink_state = request.args.get('blink_state')

    try:
        spot_dict[spot_number] = "0"
    except:
        return "spots only from 1 - 20"

    responseText = "spot for number " + spot_number + " is now " + spot_dict[spot_number]
    return responseText

@app.route('/get_status_station_lock')
def get_status_station_lock():
    responseText = 'error'

    responseText = "station open: " + str(station_open)
    return responseText

@app.route('/get_status_gate_position')
def get_status_gate_position():
    responseText = 'error'

    gate = request.args.get('gate')

    if gate == 'left':
        gate = '1'
    elif gate == 'right':
        gate = '2'
    else:
        return "Error, correct Gate was not detected!"

    if(gate == "1"):
        return "gate left open: " + str(gate_left_open )
    else:
        return "gate right open: " + str(gate_right_open)


@app.route('/get_status_bikespot')
def get_status_bikespot():
    responseText = 'error'

    spot = request.args.get('spot_number')
    # Check if occupied or empty
    try:
        spot_check = spot_dict[spot]
    except:
        return "spots only from 1 - 20"

    return spot_check

@app.route('/get_error_status')
def get_error_status():
    # TODO: Unclear, because errors are not defined yet
    return

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')