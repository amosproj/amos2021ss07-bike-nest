FROM openjdk:11.0.11
COPY build/libs/*.jar app.jar
RUN addgroup newgroup && adduser nonroot
USER nonroot
ENTRYPOINT ["java","-jar","app.jar"]
