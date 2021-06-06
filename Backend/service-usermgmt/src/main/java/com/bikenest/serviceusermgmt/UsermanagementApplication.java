package com.bikenest.serviceusermgmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(com.bikenest.common.exceptions.GlobalExceptionHandler.class)
public class UsermanagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(UsermanagementApplication.class, args);
    }
}
