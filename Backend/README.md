## Requirements
- [Docker](https://www.docker.com)
- [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- If you encounter errors with building, make sure the JAVA_HOME environment variable is correctly set to your JDK directory

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
connection to the databases and therefore they will crash repeatedly. As solution, waiting scripts should be
integrated to the docker container.** 

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
  - These are more complicated because they depend on external resources and we have dependencies between
  some microservices.
  - The easiest solution is just starting up all containers using the special
  `docker-compose-testing.yml` file. There each Microservice and each database expose a port to the outside.
    Therefore, the service under test can still communicate with all the started Microservices.
    If, for example the Usermgmt Service is tested, the already started Usermgmt Service won't
    be shut down. Instead the Testconfiguration (see application.properties in test packages) makes sure
    that the service under test is started with a different port, than the already running services.
  - The scripts `testing-integration.bat` and `testing-integration.sh` will do all the work.  
  Some assumptions were made in that scripts, for example that all docker containers are fully running
    after 20 seconds.
---

**CI is done using the same principles as described above.**

## Deployment

Microservice Deployment can be very complicated, so here is a short overview about the whole workflow:
- We need to build all Spring Jars and build the Docker Containers
- We need to push these Docker Containers into some Container registry (for example Docker Hub)
- (There are alternative ways to get the container onto the remote host. For example saving the
  container to a tar file with docker save, transferring it to the remote machine and using docker load.
  This however will always transfer the whole image and makes the layers useless.)  
- Now there are a few possibilities for proceeding:
  - Pull these Image onto the Remote Server and start up all containers using docker-compose. This should not really
  be done in a production environment. (It is fine though, if there are no intentions of replicating the Microservices
    over multiple servers)
  - For Production Environment a highly used way to start all containers is using Kubernetes Cluster. So we need to
  install a Kubernetes Cluster on the Remote Server (lightweight options for this are microk8s or minikube).
  For Kubernetes there is the YAML file kubernetes-production.yml. It contains all definitions required to start the Backend
    (Services, Deployments, Environment Variables, Image Name). Currently, the image names are specified to be pulled
    from the public DockerHub repositories (bikenest/service-bikenest, ...)
    

So here is a summary what has to be done:

- Build all Spring JARs (`gradlew assemble`)
- Build all Containers and push them to [DockerHub](https://hub.docker.com/). The basic commands to push a single container image would be:
- `docker login -u %DOCKER_USERNAME -p %DOCKER_PASSWORD`
- `docker build --tag bikenest/service-bikenest:latest ./service-bikenest/` Note: In this case, bikenest is the Docker username, service-bikenest is
the name of the Docker repository and latest is the tag. This string will also be used inside the Kubernetes configuration file to actually
  pull the image from the DockerHub.
- `docker push bikenest/service-bikenest:latest`
- For convenience there is the `dockerhub-push.bat` Script, that will build and push all the containers to the docker-hub.
It will prompt you for the username and password of the bikenest DockerHub account.


Now we need to get these containers running on a remote server.
We have done this with a Hetzner Cloud Server(CX31) running Ubuntu 18.04.
A few basic steps for securing the server were done (e.g. change the standard ssh port 22, add new users and disable root user).
The first step is [installing microk8s using snap.](https://ubuntu.com/tutorials/install-a-local-kubernetes-with-microk8s#2-deploying-microk8s)

Next we need to get the kubernetes-production file:

`curl -O https://raw.githubusercontent.com/amosproj/amos-ss2021-bike-nest/main/Backend/kubernetes-production.yml`

Now tell the Kubernetes Cluster to use the kubernetes-production.yml file. (Note: You should edit the 
Environment Variables beforehand. Especially the externalIPs field for the gateway service has to be changed to be
the IP Address of the remote server!)

`microk8s kubectl apply -f kubernetes-production.yml`

Now if everything worked, you should be able to access the Backend using the port 9000.
For troubleshooting one can use these commands:
- `microk8s kubectl get all --all-namespaces` -> Shows all active ressources
- `microk8s kubectl describe pod bikenest` -> Shows detailed information about the bikenest pod
- `microk8s kubectl logs -f bikenest-92412djuwuwe` -> Shows the logs for the specified pod. Will give the console output from Spring.


If you want to use a private docker repository, you have to create a secret with kubectl, that contains
the credentials for that repository. Also, you have to specify ImagePullSecret in the kubernetes YAML file for each image.
Further Information can be found on the web. Github seems to offer free private repositories currently for example and
there are some tutorials available.
- `microk8s kubectl create secret docker-registry dockercredentials -docker-server=docker.io
  --docker-username=bikenest
  --docker-password=%PASSWORD%
  --docker-email=%EMAIL%`
  
## General Information

This folder contains all Backend Microservice.

Currently, there is a
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

Docker Containers run in an isolated environment. You have to provide additional instructions to allow communication with the
host system. This is usually done by specifying port mappings, that map a port on the host system to a port inside the container,
e. g. you specify the Portmapping -p "4503:1234" for a container. If you try to connect to port 4503 on your host system, this
request will be sent to the port 1234 inside the container environment.
For communication between containers you have to specify docker networks, that the containers should use. Then the containers can
communicate with each other using their container name as ip address. (A concrete example could be found inside the Usermgmt FeignClient.
There the address of the Usermgmt Service is specified as http://usermgmt:9003/)

To understand the docker-compose files, here are a few key points:
Kubernetes provides the IP Adresses of services to each pod using environment variables.
For example, the API Gateway Pod will be able to access the BIKENEST_SERVICE_HOST environment variable,
that contains the IP Address, that can be used to communicate with the Bikenest service.
It might be possible to use DNS instead to make this easier, but for now the whole Backend is configured to
work with this style of IP discovery. The spring services expect these environment variables (see the
application.properties files). So all docker-compose files were configured to statically provide these variables (
the BIKENEST_SERVICE_HOST for example statically contains "bikenest" because for communication between docker containers
this works.)
---
**Docker and Spring**

Containerizing a Spring Application and a Database is not hard, but allowing them to communicate with each other is not as
straight forward. Basically as mentioned above they have to be on the same network. Then you configure the `application.properties`
file of spring with the mysql connection string to the database (using the container name as IP address). Like this:

`spring.datasource.url=jdbc:mysql://mysql-container:3306/dbname`

However, in this project we do not directly configure everything inside the application.properties but instead
use environment variables there. Therefore, we have to set the environment variables for all docker containers.
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
