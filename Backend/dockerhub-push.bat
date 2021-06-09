echo "This Batch file builds all microservices and pushes them to the Docker Hub, so that these images can be pulled for Kubernetes."
echo "Enter Username and Password of the bikenest DockerHub Account:"
set /p user=Username:
set /p pass=Password:

call docker login -u %user% -p %pass%
call docker build --tag bikenest/backend:service-bikenest ./service-bikenest/
call docker push bikenest/backend:service-bikenest

call docker build --tag bikenest/backend:service-booking ./service-booking/
call docker push bikenest/backend:service-booking

call docker build --tag bikenest/backend:service-payment ./service-payment/
call docker push bikenest/backend:service-payment

call docker build --tag bikenest/backend:service-usermgmt ./service-usermgmt/
call docker push bikenest/backend:service-usermgmt

call docker build --tag bikenest/backend:gateway ./apigateway/
call docker push bikenest/backend:gateway

