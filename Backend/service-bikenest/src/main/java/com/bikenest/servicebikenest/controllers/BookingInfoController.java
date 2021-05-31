package com.bikenest.servicebikenest.controllers;

import com.bikenest.common.interfaces.bikenest.FreeSpotRequest;
import com.bikenest.common.interfaces.bikenest.ReserveSpotRequest;
import com.bikenest.common.interfaces.bikenest.ReserveSpotResponse;
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
    public ReserveSpotResponse reserveSpot(@RequestBody ReserveSpotRequest request){
        Optional<Integer> result = bikenestService.reserveSpot(request.getBikenestId(), request.getUserId());
        if(!result.isPresent()){
            return new ReserveSpotResponse(false, null, null);
        }
        return new ReserveSpotResponse(true, request.getBikenestId(), result.get());
    }

    @PostMapping(path="/freespot")
    @PreAuthorize("hasRole('SERVICE')")
    public boolean freeSpot(@RequestBody FreeSpotRequest request){
        return bikenestService.freeSpot(request.getBikenestId(), request.getUserId(), request.getSpotId());
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
