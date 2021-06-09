echo "This Batch file builds all microservices and pushes them to the Docker Hub, so that these images can be pulled for Kubernetes."
echo "Enter Username and Password of the bikenest DockerHub Account:"
set /p user=Username:
set /p pass=Password:

call docker login -u %user% -p %pass%
call docker build --tag bikenest/backend:service-bikenest ./service-bikenest/
call docker push bikenest/backend:service-bikenest
