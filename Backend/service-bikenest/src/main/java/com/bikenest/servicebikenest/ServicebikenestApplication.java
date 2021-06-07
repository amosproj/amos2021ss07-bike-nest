package com.bikenest.servicebikenest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Component;

@SpringBootApplication
@Import(com.bikenest.common.exceptions.GlobalExceptionHandler.class)
public class ServicebikenestApplication {

    public static void main(String[] args) {
        Logger logge = LoggerFactory.getLogger(ServicebikenestApplication.class);
        logge.error(System.getenv("BIKENEST_DB_SERVICE_HOST"));
        SpringApplication.run(ServicebikenestApplication.class, args);
    }
}
