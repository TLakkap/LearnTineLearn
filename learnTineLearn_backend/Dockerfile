FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY learnTineLearn/pom.xml .
COPY learnTineLearn/src ./src
RUN mvn -f pom.xml package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
