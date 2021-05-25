package com.bikenest.servicepayment.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/payment")
public class PaymentController {

    @GetMapping("/info")
    public String info(){
        return "Payment Service works!";
    }
}
