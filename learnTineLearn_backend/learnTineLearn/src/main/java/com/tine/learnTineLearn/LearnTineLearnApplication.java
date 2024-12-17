package com.tine.learnTineLearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class LearnTineLearnApplication {

	public static void main(String[] args) {
		// Comment the next 2 lines if environment variables are defined in docker
		Dotenv dotenv = Dotenv.load(); // Load .env-file
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(LearnTineLearnApplication.class, args);
	}

}
