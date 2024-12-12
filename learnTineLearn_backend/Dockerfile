# Importing JDK and copying required files
FROM openjdk:17-alpine AS build
WORKDIR /app
COPY learnTineLearn/pom.xml .
COPY learnTineLearn/src ./src

# Copy Maven wrapper
COPY learnTineLearn/mvnw .
COPY learnTineLearn/.mvn .mvn

# Set execution permission for the Maven wrapper
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the final Docker image using OpenJDK 17
FROM openjdk:17-alpine
VOLUME /tmp

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Define the environment variable PORT with default value 8080
ENV PORT=8080

# Ensure the application reads the PORT environment variable
CMD ["sh", "-c", "java -Dserver.port=${PORT} -jar /app.jar"]

EXPOSE 8080