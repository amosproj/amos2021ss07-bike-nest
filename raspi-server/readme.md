# Raspberry Pi Server Setup

## How to run?

1. `cd raspi-server`
2. `docker build -t raspi-server:latest .`
3. `docker run -d -p 5000:5000 raspi-server`