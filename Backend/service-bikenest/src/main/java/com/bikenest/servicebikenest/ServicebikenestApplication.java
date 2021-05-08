package com.bikenest.servicebikenest;

import com.bikenest.servicebikenest.DB.Bikenest;
import com.bikenest.servicebikenest.DB.BikenestRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@ComponentScan(basePackageClasses = BikenestRepository.class)
@ComponentScan(basePackageClasses = Bikenest.class)
@ComponentScan(basePackageClasses = BikenestController.class)
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