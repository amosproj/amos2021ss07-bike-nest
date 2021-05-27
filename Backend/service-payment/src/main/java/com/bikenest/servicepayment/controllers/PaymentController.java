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

    /**
     * API Endpoint /payment/getclienttoken
     * Just provide the signed JWT in the Authorization Header and then this method will create a Braintree Customer for the
     * requester and return a temporary client token, that can be used to initiate a payment with Braintree.
     * @param userInformation
     * @return
     */
    @GetMapping("/getclienttoken")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String getClientToken(@AuthenticationPrincipal UserInformation userInformation){
        //TODO: Check if we already created a customer at braintree for this user
        boolean success = paymentService.createCustomer(userInformation.getUserId(), userInformation.getFirstName(),
                userInformation.getLastName(), userInformation.getEmail());
        return paymentService.generateClientToken(userInformation.getUserId());
    }

    @GetMapping("/registerpayment")
    public String registerPayment(){
        return "Works";
    }
}
