package com.bikenest.servicebooking;

import com.bikenest.common.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/commontest")
    public String test(@RequestBody ExampleInterface example){
        return "working.";
    }


    public static void main(String[] args) {
        SpringApplication.run(ServicebookingApplication.class, args);
    }
}
