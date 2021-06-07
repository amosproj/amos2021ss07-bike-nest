./gradlew assemble

./gradlew :apigateway:test --tests com.bikenest.apigateway.unit.*
./gradlew :service-bikenest:test --tests com.bikenest.servicebikenest.unit.*
./gradlew :service-booking:test --tests com.bikenest.servicebooking.unit.*
./gradlew :service-payment:test --tests com.bikenest.servicepayment.unit.*
./gradlew :service-usermgmt:test --tests com.bikenest.serviceusermgmt.unit.*
