package com.bikenest.common.interfaces.payment;

public class PaymentResponse {
    private String iban;

    public PaymentResponse() {
    }

    public PaymentResponse(String iban) {
        this.iban = iban;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }
}
