package com.bikenest.servicebooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping(path="/booking")
public class ServicebookingApplication {

    @RequestMapping("/info")
    public String home() {
        return "Booking info 1.";
    }


    public static void main(String[] args) {
        SpringApplication.run(ServicebookingApplication.class, args);
    }

}
