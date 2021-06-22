FROM ubuntu:16.04

RUN apt-get -y update && \
    apt-get -y install python3-pip python3-dev

RUN apt-get -y install software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa

RUN apt-get update
RUN apt-get install python3.7 -y
# Add 3.7 to the available alternatives
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.7 1

# Set python3.7 as the default python
RUN update-alternatives --set python /usr/bin/python3.7

RUN cd /usr/local/bin && \
    ln -s /usr/bin/python3 python

RUN python3.7 -m pip install --upgrade pip

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN python3.7 -m pip install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python3.7" ]

#CMD [ "app.py", "runserver" ]

CMD [ "app.py" ]