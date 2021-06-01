package com.bikenest.servicebooking;

import com.bikenest.common.feignclients.UsermgmtClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.bikenest.common.feignclients", "com.bikenest.servicebooking"})
@EnableFeignClients(basePackageClasses = UsermgmtClient.class)
public class ServicebookingApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServicebookingApplication.class, args);
    }
}
