# Raspberry Pi Server Setup

This folder contains the python source code for the Flask webserver, that will run on the Bikenest
Raspberry Pis. It currently provides the only way to access the actual hardware via HTTP(S) calls.

There exist two different version (app.py and app_development.py). The development version is used for development and
does not try to access the hardware via serial connection. Instead everything is just mocked, so that the backend is 
able to interact with the flask server without errors. It is containerized and started up by the backend, if you are
using the docker-compose-debug.yml file. 

The real version will have to be deployed to the Raspberry Pis, that control the Bikenest hardware.

## Deployment on Raspberry

1. Make sure Python 3.8 (including pip, venv) is installed.
2. Navigate into the directory with the python script
3. Create a virtual environment: `python -m venv env`
4. Activate the virtual environment: `.\env\Scripts\Activate` (Windows) or `source env/bin/activate` (Linux)
5. Install all requirements: `pip install -r requirements.txt`
6. Start the flask app: `python app.py`

## Run the debug version

1. `cd raspi-server`
2. `docker build -t raspi-server:latest .`
3. `docker run -d -p 5000:5000 raspi-server`