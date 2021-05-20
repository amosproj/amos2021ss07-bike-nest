package com.bikenest.common.security;

import io.jsonwebtoken.Claims;

// This Object will hold all of the Information that will be accessible for each Authenticated Endpoint
// You can access it in such an endpoint, by adding a parameter like this: "@AuthenticationPrinciple UserInformation user"
// Spring will auto inject it.
// If the Claims that were provided for construction of this Object do not contain all Information, an error is thrown.
public class UserInformation {
    Claims claims;

    public UserInformation(Claims claims){
        this.claims = claims;

        if(!claims.containsKey("sub") || !claims.containsKey("Role") || !claims.containsKey("FirstName")
            || !claims.containsKey("LastName") || !claims.containsKey("UserId")){
            throw new IllegalArgumentException("An invalid Claims Object was provided to UserInformation!");
        }
    }

    public String getEmail(){
        return claims.getSubject();
    }

    public UserRole getRole(){
        String role = claims.get("Role", String.class);
        if(role.equals("User")){
            return UserRole.User;
        }else if(role.equals("Admin")){
            return UserRole.Admin;
        }else{
            return UserRole.None;
        }
    }

    public String getFirstName(){
        return claims.get("FirstName", String.class);
    }

    public String getLastName(){
        return claims.get("LastName", String.class);
    }

    public Integer getUserId(){
        return claims.get("UserId", Integer.class);
    }

    @Override
    public String toString(){
        return this.getEmail() + ":" + this.getUserId() + ":" + this.getRole().toString();
    }
}
