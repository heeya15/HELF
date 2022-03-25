FROM openjdk:8-jdk-alpine
EXPOSE 8443
COPY build/libs/ssafy-web-project-1.0-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]