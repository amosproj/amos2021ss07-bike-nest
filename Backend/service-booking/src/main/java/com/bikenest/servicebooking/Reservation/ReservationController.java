package com.bikenest.servicebooking.Reservation;

import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.Services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping(path="/booking")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @GetMapping("/all")
    public Iterable<Reservation> GetAllReservations() {
        return reservationService.GetAllReservations();
    }

    @PostMapping(value = "/add", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Reservation> AddNewReservation(@RequestBody NewReservationPOJO newReservation) throws Exception {
        //TODO: Retrieve UserId from JWT
        Optional<Reservation> reservation = reservationService.CreateReservation(10, newReservation);

        return ResponseEntity.ok(reservation.get());
    }

    @PostMapping(value="/start/{reservationId}")
    public ResponseEntity<Reservation> StartReservation(@PathVariable("reservationId") Integer reservationId){
        //TODO: JWT Auth
        Optional<Reservation> reservation = reservationService.StartReservation(reservationId);

        if(!reservation.isPresent()){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(reservation.get());
    }

    @PostMapping(value="/end/{reservationId}")
    public ResponseEntity<Reservation> EndReservation(@PathVariable("reservationId") Integer reservationId){
        //TODO: JWT Auth
        Optional<Reservation> reservation = reservationService.EndReservation(reservationId);

        if(!reservation.isPresent()){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(reservation.get());
    }
}
