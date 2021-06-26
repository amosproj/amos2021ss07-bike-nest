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
spot_dict = {}
for x in range(1,21):
  spot_dict[str(x)] = "empty"

@app.route('/openConnection')
def open_connection():

    responseText = 'connection is open.'
    return responseText

@app.route('/')
def hello_world():
    return 'Hey, we have Flask in a Docker container!'

@app.route('/toggle_station_lock')
def toggle_station_lock():
    global station_open, gate_left_open, gate_right_open
    responseText = "Error!"
    # get side left right
    gate = request.args.get('gate')

    if gate == "left":
        gate = "1"
    elif gate == 'right':
        gate = "2"
    else:
        return "Error, correct Gate was not detected!"

    if(gate_left_open or gate_right_open):
        gate_left_open = False
        gate_right_open = False
    
    station_open = not station_open

    return "Station open: " + str(station_open)

@app.route('/open_gate')
def open_gate():
    global station_open, gate_left_open, gate_right_open
    gate = request.args.get('gate')
    left=False
    responseText = "error"

    # Validate correct gate specifier
    if gate == 'left':
        gate = "1"
        left=True
    elif gate == 'right':
        gate = "2"
    else:
        return "Error, correct Gate was not detected!"

    if(gate == "1"):
        gate_left_open = True
        return "gate left open: " + str(gate_left_open )
    else:
        gate_right_open =True
        return "gate right open: " + str(gate_right_open)

@app.route('/close_gate')
def close_gate():
    global station_open, gate_left_open, gate_right_open
    gate = request.args.get('gate')
    responseText = "error"

    if gate == 'left':
        gate = '1'
    elif gate == 'right':
        gate = '2'
    else:
        return "Error, correct Gate was not detected!"

    if(gate == "1"):
        gate_left_open = False
        return "gate left open: " + str(gate_left_open )
    else:
        gate_right_open = False
        return "gate right open: " + str(gate_right_open)


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
        spot_dict[spot_number] = "occupied"
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

    responseText = "spot for number " + spot + " is " + spot_check
    return responseText

@app.route('/get_error_status')
def get_error_status():
    # TODO: Unclear, because errors are not defined yet
    return

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')