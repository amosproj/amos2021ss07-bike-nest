package com.bikenest.servicebikenest;

import com.bikenest.servicebikenest.DB.Bikenest;
import com.bikenest.servicebikenest.DB.BikenestRepository;
import com.bikenest.servicebikenest.security.TokenAuthenticationService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(path="/bikenest")
public class BikenestController {
    @Autowired // Automatically get the bikenestRepository Bean
    private BikenestRepository bikenestRepository;

    //Request Params come from query parameters
    @PostMapping(path="/add")
    public @ResponseBody String AddNewBikenest (@RequestParam String Name
            , @RequestParam Integer SpotsLeft, @RequestParam String GPSCoordinates) {
        // @ResponseBody means the returned String is the response, not a view name

        Bikenest bikenest = new Bikenest();
        bikenest.setName(Name);
        bikenest.setSpotsLeft(SpotsLeft);
        bikenest.setGPSCoordinates(GPSCoordinates);

        bikenestRepository.save(bikenest);
        return "Saved";
    }

    @GetMapping(path="/login")
    public String login(@RequestParam String user) throws JOSEException {
        TokenAuthenticationService service = new TokenAuthenticationService();
        if(user.equals("TEST")){
            return service.generateToken(user);
        }
        return "Error";
    }


    @GetMapping(path="/info")
    public @ResponseBody String GetInfo(){
        return "Bikenest Service 1.";
    }


    @GetMapping(path="/all")
    public @ResponseBody Iterable<Bikenest> GetAllBikenests() {
        return bikenestRepository.findAll();
    }
}
