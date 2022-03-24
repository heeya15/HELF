FROM openjdk:8-jdk-alpine
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
RUN ./gradlew :module-web:clean build
ENV TZ=Asia/Seoul
ENTRYPOINT ["java","-jar","/app.jar"]