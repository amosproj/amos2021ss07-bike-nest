package com.bikenest.servicebooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ServicebookingApplication {

    @RequestMapping("/")
    public String home() {
        return "EXAMPLE ENDPOINT";
    }


    public static void main(String[] args) {
        SpringApplication.run(ServicebookingApplication.class, args);
    }

}
