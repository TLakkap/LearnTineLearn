package com.tine.learnTineLearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class LearnTineLearnApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load(); // Lataa .env-tiedoston
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));


		SpringApplication.run(LearnTineLearnApplication.class, args);
	}

}
