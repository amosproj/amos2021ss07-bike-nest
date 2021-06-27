package com.bikenest.servicepayment.services;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.servicepayment.DB.Payment;
import com.bikenest.servicepayment.DB.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepository;

    public PaymentService() {
    }


    public boolean createPayment(Integer userId, String iban) throws BusinessLogicException {
        Optional<Payment> payment = paymentRepository.findByUserId(userId);

        if (payment.isEmpty()) {
            Payment newPayment = new Payment(userId, iban);
            paymentRepository.save(newPayment);
            return true;
        }
        return false;
    }

    public Optional<Payment> getPaymentByUserId(Integer userId) {
        return paymentRepository.findByUserId(userId);
    }

    public Payment setIban(Integer userId, String iban) throws BusinessLogicException {
        Optional<Payment> payment = paymentRepository.findByUserId(userId);

        if (payment.isEmpty())
            throw new BusinessLogicException("Es existiert kein Account mit der Id " + userId);

        Payment actualPayment = payment.get();
        actualPayment.setIban(iban);

        return paymentRepository.save(actualPayment);
    }
}
