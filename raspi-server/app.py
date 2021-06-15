# flask_web/app.py

from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def hello_world ():
    return 'Hey, we have Flask in a Docker container!'

@app.route('/toggle_station_lock')
def toggle_station_lock():
    # TODO: Check status of gate
    # if station locked -> open
    # if station unlocked
        # if gate open -> close gate
        # lock station

@app.route('/open_gate')
def open_gate():
    gate = request.args.get('gate')

    # TODO: Check if gate is already open
    
    # Validate correct gate specifier
    if gate == 'left':
        gate = 1
    elif gate == 'right':
        gate = 2
    else: 
        return "Error, correct Gate was not detected!"

    return '''$02#0{}****<cr>'''.format(gate)

@app.route('/close_gate')
def close_gate():
    gate = request.args.get('gate')

    #TODO: Check if gate is already closed

    if gate == 'left':
        gate = 1
    elif gate == 'right':
        gate = 2
    else: 
        return "Error, correct Gate was not detected!"

    return '''$03#0{}****<cr>'''.format(gate)

@app.route('/show_booked_spot')
def show_booked_spot():
    spot_number = request.args.get('spot_number')
    rgb_value = request.args.get('rgb_value')
    blink_state = request.args.get('blink_state')
    
    #nn = number of spot [1 - 20]
    #rgb = color of LED [0 == off, 1 == on]
    #b = LED state [0 == off, 1 == blink]
    return '''$04#{}{}{}<cr>'''.format(spot_number, rgb_value, blink_state)

def get_status_station_lock():
    # TODO: Check status of station lock
    # Check if locked or unlocked
    # Return status
    return 

def get_status_gate_position():
    # TODO: Check status of gate position
    # Check if open or closed
    # Return status
    return

def get_status_bikespot():
    # TODO: Check status of a bikespot
    # Check if occupied or empty
    # Return status
    return

def get_error_status():
    # TODO: Unclear, because errors are not defined yet
    return

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
