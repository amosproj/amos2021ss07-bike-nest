package com.bikenest.servicebooking.Reservation;

import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.DB.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

@RestController
@RequestMapping(path="/booking")
public class ReservationController {

    @Autowired
    ReservationRepository reservationRepository;

    @GetMapping("/all")
    public Iterable<Reservation> GetAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping(value = "/add", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<NewReservation> AddNewReservation(@RequestBody NewReservation reservation){
        return ResponseEntity.ok(reservation);
    }
}
