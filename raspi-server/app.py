# flask_web/app.py
from os import stat
from flask import Flask, request
import serial
import serial.tools.list_ports as port_list
import time

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
ACK_EOT = ACK+EOT

STATION_IS_LOCKED = ACK + b'$11#1'+CR
STATION_IS_OPEN = ACK + b'$11#0'+CR
GATE_IS_OPEN = ACK + b'$12#1'+CR
GATE_IS_CLOSED = ACK + b'$12#0'+CR
SPOT_OCCUPIED = ACK + b'$13#1'+CR
SPOT_EMPTY = ACK + b'$13#0'+CR



# check timeout
ser = serial.Serial(port, baud,timeout=6, parity=serial.PARITY_NONE)

responseText = "no connection"

# https://www.raspberrypi.org/documentation/configuration/uart.md

def send_on_serial(message):
    ser.reset_output_buffer()
    for i in message:
        time.sleep(0.01)
        ser.write(i.encode())
    time.sleep(0.01)
    ser.write(CR)

def check_response(expected_message, expected_bytes):
    ser.reset_input_buffer()
    time.sleep(0.01)
    out = ser.read(expected_bytes)
    print(out)
    print (expected_message)
    if out == expected_message:
        return 1
    else:
        return 0

def check_gate_from_url(gate_arg):
    gate="none"
    if gate_arg == 'left':
        gate = "1"
    elif gate_arg == 'right':
        gate = "2"
    return gate

def check_hardware_state(cmd, expected_response, expected_bytes ):
    status_code = 0
    count = 0
    while(status_code==0 and count<20):
        send_on_serial(cmd)
        status_code = check_response(expected_response,expected_bytes)
        time.sleep(0.5)
        count += 1
    return status_code

@app.route('/returnPorts')
def returnPorts():
    responseText = "available ports: "
    if ser.isOpen():
        ports = list(port_list.comports())
        for port in ports:
            responseText+= port.name
    return responseText

@app.route('/openConnection')
def open_connection():
    if ser.isOpen():
        responseText = ser.name + ' is open.'
    return responseText

@app.route('/')
def hello_world():
    return 'Connected to the PI!'

@app.route('/close_stationlock')
def close_stationlock():
    # should we check if gate is closed here?   ##########################################################################
    gate="1"
    cmd = '$01#0101**'
    send_on_serial(cmd)
    status_code = check_response(ACK_EOT, 2)
    if(status_code == 1):
        cmd = '$11#0'+gate+'****'
        time.sleep(0.5)
        status_code = check_hardware_state(cmd, STATION_IS_LOCKED, 7 )
    return str(status_code)

@app.route('/open_stationlock')
def open_stationlock():
    # should we check if gate is closed here?   ##########################################################################
    gate="1"
    cmd = '$01#0102**'
    send_on_serial(cmd)
    status_code = check_response(ACK_EOT, 2)
    if(status_code == 1):
        print("open command angekommen")
        cmd = '$11#0'+gate+'****'
        time.sleep(0.5)
        status_code = check_hardware_state(cmd, STATION_IS_OPEN, 7 )
        print("Lock open: " + str(status_code))
    else:
        print("schief gegangen")
    return str(status_code)

# @app.route('/toggle_station_lock')
# def toggle_station_lock():
#     responseText = "Error!"
#     # get side left right
#     gate = request.args.get('gate')
#     if gate == "left":
#         gate = "1"
#     else: 
#         gate = "2"
#     # Check status of station
#     ser.reset_input_buffer()
#     cmd = '$11#0'+gate+'****'
#     for i in cmd:
#         time.sleep(0.01)
#         ser.write(i.encode())
#     time.sleep(0.01)
#     ser.write(CR)
#     #ser.write('$11#0'+gate+'****'.encode('ascii')+CR)
#     #if station locked -> open
#     out = ser.read(7) 
#     if out ==  ACK + b'$11#1'+CR:
#         ser.reset_input_buffer()
#         cmd = '$01#0'+gate+'02**'
#         for i in cmd:
#             time.sleep(0.01)
#             ser.write(i.encode())
#         time.sleep(0.01)
#         ser.write(CR)
#         #ser.write('$01#0'+gate+'02**'.encode('ascii')+CR)
#         # expecting ACK->EOT 
#         out = ser.read(2)  
#         if out == ACK_EOT:
#             responseText = "Station Unlocked"
#         else:
#             responseText += " serial response = " + out.decode('ascii')
#     # if station unlocked
#     elif out ==  ACK + b'$11#0'+CR: 
#         # ask gate state
#         ser.reset_input_buffer()
#         cmd = '$12#0'+gate+'****'
#         for i in cmd:
#             time.sleep(0.01)
#             ser.write(i.encode())
#         time.sleep(0.01)
#         ser.write(CR)
#         #ser.write(('$12#0'+gate+'****').encode('ascii')+CR)
#         out = ser.read(7) 
#         #if gate open -> close gate
#         if out== ACK + b'$12#1'+CR:
#             ser.reset_input_buffer()
#             cmd = '$03#0'+gate+'****'
#             for i in cmd:
#                 time.sleep(0.01)
#                 ser.write(i.encode())
#             time.sleep(0.01)
#             ser.write(CR)
#             #ser.write(('$03#0'+gate+'****').encode('ascii')+CR)
#             out = ser.read(2) 
#             # lock station
#             if out == ACK_EOT:
#                 responseText = "gate closed, station lock unchanged"
#                 ser.reset_input_buffer()
#                 # TODO WAIT FOR DOOR CLOSED
#                 cmd = '$01#0101**'
#                 for i in cmd:
#                     time.sleep(0.01)
#                     ser.write(i.encode())
#                 time.sleep(0.01)
#                 ser.write(CR)
#                 #ser.write('$01#0101**'.encode('ascii')+CR)
#                 out = ser.read(2) 

#                 if out == ACK_EOT:
#                    responseText = "gate closed, station locked"
#                 else:
#                     responseText += " serial response = " + out.decode('ascii')
#             else:
#                 responseText += " serial response = " + out.decode('ascii')
#         else:
#             responseText += " serial response = " + out.decode('ascii')        
#     else:
#         responseText += " serial response = " + out.decode('ascii')

#     return responseText

@app.route('/open_gate')
def open_gate():
    #gate_arg = request.args.get('gate')
    #status_code = 0
    #gate = check_gate_from_url(gate_arg)
    #if(gate != "1" and gate != "2"):
    #    print("correct gate was not detected")
    #    return "0"
    gate="1"
    cmd = '$02#0'+gate+'****'
    send_on_serial(cmd)
    status_code = check_response(ACK_EOT,2)
    if(status_code == 1):
        print("opening gate now")
        cmd = '$12#0'+gate+'****'
        status_code = check_hardware_state(cmd, GATE_IS_OPEN, 7 )
        print("gate open: " + str(status_code))
    return str(status_code)

# @app.route('/open_gate_old')
# def open_gate_old():
#     gate_arg = request.args.get('gate')
#     responseText = "error"
#     status_code = 0
#     gate = check_gate(gate_arg)
#     if(gate != "1" or gate != "2"):
#         return "Error, correct Gate was not detected!"

#     #  Check if gate is already open
#     cmd = '$12#0'+gate+'****'
#     send_on_serial(cmd)
#     #ser.write(('$12#0'+gate+'****').encode('ascii')+CR)

#     # check response here
#     out = ser.read(7) 
#     if out == ACK + b'$12#0'+CR:
#         ser.reset_input_buffer()
#         cmd = '$02#0'+gate+'****'
#         for i in cmd:
#             time.sleep(0.01)
#             ser.write(i.encode())
#         time.sleep(0.01)
#         ser.write(CR)
#         #ser.write(('$02#0'+gate+'****').encode('ascii')+CR)
#         out = ser.read(2) 

#         if out == ACK_EOT:
#             responseText = "gate opened"
#         else:
#             if out.decode('ascii') == "":
#                 responseText += " TIMEOUT"
#             else:
#                 responseText += " inner serial response = " + out.decode('ascii')
#     elif out == ACK + b'$12#1'+CR:
#         responseText = "gate was already open"
#     else:
#         if out.decode('ascii') == "":
#             responseText += " TIMEOUT"
#         else:
#             responseText += " outer serial response = " + out.decode('ascii')

#     return responseText

@app.route('/close_gate')
def close_gate():
    gate_arg = request.args.get('gate')
    status_code = 0
    gate = check_gate_from_url(gate_arg)
    if(gate != "1" and gate != "2"):
        print("correct gate was not detected")
        return "0"

    cmd = '$03#0'+gate+'****'
    send_on_serial(cmd)
    status_code = check_response(ACK_EOT,2)
    if(status_code == 1):
        cmd = '$12#0'+gate+'****'
        status_code = check_hardware_state(cmd, GATE_IS_CLOSED, 7 )
    return str(status_code)

# @app.route('/close_gate_old')
# def close_gate_old():
#     gate = request.args.get('gate')
#     responseText = "error"

#     if gate == 'left':
#         gate = '1'
#     elif gate == 'right':
#         gate = '2'
#     else:
#         return "Error, correct Gate was not detected!"

#     #Check if gate is already closed
#     ser.reset_input_buffer()

#     cmd = '$12#0'+gate+'****'
#     for i in cmd:
#         time.sleep(0.01)
#         ser.write(i.encode())
#     time.sleep(0.01)
#     ser.write(CR)
#     #ser.write(('$12#0'+gate+'****').encode('ascii')+CR)

#     #check response here
#     out = ser.read(7) 
#     if out == ACK + b'$12#0'+CR:
#         responseText += " gate already closed"
#     elif out == ACK + b'$12#1'+CR:
#         ser.reset_input_buffer()
#         cmd = '$03#0'+gate+'****'
#         for i in cmd:
#             time.sleep(0.01)
#             ser.write(i.encode())
#         time.sleep(0.01)
#         ser.write(CR)
#         #ser.write(('$03#0'+gate+'****').encode('ascii')+CR)
#         out = ser.read(2) 

#         if out == ACK_EOT:
#             responseText = "gate closed"
#         else:
#             if out.decode('ascii') == "":
#                 responseText += " TIMEOUT"
#             else:
#                 responseText += " serial response = " + out.decode('ascii')
#     else:
#         if out.decode('ascii') == "":
#             responseText += " TIMEOUT"
#         else:
#             responseText += " serial response = " + out.decode('ascii')
#     return responseText


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
    status_code = 0
    #spot_number = request.args.get('spot_number')
    color = request.args.get('rgb_value')
    blink_state = request.args.get('blink_state')
    print(blink_state)
    spot_number = "01"
    if(blink_state=="true"):
        blink_state="1"
    else:
        blink_state="0"
    cmd = '$04#'+spot_number+color+blink_state
    send_on_serial(cmd)
    status_code = check_response(ACK_EOT,2)
    print("reservation: " + str(status_code))
    return str(status_code)

# @app.route('/set_spot_reserved_old')
# def set_spot_reserved_old():
#     responseText = "error"

#     spot_number = request.args.get('spot_number')
#     color = request.args.get('rgb_value')
#     blink_state = request.args.get('blink_state')
#     spot_number = str(spot_number).zfill(2)
    
#     ser.reset_input_buffer()
#     cmd = '$04#'+spot_number+color+blink_state
#     for i in cmd:
#         time.sleep(0.01)
#         ser.write(i.encode())
#     time.sleep(0.01)
#     ser.write(CR)
#     #ser.write(('$04#'+spot_number+color+blink_state).encode('ascii')+CR)
#     out = ser.read(2)
#     if out == ACK_EOT:
#             responseText = "light on"
#     else:
#         if out.decode('ascii') == "":
#             responseText += " TIMEOUT"
#         else:
#             responseText += " serial response = " + out.decode('ascii')

#     return responseText

@app.route('/get_status_station_lock')
def get_status_station_lock():
    cmd = '$11#01****'
    send_on_serial(cmd)
    status_code = check_response(STATION_IS_OPEN, 7)
    print(status_code)
    return str(status_code)


# @app.route('/get_status_station_lock_old')
# def get_status_station_lock_old():
    # responseText = 'error'

    # # Check if locked or unlocked
    # ser.reset_input_buffer()
    # cmd = '$11#01****'
    # for i in cmd:
    #     time.sleep(0.01)
    #     ser.write(i.encode())
    # time.sleep(0.01)
    # ser.write(CR)
    # #ser.write('$11#01****'.encode('ascii')+CR)
    # # check response here
    # out = ser.read(7)
    # if out==ACK+b'$11#1'+CR:
    #     responseText = 'closed'
    # elif out==ACK+b'$11#0'+CR:
    #     responseText = 'open'
    # else:
    #     if out.decode('ascii') == "":
    #         responseText += " TIMEOUT"
    #     else:
    #         responseText += " serial response = " + out.decode('ascii')
    # return responseText

@app.route('/get_status_gate_position')
def get_status_gate_position():
    gate_arg = request.args.get('gate')
    status_code = 0
    gate = check_gate_from_url(gate_arg)
    if(gate != "1" and gate != "2"):
        print("correct gate was not detected")
        return "0"

    cmd = '$12#0'+gate+'****'
    send_on_serial(cmd)
    status_code = check_response(GATE_IS_OPEN, 7)
    return str(status_code)
    
# @app.route('/get_status_gate_position_old')
# def get_status_gate_position_old():
#     responseText = 'error'

#     gate = request.args.get('gate')

#     if gate == 'left':
#         gate = '1'
#     elif gate == 'right':
#         gate = '2'
#     else:
#         return "Error, correct Gate was not detected!"

#     # Check if open or closed
#     ser.reset_input_buffer()

#     cmd = '$12#0'+gate+'****'
#     for i in cmd:
#         time.sleep(0.01)
#         ser.write(i.encode())
#     time.sleep(0.01)
    
#     ser.write(CR)
#     #ser.write(('$12#0'+gate+'****').encode('ascii')+CR)
#     out = ser.read(7)
#     if out==ACK+b'$12#1'+CR:
#          responseText = 'open'
#     elif out==ACK+b'$12#0'+CR:
#          responseText = 'closed'
#     else:
#         if out.decode('ascii') == "et":
#             responseText += " TIMEOUT"
#         else:
#             responseText += " serial response = " + out.decode('ascii')

#     return responseText

@app.route('/get_status_bikespot')
def get_status_bikespot():
    status_code = 0
    #spot = request.args.get('spot_number')
    #spot = str(spot).zfill(2)
    spot="01"
    cmd = '$13#'+spot+'****'
    send_on_serial(cmd)
    status_code = check_response(SPOT_EMPTY,7)
    return str(status_code)

#     # Check if occupied or empty
# @app.route('/get_status_bikespot_old')
# def get_status_bikespot_old():
#     responseText = 'error'
#     spot = request.args.get('spot_number')
#     spot = str(spot).zfill(2)

#     # Check if occupied or empty
#     ser.reset_input_buffer()
#     cmd = '$13#'+spot+'****'
#     for i in cmd:
#         time.sleep(0.01)
#         ser.write(i.encode())
#     time.sleep(0.01)
#     ser.write(CR)
#     #ser.write(('$13#'+spot+'****').encode('ascii')+CR)

#     out = ser.read(7)  
#     if out==ACK + b'$13#0'+CR:
#         responseText = 'empty'
#     elif out == ACK + b'$13#1'+CR:
#         responseText = 'occupied'
#     else:
#         if out.decode('ascii') == "":
#             responseText += " TIMEOUT"
#         else:
#             responseText += " serial response = " + out.decode('ascii')
#     return responseText

@app.route('/get_error_status')
def get_error_status():
    # TODO: Unclear, because errors are not defined yet
    return

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')