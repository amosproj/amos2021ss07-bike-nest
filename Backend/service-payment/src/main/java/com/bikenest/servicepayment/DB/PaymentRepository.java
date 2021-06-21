package com.bikenest.servicepayment.DB;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PaymentRepository extends CrudRepository<Payment, Integer> {
    Optional<Payment> findByUserId(Integer UserId);
}
