package com.bikenest.servicebikenest.security;

import com.nimbusds.jose.JOSEException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

public class JWTSignInFilter extends AbstractAuthenticationProcessingFilter {

    protected JWTSignInFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, Authentication auth){
        try {
            new TokenAuthenticationService().addAuthentication(auth.getName(), response);
        } catch (JOSEException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String body = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        if(body.equals("test")){
            return new AuthToken(body);
        }
        throw new AuthenticationException("Error signing in") {
            @Override
            public String getMessage() {
                return super.getMessage();
            }
        };
    }
}
