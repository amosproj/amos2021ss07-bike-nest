call gradlew assemble

call gradlew :apigateway:test --tests com.bikenest.apigateway.unit.*
call gradlew :service-bikenest:test --tests com.bikenest.servicebikenest.unit.*
call gradlew :service-booking:test --tests com.bikenest.servicebooking.unit.*
call gradlew :service-payment:test --tests com.bikenest.servicepayment.unit.*
call gradlew :service-usermgmt:test --tests com.bikenest.serviceusermgmt.unit.*

if errorlevel 1 GOTO error
GOTO end
:error
echo There was an error executing one or more integration tests.
:end
