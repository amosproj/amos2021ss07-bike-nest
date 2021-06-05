package com.bikenest.servicebikenest.controllers;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import com.bikenest.common.interfaces.bikenest.BikenestInfoRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.common.security.UserRole;
import com.bikenest.servicebikenest.db.Bikenest;
import com.bikenest.servicebikenest.services.BikenestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/bikenest")
public class BikenestController {

    @Autowired
    private BikenestService bikenestService;


    @PostMapping(path = "/add")
    @PreAuthorize("hasRole('ADMIN')")
    /**
     * Adds a new Bikenest with the given Query Parameters.
     */
    public ResponseEntity<Bikenest> addNewBikenest(@Valid @RequestBody AddBikenestRequest request) throws BusinessLogicException {
        Bikenest bikenest = bikenestService.addBikenest(request);
        return ResponseEntity.ok(bikenest);
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    ResponseEntity<List<Bikenest>> getAllBikenests() {
        // Remove the Bikespot Information before returning this
        List<Bikenest> bikenests = bikenestService.getAllBikenests();
        bikenests.forEach(x -> x.setBikespots(null));
        return ResponseEntity.ok(bikenests);
    }

    @GetMapping(path = "/deleteall")
    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    ResponseEntity<Boolean> deleteAll(@AuthenticationPrincipal UserInformation user) throws BusinessLogicException {
        if (user.getRole() == UserRole.Admin) {
            bikenestService.deleteAllBikenests();
            return ResponseEntity.ok(true);
        }else{
            throw new BusinessLogicException("Sie besitzen nicht die erforderlichen Rechte für diese Operation!");
        }
    }

    @PostMapping(path = "/bikenestinfo")
    public @ResponseBody
    ResponseEntity<Bikenest> getBikenestInfo(@Valid @RequestBody BikenestInfoRequest request) throws BusinessLogicException {
        return ResponseEntity.ok(bikenestService.getBikenestInfo(request.getBikenestID()));
    }
}
