package com.bikenest.servicepayment.controllers;

import com.bikenest.common.security.UserInformation;
import com.bikenest.common.security.UserRole;
import com.bikenest.common.interfaces.payment.CreatePaymentRequest;
import com.bikenest.common.interfaces.payment.PaymentResponse;

import java.util.Optional;

import javax.validation.Valid;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.BooleanResponse;
import com.bikenest.servicepayment.services.PaymentService;
import com.bikenest.servicepayment.DB.Payment;
import com.bikenest.servicepayment.DB.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @GetMapping("/registerpayment")
    public String registerPayment() {
        return "Works";
    }

    @GetMapping(path = "/getIban")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<PaymentResponse> getPayment(@AuthenticationPrincipal UserInformation user)
            throws BusinessLogicException {
        if (user.getRole() == UserRole.User || user.getRole() == UserRole.Admin) {
            Optional<Payment> payment = paymentService.getPaymentByUserId(user.getUserId());

            if (payment.isPresent()) {
                Payment actualPayment = payment.get();
                return ResponseEntity.ok(new PaymentResponse(actualPayment.getIban()));
            } else {
                throw new BusinessLogicException("Keine Iban vorhanden");
            }
        }
        throw new BusinessLogicException("Du hast für diese Funktion nicht die erforderlichen Rechte!");
    }

    @PostMapping(path = "/setIban")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<BooleanResponse> setIban(@AuthenticationPrincipal UserInformation user,
            @Valid @RequestBody CreatePaymentRequest createPaymentRequest) throws BusinessLogicException {
        if (user.getRole() == UserRole.User || user.getRole() == UserRole.Admin) {
            paymentService.setIban(user.getUserId(), createPaymentRequest.getIban());
            return ResponseEntity.ok(new BooleanResponse(true));
        }
        throw new BusinessLogicException("Du hast für diese Funktion nicht die erforderlichen Rechte!");
    }

    @PostMapping(path = "/createPayment")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<BooleanResponse> createPayment(@AuthenticationPrincipal UserInformation user,
            @Valid @RequestBody CreatePaymentRequest createPaymentRequest) throws BusinessLogicException {
        if (user.getRole() == UserRole.User || user.getRole() == UserRole.Admin) {
            if (paymentService.createPayment(user.getUserId(), createPaymentRequest.getIban())) {
                return ResponseEntity.ok(new BooleanResponse(true));
            } else {
                paymentService.setIban(user.getUserId(), createPaymentRequest.getIban());
                return ResponseEntity.ok(new BooleanResponse(true));
            }
        }
        throw new BusinessLogicException("Du hast für diese Funktion nicht die erforderlichen Rechte!");
    }
}
