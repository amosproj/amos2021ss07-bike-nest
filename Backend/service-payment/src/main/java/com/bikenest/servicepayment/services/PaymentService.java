package com.bikenest.servicepayment.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Value("${BT_MERCHANT_ID}")
    private String merchantId;

    public PaymentService(){
        if (merchantId == null){
            throw new IllegalArgumentException("BT_MERCHANT_ID Environment Variable is not set.");
        }
    }
}
