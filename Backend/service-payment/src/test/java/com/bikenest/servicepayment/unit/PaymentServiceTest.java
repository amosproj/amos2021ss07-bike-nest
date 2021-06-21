package com.bikenest.servicepayment.unit;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.servicepayment.ServicepaymentApplication;
import com.bikenest.servicepayment.DB.Payment;
import com.bikenest.servicepayment.DB.PaymentRepository;
import com.bikenest.servicepayment.services.PaymentService;

import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.NoSuchElementException;
import java.util.Optional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ServicepaymentApplication.class)
public class PaymentServiceTest {

    @InjectMocks
    PaymentService paymentService;

    @Mock
    PaymentRepository paymentRepository;

    @BeforeEach
    void setUpMocks() {
        Payment payment = new Payment(1, "DE01234567890123456789");

        MockitoAnnotations.openMocks(this);
        when(paymentRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(paymentRepository.findByUserId(1)).thenReturn(Optional.of(payment));
        when(paymentRepository.findByUserId(2)).thenReturn(Optional.empty());
    }

    @Test
    void getPaymentByUserId_shouldReturnPayment_whenPaymentExists() {
        // Arrange
        Integer userId = 1;
        // Act
        Optional<Payment> payment = paymentService.getPaymentByUserId(userId);
        // Assert
        Assert.assertEquals(userId, payment.get().getUserId());
    }

    // @Test //(expected = NoSuchElementException.class)
    // void getPaymentByUserId_shouldThrow_whenPaymentDoesNotExist(){
    // //Arrange
    // Integer userId = 2;
    // //Act
    // Optional<Payment> payment = paymentService.getPaymentByUserId(userId);
    // //Assert
    // //Assert.assertThrows(NoSuchElementException.class, () -> {payment.get();});
    // }

    @Test
    void setIban_shouldSetIban() throws BusinessLogicException {
        // Arrange
        Integer userId = 1;
        String iban = "DE00000000000000000000";
        // Act
        Payment payment = paymentService.setIban(userId, iban);
        // Assert
        Assert.assertEquals(iban, payment.getIban());
    }

    @Test
    void setIban_shouldThrow_whenPaymentDoesNotExist() throws BusinessLogicException {
        // Arrange
        Integer userId = 2;
        String iban = "DE00000000000000000000";

        // Act
        // Assert
        Assertions.assertThatThrownBy(() -> paymentService.setIban(userId, iban))
                .isInstanceOf(BusinessLogicException.class);
    }

    @Test
    void createPayment_shouldCreateNewPaymentEntry_whenUserIdIsNew() throws BusinessLogicException {
        // Arrange
        Integer userId = 3;
        String iban = "DE00000000000000000000";

        // Act
        boolean success = paymentService.createPayment(userId, iban);

        // Assert
        Assert.assertTrue(success);   
    }

    @Test
    void createPayment_shouldFail_whenUserIdIsAlreadyUsed() throws BusinessLogicException {
        // Arrange
        Integer userId = 1;
        String iban = "DE00000000000000000000";

        // Act
        boolean success = paymentService.createPayment(userId, iban);

        // Assert
        Assert.assertFalse(success);       
    }
}
