package com.bikenest.servicebooking;

import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.DB.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/booking")
public class ReservationController {

    @Autowired
    ReservationRepository reservationRepository;

    @GetMapping("/all")
    public Iterable<Reservation> GetAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping("/add")
    public String AddNewReservation(){
        return "Success";
    }
}
