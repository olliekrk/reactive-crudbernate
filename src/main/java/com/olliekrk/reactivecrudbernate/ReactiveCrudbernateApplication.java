package com.olliekrk.reactivecrudbernate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ReactiveCrudbernateApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReactiveCrudbernateApplication.class, args);
	}

}
