package com.freelancer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // Cho phép tất cả các URL
						.allowedOrigins("http://localhost:5173") // Chỉ cho phép frontend
						.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // Các phương thức được phép
						.allowedHeaders("*") // Cho phép tất cả các header
						.allowCredentials(true); // Cho phép gửi cookie hoặc xác thực
			}
		};
	}
}
