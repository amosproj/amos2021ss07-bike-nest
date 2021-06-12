package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.feignclients.BikenestClient;
import com.bikenest.common.interfaces.booking.CreateReservationRequest;
import com.bikenest.common.interfaces.booking.QRCodeRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.common.security.UserRole;
import com.bikenest.servicebooking.DB.Booking;
import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.Services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/booking/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;
    @Autowired
    BikenestClient bikenestClient;

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Iterable<Reservation>> getAllReservations(@AuthenticationPrincipal UserInformation user) throws BusinessLogicException {
        if (user.getRole() == UserRole.Admin) {
            return ResponseEntity.ok(reservationService.getAllReservations());
        } else if (user.getRole() == UserRole.User) {
            return ResponseEntity.ok(reservationService.getAllReservationByUserId(user.getUserId()));
        } else {
            throw new BusinessLogicException("Du hast für diese Funktion nicht die erforderlichen Rechte.");
        }
    }

    @PostMapping("/forBikenest")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Iterable<Reservation>> getAllReservations(@AuthenticationPrincipal UserInformation user,
                                                                    @RequestBody QRCodeRequest request) throws BusinessLogicException {
        try {
            Integer bikenestId = bikenestClient.getBikenestIdByQr(request);

            List<Reservation> reservations = reservationService.getAllReservations();

            if(user.getRole() == UserRole.User){
                return ResponseEntity.ok(
                        reservations.stream().filter(reservation -> reservation.getBikenestId().equals(bikenestId)
                                && reservation.getUserId().equals(user.getUserId())).collect(Collectors.toList())
                );
            }else if(user.getRole() == UserRole.Admin){
                return ResponseEntity.ok(
                        reservations.stream().filter(reservation -> reservation.getBikenestId().equals(bikenestId))
                                .collect(Collectors.toList())
                );
            }
        }catch(Exception ex){
            throw new BusinessLogicException("Es existiert kein Bikenest mit diesem QR Code.");
        }
        throw new BusinessLogicException("Sie besitzen nicht die erforderlichen Rechte für diese Funktion.");
    }

    @PostMapping(value = "/add", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Reservation> createReservation(@AuthenticationPrincipal UserInformation user,
                                                         @Valid @RequestBody CreateReservationRequest request) throws BusinessLogicException {
        //TODO: Check if payment details are provided and don't create reservation else
        Reservation reservation = reservationService.createReservation(user.getUserId(), request);
        return ResponseEntity.ok(reservation);
    }

    @PostMapping(value = "/cancel/{reservationId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Reservation> cancelReservation(@AuthenticationPrincipal UserInformation user,
                                                         @PathVariable("reservationId") Integer reservationId) throws BusinessLogicException {
        Reservation reservation = reservationService.cancelReservation(reservationId, user.getUserId());

        return ResponseEntity.ok(reservation);
    }
}
