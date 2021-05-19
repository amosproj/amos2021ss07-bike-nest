package com.bikenest.serviceusermgmt.helper;

import com.bikenest.serviceusermgmt.models.User;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseEntity;

import java.security.Key;
import java.util.Date;

//Singleton Class used here, because we want exactly one secret key generated per startup
public class JWTHelper {
    private JWTHelper(){
    }
    private static JWTHelper singleton;

    public static JWTHelper GetSingleton(){
        if(singleton == null)
            singleton = new JWTHelper();
        return singleton;
    }

    private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String BuildJwtFromUser(User user){
        String jwt = Jwts.builder()
                .signWith(secretKey)
                .setSubject(user.getEmail())
                //TODO: Fill these claims correctly, have a look at UserInformation in Common Project to see whats expected
                .claim("Role", "User")
                .claim("FirstName", user.getUsername())
                .claim("LastName", user.getUsername())
                .claim("UserId", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 1000000))
                .compact();

        return jwt;
    }

    public boolean ValidateJWT(String JWT){
        try {
            Jwt parsed = Jwts.parserBuilder().setSigningKey(secretKey).build().parse(JWT);
        }catch(Exception ex){
            return false;
        }
        return true;
    }
}
