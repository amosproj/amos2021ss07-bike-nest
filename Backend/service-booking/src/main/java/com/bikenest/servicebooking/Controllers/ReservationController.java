package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.interfaces.GeneralResponse;
import com.bikenest.common.interfaces.booking.CreateReservationRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.Services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<GeneralResponse> createReservation(@AuthenticationPrincipal UserInformation user,
                                                             @RequestBody CreateReservationRequest request) {

        try {
            Optional<Reservation> reservation = reservationService.createReservation(user.getUserId(), request);
            return ResponseEntity.ok(new GeneralResponse(true, null, reservation.get()));
        } catch (Exception exception) {
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, exception.getMessage(), null));
        }
    }

    @PostMapping(value="/start/{reservationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<GeneralResponse> StartReservation(@AuthenticationPrincipal UserInformation user,
                                                        @PathVariable("reservationId") Integer reservationId){
        if(!reservationService.isReservationOwner(reservationId, user.getUserId())){
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "You can only start your own reservations.", null));
        }

        Optional<Reservation> reservation = reservationService.startReservation(reservationId);

        if(!reservation.isPresent()){
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "Couldn't find reservation", null));
        }

        return ResponseEntity.ok(new GeneralResponse(true, null, reservation.get()));
    }

    @PostMapping(value="/end/{reservationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<GeneralResponse> EndReservation(@AuthenticationPrincipal UserInformation user,
                                                      @PathVariable("reservationId") Integer reservationId){
        if(!reservationService.isReservationOwner(reservationId, user.getUserId())){
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "You can only end your own reservations.", null));
        }

        Optional<Reservation> reservation = reservationService.endReservation(reservationId);

        if(!reservation.isPresent()){
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "Couldn't find reservation", null));
        }

        return ResponseEntity.ok(new GeneralResponse(true, null, reservation.get()));
    }
}
