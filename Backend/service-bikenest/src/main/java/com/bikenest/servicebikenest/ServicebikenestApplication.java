package com.bikenest.servicebikenest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Component;

@SpringBootApplication
@Import(com.bikenest.common.exceptions.GlobalExceptionHandler.class)
public class ServicebikenestApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServicebikenestApplication.class, args);
    }
}
