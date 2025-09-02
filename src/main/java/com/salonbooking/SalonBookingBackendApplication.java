package com.salonbooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.salonbooking.repository")
@EnableMethodSecurity  
@EntityScan(basePackages = "com.salonbooking.model")
public class SalonBookingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalonBookingBackendApplication.class, args);
    }
}
