call gradlew assemble
call docker-compose -f docker-compose-testing.yml build
call docker-compose -f docker-compose-testing.yml up -d

timeout /t 20

call gradlew :apigateway:test --tests com.bikenest.apigateway.integration.*
call gradlew :service-bikenest:test --tests com.bikenest.servicebikenest.integration.*
call gradlew :service-booking:test --tests com.bikenest.servicebooking.integration.*
call gradlew :service-payment:test --tests com.bikenest.servicepayment.integration.*
call gradlew :service-usermgmt:test --tests com.bikenest.serviceusermgmt.integration.*

call docker-compose -f docker-compose-testing.yml stop

if errorlevel 1 GOTO error
GOTO end
:error
echo There was an error executing one or more integration tests.
:end
