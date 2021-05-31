call gradlew assemble
call docker-compose -f docker-compose-debug.yml build
call docker-compose -f docker-compose-debug.yml up
