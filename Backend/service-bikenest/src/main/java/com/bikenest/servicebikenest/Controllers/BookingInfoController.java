package com.bikenest.servicebikenest.Controllers;

import com.bikenest.servicebikenest.services.BikenestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/bikenest/service")
public class BookingInfoController {

    @Autowired
    BikenestService bikenestService;

    @PostMapping(path="/bikenestexists")
    @PreAuthorize("hasRole('SERVICE')")
    public boolean ExistsBikenest(@RequestBody Integer bikenestId){
        return bikenestService.existsBikenest(bikenestId);
    }

    @PostMapping(path="/reservespot")
    @PreAuthorize("hasRole('SERVICE')")
    public boolean ReserveSpot(@RequestBody Integer bikenestId){
        return bikenestService.reserveSpot(bikenestId);
    }

    @PostMapping(path="/freespot")
    @PreAuthorize("hasRole('SERVICE')")
    public boolean FreeSpot(@RequestBody Integer bikenestId){
        return bikenestService.freeSpot(bikenestId);
    }

}
