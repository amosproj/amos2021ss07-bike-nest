package com.bikenest.serviceusermgmt.security;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.bikenest.serviceusermgmt.security.UserDetailsImpl;
import io.jsonwebtoken.*;

@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	@Value("${bikenest.app.jwtSecret}")
	private String jwtSecret;

	@Value("${bikenest.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	public String generateJwtToken(Authentication authentication) {

		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

		return Jwts.builder()
				.setSubject((userPrincipal.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512,jwtSecret.getBytes())
				.compact();
	}

	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateJwtToken(String authToken) {
        if(!Jwts.parserBuilder().setSigningKey(jwtSecret).build().isSigned(authToken))
        {
            return false;
        }
        return true;
		// try {
		// 	Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
		// 	return true;
		// } catch (SignatureException e) {
		// 	logger.error("Invalid JWT signature: {}", e.getMessage());
		// } catch (MalformedJwtException e) {
		// 	logger.error("Invalid JWT token: {}", e.getMessage());
		// } catch (ExpiredJwtException e) {
		// 	logger.error("JWT token is expired: {}", e.getMessage());
		// } catch (UnsupportedJwtException e) {
		// 	logger.error("JWT token is unsupported: {}", e.getMessage());
		// } catch (IllegalArgumentException e) {
		// 	logger.error("JWT claims string is empty: {}", e.getMessage());
		// }

		//return false;
	}
}