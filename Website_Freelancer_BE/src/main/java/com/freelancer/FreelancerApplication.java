package com.freelancer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.freelancer.mysql.repository")
@EntityScan("com.freelancer.mysql.model")
public class FreelancerApplication {

	private static final Logger logger = LoggerFactory.getLogger(FreelancerApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(FreelancerApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void onApplicationReady() {
		logger.info("Application started successfully and is ready to serve requests.");
	}

}
