package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.GeneralExceptionResponse;
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
    public ResponseEntity<Reservation> startUnlock(@AuthenticationPrincipal UserInformation user,
                                                            @RequestBody StartUnlockRequest request) throws BusinessLogicException {
        Reservation reservation = reservationService.getReservationVerified(request.getReservationId(), user.getUserId());
        reservation = reservationService.startReservation(request.getReservationId());

        //TODO: really implement the unlocking, there should also be a return code
        lockService.OpenLock(reservation.getBikenestId(), reservation.getBikespotId());

        return ResponseEntity.ok(reservation);
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
    public ResponseEntity<Reservation> endUnlock(@AuthenticationPrincipal UserInformation user,
                                                          @RequestBody EndUnlockRequest request) throws BusinessLogicException {
        //TODO: Check if the reservation is actually started and don't end it elsewise
        Reservation reservation = reservationService.getReservationVerified(request.getReservationId(), user.getUserId());
        reservation = reservationService.endReservation(reservation.getId());

        lockService.OpenLock(reservation.getBikenestId(), reservation.getBikespotId());

        return ResponseEntity.ok(reservation);
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
    public ResponseEntity<Reservation> startLock(@AuthenticationPrincipal UserInformation user,
                                                            @RequestBody StartUnlockRequest request) throws BusinessLogicException {
        Reservation reservation = reservationService.getReservationVerified(request.getReservationId(), user.getUserId());

        if(lockService.BikespotOccupied(reservation.getBikenestId(), reservation.getBikespotId())){
            lockService.CloseLock(reservation.getBikenestId(), reservation.getBikespotId());
            return ResponseEntity.ok(reservation);
        }else{
            throw new BusinessLogicException("Du hast dein Fahrrad noch nicht korrekt auf dem Platz abgestellt." +
                    "Vergewissere dich, dass das LED Licht an deinem Bikespot aktiv ist.");
        }
    }

    @PostMapping(value = "/endlock")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Reservation> endLock(@AuthenticationPrincipal UserInformation user,
                                                     @RequestBody StartUnlockRequest request) throws BusinessLogicException {
        Reservation reservation = reservationService.getReservationVerified(request.getReservationId(),
                user.getUserId());

        if(!lockService.BikespotOccupied(reservation.getBikenestId(), reservation.getBikespotId())){
            lockService.CloseLock(reservation.getBikenestId(), reservation.getBikespotId());
            return ResponseEntity.ok(reservation);
        }else{
            throw new BusinessLogicException("Du hast dein Fahrrad nicht vom Bikespot entfernt." +
                    "Vergewissere dicht, dass das LED Licht am Bikespot inaktiv ist.");
        }
    }

}
