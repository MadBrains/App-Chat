# --- stage 1: build
FROM openjdk:17-jdk-slim AS builder
WORKDIR /app
COPY . .
RUN ./gradlew bootJar

# --- stage 2: runtime
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar appChat.jar
ENTRYPOINT ["java", "-jar", "appChat.jar"]
