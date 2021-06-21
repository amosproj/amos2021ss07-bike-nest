package com.bikenest.common.interfaces.payment;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

//see /payment/add Endpoint
public class CreatePaymentRequest {
    @NotNull
    @Size(min = 22, max = 22)
    private String iban;
   
    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    
}
