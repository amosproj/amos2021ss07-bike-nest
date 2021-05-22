package com.bikenest.servicebikenest;

import com.bikenest.common.interfaces.bikenest.BikeNestInfoResponse;
import com.bikenest.common.security.UserInformation;
import com.bikenest.common.security.UserRole;
import com.bikenest.servicebikenest.DB.Bikenest;
import com.bikenest.servicebikenest.DB.BikenestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/bikenest")
public class BikenestController {

    @Autowired
    private BikenestRepository bikenestRepository;


    @PostMapping(path = "/add")
    @PreAuthorize("hasRole('ADMIN')")
    /**
     * Adds a new Bikenest with the given Query Parameters.
     * TODO: Accept a JSON Body with the Params
     */
    public @ResponseBody
    String AddNewBikenest(@RequestParam String Name,
                          @RequestParam Integer SpotsLeft, @RequestParam String GPSCoordinates) {

        Bikenest bikenest = new Bikenest();
        bikenest.setName(Name);
        bikenest.setSpotsLeft(SpotsLeft);
        bikenest.setGPSCoordinates(GPSCoordinates);

        bikenestRepository.save(bikenest);
        return "Saved";
    }

    @GetMapping(path = "/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public @ResponseBody
    Iterable<Bikenest> GetAllBikenests() {
        return bikenestRepository.findAll();
    }

    @GetMapping(path = "/deleteAll")
    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody
    String deleteAll(@AuthenticationPrincipal UserInformation user) {
        if (user.getRole() == UserRole.Admin) {
            bikenestRepository.deleteAll();
            return "All Entities deleted.";
        }
        return "No permission to do this!";
    }

    @PostMapping("/get")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<BikeNestInfoResponse> GetBikenest(@Valid @RequestBody BikeNestInfoRequest bikenestInfoRequest) {
		Optional<Bikenest> bikenest = bikenestRepository.(bikenestInfoRequest.getID());


		// if(!bikenest.isPresent()){
		// 	return ResponseEntity.badRequest().body(new SigninResponse(false, "Email not found!", null));
		// }
		// if(loginRequest.getPassword().equals(user.get().getPassword()))
		// {
		// 	String jwt = JWTHelper.GetSingleton().BuildJwtFromUser(user.get());
		// 	return ResponseEntity.ok(new SigninResponse(true, null, jwt));
		// }
		return ResponseEntity.badRequest().body(new BikeNestInfoResponse(null, null, 0, false));
	}
}
