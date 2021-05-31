package com.bikenest.servicebikenest.controllers;

import com.bikenest.servicebikenest.services.BikenestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * This Controller provides functionality that will be used by the Booking Microservice.
 * You can reserve concrete spots for
 */
@RestController
@RequestMapping(path = "/bikenest/service")
public class BookingInfoController {

    @Autowired
    BikenestService bikenestService;

    @PostMapping(path="/bikenestexists")
    @PreAuthorize("hasRole('SERVICE')")
    public boolean existsBikenest(@RequestBody Integer bikenestId){
        return bikenestService.existsBikenest(bikenestId);
    }

    @PostMapping(path="/reservespot")
    @PreAuthorize("hasRole('SERVICE')")
    public boolean reserveSpot(@RequestBody Integer bikenestId){
        return bikenestService.reserveSpot(bikenestId);
    }

    @PostMapping(path="/freespot")
    @PreAuthorize("hasRole('SERVICE')")
    public boolean freeSpot(@RequestBody Integer bikenestId){
        return bikenestService.freeSpot(bikenestId);
    }

    @PostMapping(path="/hasfreespots")
    @PreAuthorize("hasRole('SERVICE')")
    public boolean hasFreeSpots(@RequestBody Integer bikenestId){
        Optional<Integer> freeSpots = bikenestService.getFreeSpots(bikenestId);
        if (freeSpots.isPresent() && freeSpots.get() > 0){
            return true;
        }
        return false;
    }

}
