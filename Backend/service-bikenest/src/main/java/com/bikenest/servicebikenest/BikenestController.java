package com.bikenest.servicebikenest;

import com.bikenest.common.security.AuthToken;
import com.bikenest.common.security.UserInformation;
import com.bikenest.common.security.UserRole;
import com.bikenest.servicebikenest.DB.Bikenest;
import com.bikenest.servicebikenest.DB.BikenestRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    public String login(@RequestParam String user) {
        if(user.equals("TEST")){
            String jwt = Jwts.builder().signWith(Keys.hmacShaKeyFor("NdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3".getBytes()))
                    .setSubject("TEST").compact();
            return jwt;
        }
        return "Invalid user";
    }

    @GetMapping(path="/getUser")
    public String getUser(@AuthenticationPrincipal UserInformation user){
        return user.toString();
    }


    @GetMapping(path="/info")
    public @ResponseBody String GetInfo(){
        return "Bikenest Service 3.";
    }


    @GetMapping(path="/all")
    public @ResponseBody Iterable<Bikenest> GetAllBikenests() {
        return bikenestRepository.findAll();
    }

   @GetMapping(path="/deleteAll") 
    public @ResponseBody String deleteAll(@AuthenticationPrincipal UserInformation user) {
        if(user.getRole() == UserRole.Admin){
            bikenestRepository.deleteAll();
            return "All Entities deleted.";
        }
        return "No permission to do this!";
    }
}
