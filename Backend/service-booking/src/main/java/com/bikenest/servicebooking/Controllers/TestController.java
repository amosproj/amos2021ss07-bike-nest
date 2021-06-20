package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.feignclients.RaspiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/test")
public class TestController {
    @Autowired
    RaspiClient raspiClient;

    @GetMapping(path = "/")
    public ResponseEntity<String> helloWorld(){
        return ResponseEntity.ok(raspiClient.helloWorld());
    }
}
