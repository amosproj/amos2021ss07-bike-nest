package com.bikenest.common.security;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AuthToken implements Authentication {
    private UserInformation userInformation;

    public AuthToken(Claims claims){
        this.userInformation = new UserInformation(claims);
    }

    //This can be used with @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    //TODO: Implement this later...
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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
        return userInformation;
    }

    @Override
    public boolean isAuthenticated() {
        return true;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
    }

    @Override
    public boolean equals(Object another) {
        return false;
    }

    @Override
    public String toString() {
        return this.userInformation.toString();
    }

    @Override
    public int hashCode() {
        return 0;
    }

    @Override
    public String getName() {
        return this.userInformation.getEmail();
    }
}
