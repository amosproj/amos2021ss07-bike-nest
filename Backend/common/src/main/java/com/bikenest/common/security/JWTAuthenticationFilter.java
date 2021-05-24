package com.bikenest.common.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JWTAuthenticationFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest)request;
        String jwt = httpRequest.getHeader("Authorization");
        if(jwt != null){
            String withoutSignature = jwt.substring(0, jwt.lastIndexOf('.')+1);
            Jwt<Header, Claims> claims = Jwts.parserBuilder().build().parseClaimsJwt(withoutSignature);
            AuthToken auth = new AuthToken(claims.getBody());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(request,response);
    }
}
