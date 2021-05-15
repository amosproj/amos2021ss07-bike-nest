package com.bikenest.servicebooking.Reservation;

import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.DB.ReservationRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Optional;

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
    public ResponseEntity<Reservation> AddNewReservation(@RequestBody NewReservationPOJO newReservation){
        Reservation reservation = Reservation.FromNewReservation(newReservation);
        reservation.setUserId(10); //TODO: Retrieve this UserId from the JWT

        reservationRepository.save(reservation);
        return ResponseEntity.ok(reservation);
    }

    @PostMapping(value="/start/{reservationId}")
    public ResponseEntity<Reservation> StartReservation(@PathVariable("reservationId") Integer reservationId){
        //TODO: JWT Auth
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if(!reservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        reservation.get().setActualStartDateTime(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
        reservationRepository.save(reservation.get());
        return ResponseEntity.ok(reservation.get());
    }

    @PostMapping(value="/end/{reservationId}")
    public ResponseEntity<Reservation> EndReservation(@PathVariable("reservationId") Integer reservationId){
        //TODO: JWT Auth
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if(!reservation.isPresent()){
            return ResponseEntity.notFound().build();
        }
        reservation.get().setActualEndDateTime(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
        reservationRepository.save(reservation.get());
        return ResponseEntity.ok(reservation.get());
    }
}
