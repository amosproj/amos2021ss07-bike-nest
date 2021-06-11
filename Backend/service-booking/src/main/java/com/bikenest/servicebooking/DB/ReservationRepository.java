package com.bikenest.servicebooking.DB;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findAllByUserId(Integer UserId);
}
