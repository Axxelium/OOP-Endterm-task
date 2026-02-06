package com.arnurproject.rental;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RentalBackendApplication {

    public static void main(String[] args) {
        // сервак Tomcat и приложение
        SpringApplication.run(RentalBackendApplication.class, args);
    }
}