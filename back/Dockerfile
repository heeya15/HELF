FROM openjdk:8-jdk-alpine
EXPOSE 8443
COPY entrypoint.sh /entrypoint.sh
RUN apk update && \
  apk add --no-cache libc6-compat && \
  ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2 && \
  mkdir /app && \
  chmod a+x /entrypoint.sh
COPY build/libs/*.jar /app
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENV TZ=Asia/Seoul
ENTRYPOINT ["java","-jar","/app.jar","/entrypoint.sh"]