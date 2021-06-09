## Requirements
- [Docker](https://www.docker.com)
- [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- If you encounter errors with building make sure the JAVA_HOME environment variable is correctly set to your JDK directory

## Build and Run

- Navigate to the Backend Folder
  
- Build all the Microservice Projects by executing `gradlew assemble`

- Build the Docker Containers:
  - `docker-compose build` for release mode
  - `docker-compose -f docker-compose-debug.yml build` for debug mode

All docker containers are successfully built now and are ready to be executed.

- Starting all containers:
  - `docker-compose up` for release mode
  - `docker-compose -f docker-compose-debug.yml up` for debug mode

---
Or use the scripts:
- `run-debug.bat`
- `run-release.bat`
- `run-debug.sh`
- `run-release.sh`

**Important: If you start the containers for the first time on your local
machine, the database containers will take some time for initialization.
During this time frame none of the Microservices will be able to build up a
connection to the databases and therefore they will crash repeatedly.** 

**If you make any changes to the project, the docker containers will have to be
rebuilt. Also keep in mind that you will have to reinitialize your database
containers after making a change to a db schema. This can be easily done by
calling `docker-compose down` before starting the containers.**


## Debugging

Because the Spring Application JAR Files have to be started with remote debugging enabled, there is a different Dockerfile
for debugging mode.

Use these Options in your IDE for Remote Debugging:
`-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005` 

The port is configured differently for each service, you can look that up inside the Dockerfile_debug.
Right now the ports are:
- Bikenest Service => 5005
- Booking Service => 5006
- Gateway => 5007
- UserMgmt => 5008
- Payment => 5009


**Important: the JDK version you are using on your host machine should be greater or equal to the jdk version you are using inside the container.**

## Testing

- Unit Tests
  - Unit tests have no external dependencies and can therefore be executed
  just by calling the gradlew commands.
  - See `testing-unit.bat` or `testing-unit.sh`
---  
- Integration Tests
  - These are more complicated because they depend on external ressources.
  Also because auf the Microservice Architecture there are dependencies between the
    Microservices.
  - The easiest solution is just starting up all containers using the special
  `docker-compose-testcontainers.yml` file. There each Microservice and each database expose a port to the outside.
    Therefore the service under test can still communicate with all of the started Microservices.
    If, for example the Usermgmt Service is tested, the already started Usermgmt Service won't
    be shut down. Instead the Testconfiguration (see application.properties in test packages) makes sure
    that the service under test is started with a different port, than the already running services.
  - The scripts `testing-integration.bat` and `testing-integration.sh` will do all the work.  
  Some assumptions were made in that scripts, for example that all docker containers are fully running
    after 20 seconds.
---

**CI is done using the same principles as described above.**


## Deployment

To deploy the Backend Microservices, all of the Docker Containers have to be loaded into a Docker Container Registry.
For this we use [DockerHub](https://hub.docker.com/). The basic commands to push a single container image would be:
- `docker login -u %DOCKER_USERNAME -p %DOCKER_PASSWORD`
- `docker build --tag bikenest/backend:gateway ./apigateway/`, Note: In this case, bikenest is the Docker username, backend is
the name of the Docker repository and gateway is the tagname. This string will also be used inside the Kubernetes configuration file to actually
  pull the image from the DockerHub.
- `docker push bikenest/backend:gateway`
- For convenience there is the `dockerhub-push.bat` Script, that will build and push all of the containers to the docker-hub.

To use these images for the Kubernetes deployment we first have to configure the login credentials to the docker hub, because
the used repository is private. If you use a public repository, this step will not be necessary.
- `kubectl create secret docker-registry dockercredentials -docker-server=docker.io
  --docker-username=bikenest
  --docker-password=%PASSWORD%
  --docker-email=%EMAIL%`
  
This secret (**dockercredentials**) can be used inside the kubernetes configuration YAML file, so that the kubernetes cluster
can pull the images from the private container repository.
To then start the Backend using kubernetes, execute

- `kubectl apply -f kubernetes-production.yml`


## General Information

This folder contains all Backend Microservice.

Currently there is a
- **UserMgmt Microservice** that handles all User specific work (login, account creation,
  JWT validation)
- **Booking Microservice** that handles new reservations and the whole locking and
unlocking process for Bikenests
- **Payment Microservice**
- **Bikenest Microservice** that provides information about all available Bikenests
- **API Gateway** that routes requests to the respective Microservices and implements
the JWT Validation
- **Common** Project that contains code that is common for all other projects (Security related stuff like
  the JWTAuthenticationFilter, that has to be used in each Microservice, API Interfaces, FeignClients for Communication
  between Microservices, ...)  
  
This application is built using gradle. The Backend folder contains a
root gradle project, that builds all subprojects. 
The projects are containerized using docker and each project contains two Dockerfiles with
instructions on how to build the container.

**For more information about the individual projects, see the README.md of the respective folder.**

---
**Some general Information for Docker:**

Docker Containers run in an isolated environment. You have provide additional instructions to allow communication with the
host system. This is usually done by specifing port mappings, that map a port on the host system to a port inside the container.
E. g. you specify the portmapping -p "4503:1234" for a container. If you try to connect to port 4503 on your host system, this
request will be sent to the port 1234 inside the container environment.
For communication between containers you have to specify docker networks, that the containers should use. Then the containers can
communicate with each other using their container name as ip address. (A concrete example could be found inside the Usermgmt FeignClient.
There the address of the Usermgmt Service is specified as http://usermgmt:9003/)
---
**Docker and Spring**

Containerizing a Spring Application and a Database is not hard, but allowing them to communicate with each other is not as
straight forward. Basically as mentioned above they have to be on the same network. Then you configure the `application.properties`
file of spring with the mysql connection string to the database (using the container name as IP address). Like this:

`spring.datasource.url=jdbc:mysql://mysql-container:3306/dbname`

However, in this project we do not directly configure everything inside the application.properties but instead
use environment variables there. Therefore we have to set the environment variables for all docker containers.
This and other tasks can be easily done using docker-compose.

We have three docker compose files for the backend. These files configure the environment variables for each container,
how to build the containers, the port mappings and networks.
Just by calling `docker-compose up` it is possible to start all the containers configured in such a way,
that they correctly work together.

## Inspecting Data

It is possible to access the data directly from the database.
- Open a CLI for the Database Docker Container that you want to inspect.
- Type `mysql -p` into the shell
- Type the root password (=**test** for the development environment)
- Select the database with **use DATABASE;**
- Execute SQL Queries

An Example for the User Database:
- `mysql -p`
- `test`
- `use user;`
- `select * from user;`
