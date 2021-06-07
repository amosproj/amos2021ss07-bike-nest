./gradlew assemble
docker-compose -f docker-compose-testcontainers.yml build
docker-compose -f docker-compose-testcontainers.yml up -d

sleep 20s

./gradlew :apigateway:test --tests com.bikenest.apigateway.integration.*
./gradlew :service-bikenest:test --tests com.bikenest.servicebikenest.integration.*
./gradlew :service-booking:test --tests com.bikenest.servicebooking.integration.*
./gradlew :service-payment:test --tests com.bikenest.servicepayment.integration.*
./gradlew :service-usermgmt:test --tests com.bikenest.serviceusermgmt.integration.*

docker-compose -f docker-compose-testcontainers.yml stop
