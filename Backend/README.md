## Note
- Docker required
- JDK 11 required to build
- Java path has to be set (restart after installation)

## General
This folder contains all of the Microservices used inside the backend.
Each of these microservice projects contains a Dockerfile that contains the instructions on how the Docker Container has to be built. In the case of an Java Application, you have to define the used JRE and copy the target jar into the container. Also the entrypoint has to be defined targeting the copied jar file.

You could start these docker containers independently using the docker run command, but in the case of the spring projects, the application will crash. That is because it requires a running MySQL database and if it is not available, the application will exit.

So to actually make it work, you would also have to run a mysql docker container that the spring application can connect to. In Docker you would have to create a network that both containers use. Afterwards you can specify the target ip as the container name.
So to make the spring application connect to the database, in it's application.properties settings you would have to specify:

    spring.datasource.url=jdbc:mysql://mysql-container:3306/dbname
where **mysql-container** is the name of the running mysql container.

To make the spring application accesible from outside the container, you have to define a port mapping, that maps the port you want to use on your host machine to the port that your spring application listens to inside the container.

    docker run --network servicenet -p 9999:9001 bikenest-service
In the above command it was specified that the bikenest-service container should use the servicenet network and map the port 9999 to 9001. So if the database is also using the servicenet network, the app would be able to start succesful and you could access the API Endpoints via localhost:9999.

The above was alot of theory about the docker architecture, so that one can actually understand what is happening with the docker-compose command.
Inside the docker-compose.yml everything about the services that should be ran is defined:
Name of the running container,
What image they are using or how their image is built,
Environment variables that should be set (the spring project was configured in a way, that the mysql connection string and password comes from environment variables. Also the setting for the mysql dbs are set by environment variables),
The networks the containers will use,
the port mappings,
restart strategies.

So by just running docker-compose up, you can get the whole backend running independent of your environment.

## Development

Upon making changes to a service, that service has to be built into a executable jar using gradle (at least in the case of a spring project).
Afterwards the service container has to be rebuilt using:

    docker-compose build service
 **Replace service with the service name you edited (e.g. bikenest or booking)**

Now you can get the whole infrastructure running by executing

    docker-compose up
 
 For debugging purposes, the jars have to be started with command line options inside the container, that allow remote debugging via tcp. For this, there exist special **Dockerfile_debug** files and a **docker-compose-debug.yml** file.
Run

	docker-compose -f docker-compose-debug.yml build service
 to build the service with debug configuration. Afterwards start everything up using

    docker-compose -f docker-compose-debug.yml up

Currently the bikenest service is configured to be listening on port 5005 for remote debugging and the booking service would be listening on port 5006.

One important note for debugging: the jdk version you are using on your host machine should be greater or equal to the jdk version you are using inside the container.

## Testing

Todo

## CI/CD
Todo
