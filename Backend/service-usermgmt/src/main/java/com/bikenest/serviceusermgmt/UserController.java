package com.bikenest.serviceusermgmt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;

@RestController
@RequestMapping(path="/usermanagement")
public class UserController {
    private Key SECRET_KEY = Keys.hmacShaKeyFor("NdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3".getBytes());

    //Login Endpoint

    //Signup Endpoint

    //jwtauth Endpoint
    @PostMapping(path="/validatejwt")
    public ResponseEntity<Boolean> ValidateJWT(@RequestBody String JWT){
        if(!Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().isSigned(JWT))
        {
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(true);
    }
}
