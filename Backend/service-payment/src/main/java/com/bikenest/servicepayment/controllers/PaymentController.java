package com.bikenest.servicepayment.controllers;

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.Environment;
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

    @GetMapping("/registerPayment")
    public String registerPayment(){
        return "Works";
    }
}
