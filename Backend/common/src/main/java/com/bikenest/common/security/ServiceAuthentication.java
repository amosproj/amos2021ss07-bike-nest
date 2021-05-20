package com.bikenest.common.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;

/**
 * This Authentication Object is used exclusivly for services. A service that wants to use another service sets the
 * Authorization Header to "SERVICE". The JWTAuthenticationFilter will create a ServiceAuthentication Object upon recognizing
 * this Authorization Header and sets the local SecurityContext.
 */
public class ServiceAuthentication implements Authentication {
    Logger logger = LoggerFactory.getLogger(ServiceAuthentication.class);

    public ServiceAuthentication(){
        logger.debug("Authenticated a service request.");
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_SERVICE"));
        return grantedAuthorities;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

    }

    @Override
    public String getName() {
        return "Service Auth";
    }
}
