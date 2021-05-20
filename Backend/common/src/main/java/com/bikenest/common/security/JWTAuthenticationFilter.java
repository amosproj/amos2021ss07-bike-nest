package com.bikenest.common.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * This Filter is configured for every service and will check the Authorization Header.
 * If the Header contains the Value "SERVICE" then an Authentication Object with the Service Role will be set for the
 * current SecurityContext. Else it will try to parse the String as JWT and set the Authentication based on the JWT Claims.
 * The JWT is NOT VALIDATED.
 * It's the Task of the API Gateway, that no Authorization Header with an invalid JWT or with the value "SERVICE" will be
 * forwarded to any service. Instead the Authorization Header is stripped away from the request.
 */
public class JWTAuthenticationFilter extends GenericFilterBean {

    Logger logger = LoggerFactory.getLogger(JWTAuthenticationFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest)request;
        String jwt = httpRequest.getHeader("Authorization");

        // In this case we found SERVICE in the Authorization Header, which means this request come from a service
        // Therefore we give the Service rights
        if(jwt != null && jwt.equals("SERVICE")){
            SecurityContextHolder.getContext().setAuthentication(new ServiceAuthentication());
        }else if(jwt != null){
            // Parse JWT without checking the Signature. If the request got here from the API Gateway, we can be sure
            // that the JWT is valid.
            try{
                String withoutSignature = jwt.substring(0, jwt.lastIndexOf('.')+1);
                Jwt<Header, Claims> claims = Jwts.parserBuilder().build().parseClaimsJwt(withoutSignature);
                JWTAuthentication auth = new JWTAuthentication(claims.getBody());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }catch(Exception ex){
                // If any exceptions happen, we set the Authentication to null, so that the request is not authenticated
                // but it doesn't crash.
                SecurityContextHolder.getContext().setAuthentication(null);
                logger.error("Removed the JWT Authentication because there was an error during JWT parsing.");
            }
        }

        chain.doFilter(request,response);
    }
}
