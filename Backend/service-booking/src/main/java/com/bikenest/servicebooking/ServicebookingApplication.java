package com.bikenest.servicebooking;

import com.bikenest.common.feignclients.UsermgmtClient;
import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@ComponentScan({"com.bikenest.common.feignclients", "com.bikenest.servicebooking"})
@EnableFeignClients(basePackageClasses = UsermgmtClient.class)
public class ServicebookingApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServicebookingApplication.class, args);
    }
}
