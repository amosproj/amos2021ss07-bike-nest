package com.bikenest.serviceusermgmt.helper;

import com.bikenest.serviceusermgmt.models.User;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

/**
 * A Singleton Class is used here, because exactly one secret key should be generated per application startup.
 * With this Key, all of the JSON Web Tokens will be built. This means of course, that all generated JWTs will be invalid,
 * after a server reboot.
 */
public class JWTHelper {
    private JWTHelper(){
    }
    private static JWTHelper singleton;

    public static JWTHelper GetSingleton(){
        if(singleton == null)
            singleton = new JWTHelper();
        return singleton;
    }

    private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String BuildJwtFromUser(User user){
        String jwt = Jwts.builder()
                .signWith(secretKey)
                .setSubject(user.getEmail())
                .claim("Role", "User")
                .claim("FirstName", user.getName())
                .claim("LastName", user.getLastname())
                .claim("UserId", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + 1000000))
                .compact();

        return jwt;
    }

    public String BuildAdminJwt(){
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

    public boolean ValidateJWT(String JWT){
        try {
            Jwt parsed = Jwts.parserBuilder().setSigningKey(secretKey).build().parse(JWT);
        }catch(Exception ex){
            return false;
        }
        return true;
    }
}
