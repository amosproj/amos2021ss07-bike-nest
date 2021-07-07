package com.bikenest.serviceusermgmt.services;

import com.bikenest.serviceusermgmt.models.User;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JWTService {
    private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String buildJwtFromUser(User user){
        String jwt = Jwts.builder()
                .signWith(secretKey)
                .setSubject(user.getEmail())
                .claim("Role", "User")
                .claim("FirstName", user.getName())
                .claim("LastName", user.getLastname())
                .claim("UserId", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 1000000)) //10.000s
                .compact();

        return jwt;
    }

    public String buildAdminJwt(){
        String jwt = Jwts.builder()
                .signWith(secretKey)
                .setSubject("ADMIN")
                .claim("FirstName", "")
                .claim("LastName", "")
                .claim("UserId", "")
                .claim("Role", "Admin")
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 1000000))
                .compact();
        return jwt;
    }

    public boolean validateJWT(String JWT){
        try {
            Jwt parsed = Jwts.parserBuilder().setSigningKey(secretKey).build().parse(JWT);
        }catch(Exception ex){
            return false;
        }
        return true;
    }
}
