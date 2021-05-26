package com.bikenest.servicepayment.controllers;

import com.bikenest.common.security.UserInformation;
import com.bikenest.servicepayment.services.PaymentService;
import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @GetMapping("/info")
    public String info(){
        return "Payment Service works!";
    }

    @GetMapping("/getclienttoken")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String getClientToken(@AuthenticationPrincipal UserInformation userInformation){
        return paymentService.generateClientToken(userInformation.getUserId());
    }

    @GetMapping("/registerpayment")
    public String registerPayment(){
        return "Works";
    }
}
