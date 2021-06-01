package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.interfaces.GeneralResponse;
import com.bikenest.common.interfaces.booking.EndUnlockRequest;
import com.bikenest.common.interfaces.booking.StartUnlockRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.Services.LockService;
import com.bikenest.servicebooking.Services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path="/booking/lock")
public class LockingController {
    @Autowired
    ReservationService reservationService;
    @Autowired
    LockService lockService;

    /**
     * This Endpoint should be called, when the user is standing infront of the Bikenest and wants to store his Bike.
     * Opening of the Bikenest will be handled here.
     * @param user
     * @param request
     * @return
     */
    @PostMapping(value = "/startunlock")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<GeneralResponse> startUnlock(@AuthenticationPrincipal UserInformation user,
                                                            @RequestBody StartUnlockRequest request) {
        if (reservationService.isReservationOwner(request.getReservationId(), user.getUserId()).isPresent()) {
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "You can only start your own reservations.", null));
        }

        Optional<Reservation> reservation = reservationService.startReservation(request.getReservationId());

        if (!reservation.isPresent()) {
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "Couldn't start reservation", null));
        }

        //TODO: really implement the unlocking, there should also be a return code
        lockService.OpenLock(reservation.get().getBikenestId(), reservation.get().getBikespotId());

        return ResponseEntity.ok(new GeneralResponse(true, null, reservation.get()));
    }

    /**
     * This Endpoint should be called, when the user is standing infront of the Bikenest and wants to take his bike.
     * Opening of the Bikenest will be handled here.
     * @param user
     * @param request
     * @return
     */
    @PostMapping(value = "/endunlock")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<GeneralResponse> endUnlock(@AuthenticationPrincipal UserInformation user,
                                                          @RequestBody EndUnlockRequest request) {
        //TODO: Check if the reservation is actually started and don't end it elsewise
        if (reservationService.isReservationOwner(request.getReservationId(), user.getUserId()).isPresent()) {
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "You can only end your own reservations.", null));
        }

        Optional<Reservation> reservation = reservationService.endReservation(request.getReservationId());

        if (!reservation.isPresent()) {
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "Couldn't end reservation", null));
        }

        lockService.OpenLock(reservation.get().getBikenestId(), reservation.get().getBikespotId());

        return ResponseEntity.ok(new GeneralResponse(true, null, reservation.get()));
    }

    /**
     * Should be called, after the Bikenest was opened with /startunlock and after the user placed his bike on his
     * assigned Bikespot. This method will close the gate, but only if the Bikespot sensor is active (accessible through the
     * Raspberry Pi).
     * @param user
     * @param request
     * @return
     */
    @PostMapping(value = "/startlock")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<GeneralResponse> startLock(@AuthenticationPrincipal UserInformation user,
                                                            @RequestBody StartUnlockRequest request) {
        Optional<Reservation> reservation = reservationService.isReservationOwner(request.getReservationId(),
                user.getUserId());

        if (reservation.isEmpty()) {
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "You can only start your own reservations.", null));
        }

        Reservation actualReservation = reservation.get();
        if(lockService.BikespotOccupied(actualReservation.getBikenestId(), actualReservation.getBikespotId())){
            lockService.CloseLock(actualReservation.getBikenestId(), actualReservation.getBikespotId());
            return ResponseEntity.ok(new GeneralResponse(true, null, reservation.get()));
        }else{
            return ResponseEntity.badRequest().body(new GeneralResponse(false, "You didn't place your Bike on the spot." +
                    "Make sure the LED Light on your spot is active.", null));
        }
    }

    @PostMapping(value = "/endlock")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<GeneralResponse> endLock(@AuthenticationPrincipal UserInformation user,
                                                     @RequestBody StartUnlockRequest request) {
        Optional<Reservation> reservation = reservationService.isReservationOwner(request.getReservationId(),
                user.getUserId());

        if (reservation.isEmpty()) {
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "You can only end your own reservations.", null));
        }

        Reservation actualReservation = reservation.get();
        if(!lockService.BikespotOccupied(actualReservation.getBikenestId(), actualReservation.getBikespotId())){
            lockService.CloseLock(actualReservation.getBikenestId(), actualReservation.getBikespotId());
            return ResponseEntity.ok(new GeneralResponse(true, null, reservation.get()));
        }else{
            return ResponseEntity.badRequest().body(new GeneralResponse(false, "You didn't remove your Bike from the spot." +
                    "Make sure the LED Light on your spot is inactive.", null));
        }
    }

}
