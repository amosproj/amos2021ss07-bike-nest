package com.bikenest.common.security;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * The @JWTAuthenticationFilter will set the Authentication Object of the SecurityContext to an Object of this class,
 * if a JWT was provided. That object can be retrieved inside Endpoints by using SecurityContextHolder.getContext().getAuthentication()
 * You can then Access a @UserInformation Object by calling getPrincipal on AuthToken. A better alternative to this is however
 * to annotate a UserInformation Paramter in an controller endpoint with @AuthenticationPrincipal. Spring will then autoinject
 * the UserInformation Object.
 */
public class JWTAuthentication implements Authentication {
    private UserInformation userInformation;

    public JWTAuthentication(Claims claims) {
        this.userInformation = new UserInformation(claims);
    }

    /**
     * This can be used with @PreAuthorize("hasRole('USER') or hasRole('ADMIN')" to secure Endpoints.
     * The Role is retrieved from the provided JWT. It is possible to add even finer grained Privileges here, for
     * example one could add a READ_PRIVILEGE that will allow to access read only Endpoints.
     */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + userInformation.getRole().toString().toUpperCase()));
        return authorities;
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
    public UserInformation getPrincipal() {
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
