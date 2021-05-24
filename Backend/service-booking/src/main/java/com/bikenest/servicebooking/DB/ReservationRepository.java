package com.bikenest.servicebooking.DB;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    Iterable<Reservation> findAllByUserId(Integer UserId);
}
