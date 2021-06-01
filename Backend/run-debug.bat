call gradlew assemble
if errorlevel 1 GOTO error
call docker-compose -f docker-compose-debug.yml build
call docker-compose -f docker-compose-debug.yml up
exit
:error
echo There was an error building the Spring Microservices. Stopping the Script now.
