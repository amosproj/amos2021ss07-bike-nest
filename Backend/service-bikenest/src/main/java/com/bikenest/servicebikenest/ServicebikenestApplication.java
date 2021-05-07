package com.bikenest.servicebikenest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ServicebikenestApplication {

    @RequestMapping("/")
    public String home() {
        return "EXAMPLE ENDPOINT";
    }

    public static void main(String[] args) {
        SpringApplication.run(ServicebikenestApplication.class, args);
    }

}
