echo "This Batch file builds all microservices and pushes them to the Docker Hub, so that these images can be pulled for Kubernetes."
echo "Building Spring Jars now."
call gradlew assemble
if errorlevel 1 GOTO error
echo "Enter Username and Password of the bikenest DockerHub Account:"
set /p user=Username:
set /p pass=Password:

call docker login -u %user% -p %pass%
call docker build --tag bikenest/service-bikenest:latest ./service-bikenest/
call docker push bikenest/service-bikenest:latest

call docker build --tag bikenest/service-booking:latest ./service-booking/
call docker push bikenest/service-booking:latest

call docker build --tag bikenest/service-payment:latest ./service-payment/
call docker push bikenest/service-payment:latest

call docker build --tag bikenest/service-usermgmt:latest ./service-usermgmt/
call docker push bikenest/service-usermgmt:latest

call docker build --tag bikenest/gateway:latest ./apigateway/
call docker push bikenest/gateway:latest
exit
:error
echo "Error building the Spring jars."