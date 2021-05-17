cd service-bikenest
./gradlew bootJar
cd ../service-booking
./gradlew bootJar
cd ../service-usermgmt
./gradlew bootJar
cd ../apigateway
./gradlew bootJar
cd ..

docker-compose build
docker-compose up