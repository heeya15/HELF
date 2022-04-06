FROM openjdk:8-jdk-alpine
RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2
EXPOSE 8443
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENV TZ=Asia/Seoul
ENV LD_LIBRARY_PATH=/lib64
ENTRYPOINT ["java","-jar","/app.jar"]