## Note
- Docker required
- JDK 11 required to build
- Java path has to be set (restart after installation)

## General
This folder contains all of the Microservices used inside the backend.
Each of these microservice projects contains a Dockerfile that contains the instructions on how the Docker Container has to be built. In case of a Java Application the docker building process goes like this: 
- Specify the Java Runtime Environment (openjdk Version 11.0.11 in our case)
- Copy the application jar into the container as app.jar
- Specify "java -jar app.jar" as entry point for the container, so that the java app is executed, once the container is started up

You could start the docker containers for each individual service using the "docker run" command, but the services that require a database will crash, because no database server is running. To fix that issue you could start up a MySQL Docker Container beforehand.

Since Docker Containers run isolated by default, you have to specify additional settings to make the communication between multiple docker containers work. This means you have to create a "docker network" that each Container will use. Then you don't have to use regular IP Addresses for communication between containers, but you can actually just use the name of the container.
To have a Spring Application connect to a MySQL database, in it's application.properties settings you would have to write:

    spring.datasource.url=jdbc:mysql://mysql-container:3306/dbname
where **mysql-container** is the name of the running mysql container.

Then to make the spring application accessible from outside the container (by your browser for example), you have to define a port mapping, that maps the port you want to use on your host machine to the port that your spring application listens to inside the container.

    docker run --network servicenet -p 9999:9001 bikenest-service
In the above command it was specified that the bikenest-service container should use the servicenet network and map the port 9999 to 9001. So if the database is also using the servicenet network, the app would be able to start succesful and you could access the API Endpoints via localhost:9999.

The above was alot of theory about the docker architecture, so that one can actually understand what is happening with the docker-compose command.
Inside the docker-compose.yml everything about the services that should be ran is defined:
- Name of the running container
- What image they are using or how their image is built
- Environment variables that should be set (the spring project was configured in a way, that the mysql connection string and password comes from environment variables. Also the settings for the MySQL dbs like the root password are set by environment variables)
- The networks the containers will use
- The port mappings
- Restart strategies

So by just running docker-compose up, you can get the whole backend running independent of your environment.

## Building

As explained in General, the docker container is built by copying the application jar into the container filesystem. This means before building the container, you have to make sure that the Spring Project has been built using gradle.

You can build all of the Backend Projects by executing
- `gradlew bootJar jar`
    - Builds the jar files for each subproject
    
Or if you want to build the jar of a service manually:
- Navigate to the service folder
- Execute `gradlew build`

To build the docker containers you have to execute
- `docker-compose build` to build in release mode
- `docker-compose -f docker-compose-debug.yml build` to build in debug mode

All docker containers are successfully built now and are ready to be executed.

## Running

Starting all the containers:
- `docker-compose up`
- `docker-compose -f docker-compose-debug.yml up` for debug mode

If you make any changes to a backend service, you have to build the service with gradlew again and rebuilt the corresponding container.

The easy approach is to:
- Stop the container execution
- rebuild all jars using `gradlew bootJar jar`
- rebuild all containers using `docker-compose build` or
`docker-compose -f docker-compose-debug.yml build`
- start the containers up using the **docker-compose up** command from above

It is possible to only rebuild a single container by executing
`docker-compose build {NAME}`

## Debugging
 
There are different Dockerfiles for debugging purposes, because the application jars have to be started with remote debugging enabled.
These options are `-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005` which might have to be copied to your IDE.
The port is configured differently for each service, you can look that up inside the Dockerfile_debug.
Right now for the
- Bikenest Service it is 5005
- Booking Service it is 5006 
- Gateway it is 5007
- UserMgmt it is 5008
	
   
One important note for debugging: the JDK version you are using on your host machine should be greater or equal to the jdk version you are using inside the container.

## Testing

Testing is done by executing `gradlew test` in each project directory or directly executing all tests by running
this command inside the Backend folder.
In some cases it might be required that another service is running or else the test will fail. (For example a MySQL server might have to be running to execute integration tests for the Bikenest service)

## CI/CD

For unit tests the services can run independently and therefore Github is configured
to just execute the test task for gradlew with only the unit tests specified.

To execute integration tests, github actions will have to be configured so that the required containers are started up first.
