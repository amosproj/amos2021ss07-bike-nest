package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.security.UserInformation;
import com.bikenest.common.security.UserRole;
import com.bikenest.servicebooking.DB.Booking;
import com.bikenest.servicebooking.Services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/booking")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping(name = "/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Booking>> getAllBookings(@AuthenticationPrincipal UserInformation user) throws BusinessLogicException {
        if(user.getRole() == UserRole.User){
            return ResponseEntity.ok(bookingService.getAllByUserId(user.getUserId()));
        }else if(user.getRole() == UserRole.Admin){
            return ResponseEntity.ok(bookingService.getAllBookings());
        }
        throw new BusinessLogicException("Du hast für diese Funktion nicht die erforderlichen Rechte!");
    }
}
