package com.bikenest.servicebikenest.Controllers;

import com.bikenest.common.interfaces.GeneralResponse;
import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.common.security.UserRole;
import com.bikenest.servicebikenest.DB.Bikenest;
import com.bikenest.servicebikenest.services.BikenestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import com.bikenest.common.interfaces.bikenest.BikenestInfoResponse;
import com.bikenest.common.interfaces.bikenest.BikenestInfoRequest;

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
    public ResponseEntity<GeneralResponse> addNewBikenest(@RequestBody AddBikenestRequest request) {
        Optional<Bikenest> bikenest = bikenestService.addBikenest(request);

        if(!bikenest.isPresent()){
            return ResponseEntity.badRequest().body(
                    new GeneralResponse(false, "Couldn't add Bikenest.", null));
        }

        return ResponseEntity.ok(new GeneralResponse(true, null, bikenest.get()));
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<Bikenest> getAllBikenests() {
        return bikenestService.getAllBikenests();
    }

    @GetMapping(path = "/deleteAll")
    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    ResponseEntity<GeneralResponse> deleteAll(@AuthenticationPrincipal UserInformation user) {
        if (user.getRole() == UserRole.Admin) {
            bikenestService.deleteAllBikenests();
            return ResponseEntity.ok(new GeneralResponse(true, null, null));
        }
        return ResponseEntity.badRequest().body(
                new GeneralResponse(false, "Admin role for this operation required.", null));
    }

    @PostMapping(path = "/bikenestInfo")
    public @ResponseBody
    ResponseEntity<BikenestInfoResponse> getBikenestInfo(@RequestBody BikenestInfoRequest request) {       
        int id = request.getBikenestID();

        if(bikenestService.existsBikenest(id)){
            Bikenest bikenestInfo = bikenestService.getBikenestInfo(id).get();
            return ResponseEntity.ok(
                new BikenestInfoResponse(bikenestInfo.getName(), "", bikenestInfo.getCurrentSpots(), bikenestInfo.isChargingAvailable()));
        }
       
        return ResponseEntity.badRequest().body(
            new BikenestInfoResponse("NaN", "NaN", 0, false));
    }
}
