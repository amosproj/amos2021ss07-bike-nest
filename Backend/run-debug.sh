cd service-bikenest
./gradlew bootJar
cd ../service-booking
./gradlew bootJar
cd ../service-usermgmt
./gradlew bootJar
cd ../apigateway
./gradlew bootJar
cd ..

docker-compose -f docker-compose-debug.yml build
docker-compose -f docker-compose-debug.yml up