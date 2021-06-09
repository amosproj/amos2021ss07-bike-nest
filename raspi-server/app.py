# flask_web/app.py

from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def hello_world ():
    return 'Hey, we have Flask in a Docker container!'

@app.route('/show_booked_spot')
def show_booked_spot():
    spot_number = request.args.get('spot_number')
    rgb_value = request.args.get('rgb_value')
    blink_state = request.args.get('blink_state')
    

    #nn = number of spot [1 - 20]
    #rgb = color of LED [0 == off, 1 == blink]
    #b = LED state [0 == off, 1 == blink]
    return '''$04#{}{}{}<cr>'''.format(spot_number, rgb_value, blink_state)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
