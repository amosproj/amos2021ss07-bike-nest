This folder contains all of the Microservices used inside the backend.
Each of them will be built into a Docker Image and then they are combined using the
docker-compose command.
Each Microservice will have access to one mysql docker container.
For this to work, the microservice and its respective database container will be on the same docker network.

Each Microservice listens on a predefined port.
The Microservices are not visible outside of the host. Instead an API Gateway is provided, that will also implement cross cutting concerns like authentication.

docker-compose up will start building all containers, and run them afterwards.
The Spring Services require that the database has to be ready before they are trying to access it, which is not guaranteed by docker-compose.
We have to find a fix there. It is indeed possible to run "commands" before starting a container. This feature could be used to run a script before starting
the Spring services, that waits until the database is ready.

Making remote debugging work was alot of hassle.
I personally had to switch to AmazonCorretto 11 in IntelliJ and also use AmazonCorretto 11 in the Docker container.