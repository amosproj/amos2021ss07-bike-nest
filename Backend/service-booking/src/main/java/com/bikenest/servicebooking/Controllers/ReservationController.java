package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.GeneralExceptionResponse;
import com.bikenest.common.interfaces.GeneralResponse;
import com.bikenest.common.interfaces.booking.CreateReservationRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.common.security.UserRole;
import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.Services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping(path = "/booking")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Iterable<Reservation>> GetAllReservations(@AuthenticationPrincipal UserInformation user) throws BusinessLogicException {
        if (user.getRole() == UserRole.Admin) {
            return ResponseEntity.ok(reservationService.getAllReservations());
        } else if (user.getRole() == UserRole.User) {
            return ResponseEntity.ok(reservationService.getAllReservationByUserId(user.getUserId()));
        }else{
            throw new BusinessLogicException("Du hast die Funktion nicht die erforderlichen Rechte.");
        }
    }

    @PostMapping(value = "/add", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Reservation> createReservation(@AuthenticationPrincipal UserInformation user,
                                                             @RequestBody CreateReservationRequest request) throws BusinessLogicException {
        //TODO: Check if payment details are provided and don't create reservation else
        Reservation reservation = reservationService.createReservation(user.getUserId(), request);
        return ResponseEntity.ok(reservation);
    }

    @PostMapping(value = "/cancel/{reservationId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<GeneralResponse> cancelReservation(@AuthenticationPrincipal UserInformation user,
                                                             @PathVariable("reservationId") Integer reservationId) throws BusinessLogicException {
        Reservation reservation = reservationService.cancelReservation(reservationId, user.getUserId());

        return ResponseEntity.ok(new GeneralResponse(reservation));
    }
}
