package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.feignclients.BikenestClient;
import com.bikenest.common.interfaces.booking.EndUnlockRequest;
import com.bikenest.common.interfaces.booking.StartLockRequest;
import com.bikenest.common.interfaces.booking.StartUnlockRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.servicebooking.DB.Booking;
import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.Services.BookingService;
import com.bikenest.servicebooking.Services.LockService;
import com.bikenest.servicebooking.Services.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/booking/lock")
public class LockingController {
    @Autowired
    BookingService bookingService;
    @Autowired
    LockService lockService;

    Logger logger = LoggerFactory.getLogger(LockingController.class);

    /**
     * This Endpoint should be called, when the user is standing infront of the Bikenest and wants to store his Bike.
     * Opening of the Bikenest will be handled here.
     * @param user
     * @param request
     * @return
     */
    @PostMapping(value = "/startunlock")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Booking> startUnlock(@AuthenticationPrincipal UserInformation user,
                                               @RequestBody StartUnlockRequest request) throws BusinessLogicException {
        Booking booking = bookingService.createBooking(user.getUserId(), request.getReservationId());

        //TODO: really implement the unlocking, there should also be a return code
        logger.info("Unlocking the Bikenest. Reservation begins now. Place the Bike inside now and close the door!");
        logger.info("**Bikespot starts blinking** (Send request to RaspberryPi)");
        lockService.OpenLock(user.getUserId(), booking.getBikenestId(), booking.getBikespotNumber());

        return ResponseEntity.ok(booking);
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
    public ResponseEntity<Booking> endUnlock(@AuthenticationPrincipal UserInformation user,
                                                          @RequestBody EndUnlockRequest request) throws BusinessLogicException {
        Booking booking = bookingService.getVerifiedBooking(user.getUserId(), request.getBookingId());

        logger.info("You want to take your Bike? The door is open now!");
        lockService.OpenLock(user.getUserId(), booking.getBikenestId(), booking.getBikespotNumber());

        return ResponseEntity.ok(booking);
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
    public ResponseEntity<Booking> startLock(@AuthenticationPrincipal UserInformation user,
                                                            @RequestBody StartLockRequest request) throws BusinessLogicException {
        Booking booking = bookingService.getVerifiedBooking(user.getUserId(), request.getBookingId());

        if(lockService.BikespotOccupied(booking.getBikenestId(), booking.getBikespotNumber())){
            booking = bookingService.deliveredBike(user.getUserId(), request.getBookingId());

            logger.info("You have placed your Bike inside. Closing the door now.");
            lockService.CloseLock(user.getUserId(), booking.getBikenestId(), booking.getBikespotNumber());
            return ResponseEntity.ok(booking);
        }else{
            throw new BusinessLogicException("Du hast dein Fahrrad noch nicht korrekt auf dem Platz abgestellt." +
                    "Vergewissere dich, dass das LED Licht an deinem Bikespot aktiv ist.");
        }
    }

    @PostMapping(value = "/endlock")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Booking> endLock(@AuthenticationPrincipal UserInformation user,
                                                     @RequestBody EndUnlockRequest request) throws BusinessLogicException {
        Booking booking = bookingService.getVerifiedBooking(user.getUserId(), request.getBookingId());
        //TODO: REMOVE || true
        if(!lockService.BikespotOccupied(booking.getBikenestId(), booking.getBikespotNumber()) || true){
            logger.info("You took your bike and the door will be closed now.");
            lockService.CloseLock(user.getUserId(), booking.getBikenestId(), booking.getBikespotNumber());
            if(!bookingService.freeReservedSpot(booking.getBikenestId(), booking.getBikespotNumber(), user.getUserId())){
                throw new BusinessLogicException("Konnte den reservierten Spot nicht freigeben.");
            }
            return ResponseEntity.ok(bookingService.tookBike(user.getUserId(), request.getBookingId()));
        }else{
            throw new BusinessLogicException("Du hast dein Fahrrad nicht vom Bikespot entfernt." +
                    "Vergewissere dicht, dass das LED Licht am Bikespot inaktiv ist.");
        }
    }

}
