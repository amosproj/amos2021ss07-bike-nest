package com.bikenest.servicebooking;

import com.bikenest.common.feignclients.UsermgmtClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@ComponentScan({"com.bikenest.common.feignclients", "com.bikenest.servicebooking"})
// Imports the GlobalExceptionHandler from Common Project so that it is applied to all Controllers in Booking
@Import(com.bikenest.common.exceptions.GlobalExceptionHandler.class)
@EnableFeignClients(basePackageClasses = UsermgmtClient.class)
public class ServicebookingApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServicebookingApplication.class, args);
    }
}
