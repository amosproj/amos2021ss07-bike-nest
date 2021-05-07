This folder contains all of the Microservices used inside the backend.
Each of them will be built into a Docker Image and then they are combined using the
docker-compose command.
Each Microservice will have access to one mysql docker container.
For this to work, the microservice and its respective database container will be on the same docker network.

Each Microservice listens on a predefined port.
The Microservices are not visible outside of the host. Instead an API Gateway is provided, that will also implement cross cutting concerns like authentication.