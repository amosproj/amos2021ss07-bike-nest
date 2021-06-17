package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.feignclients.BikenestClient;
import com.bikenest.common.interfaces.booking.QRCodeRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.common.security.UserRole;
import com.bikenest.servicebooking.DB.Booking;
import com.bikenest.servicebooking.Services.BookingService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/booking")
public class BookingController {

    @Autowired
    BookingService bookingService;
    @Autowired
    BikenestClient bikenestClient;

    @PostMapping(value = "/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Booking>> getAllBookings(@AuthenticationPrincipal UserInformation user) throws BusinessLogicException {
        if(user.getRole() == UserRole.User){
            return ResponseEntity.ok(bookingService.getAllByUserId(user.getUserId()));
        }else if(user.getRole() == UserRole.Admin){
            return ResponseEntity.ok(bookingService.getAllBookings());
        }
        throw new BusinessLogicException("Du hast für diese Funktion nicht die erforderlichen Rechte!");
    }

    @PostMapping(value = "/forBikenest")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Booking>> getAllBookingsByQr(@AuthenticationPrincipal UserInformation user,
                                                                   @Valid @RequestBody QRCodeRequest request) throws BusinessLogicException {
        try{
            Integer bikenestId = bikenestClient.getBikenestIdByQr(request);
            List<Booking> bookings = bookingService.getAllBookings();

            if(user.getRole() == UserRole.User){
                return ResponseEntity.ok(
                        bookings.stream().filter(booking -> booking.getBikenestId().equals(bikenestId)
                                && booking.getUserId().equals(user.getUserId())).collect(Collectors.toList())
                );
            }else if(user.getRole() == UserRole.Admin){
                return ResponseEntity.ok(
                        bookings.stream().filter(booking -> booking.getBikenestId().equals(bikenestId))
                                .collect(Collectors.toList())
                );
            }
        }catch(Exception ex){
            throw new BusinessLogicException("Es existiert kein Bikenest mit diesem QR Code.");
        }
        throw new BusinessLogicException("Sie besitzen nicht die erforderlichen Rechte für diese Funktion.");
    }
}
