FROM openjdk:17-jdk-slim
ADD . /src
WORKDIR /src
RUN ./gradlew bootJar
ARG JAR_FILE=build/libs/AppChat-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} appChat.jar
ENTRYPOINT ["java","-jar","appChat.jar"]
