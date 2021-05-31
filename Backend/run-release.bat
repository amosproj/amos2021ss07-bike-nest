call gradlew assemble
if errorlevel 1 GOTO error
call docker-compose build
call docker-compose up
exit
:error
echo There was an error building the Spring Microservices. Stopping the Script now.
