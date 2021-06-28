package com.bikenest.serviceusermgmt.unit;

import com.bikenest.serviceusermgmt.models.User;

import java.util.HashSet;
import java.util.Set;

public class MockHelper {

    /**
     * Returns the User ID 
     * @return
     */
    public static int getUserID(){
        return 1;
    }

    /**
     * Returns the User Name
     * @return
     */
    public static String getUserName(){
        return "Max";
    }

    /**
     * Returns the User LastName
     * @return
     */
    public static String getUserLastname(){
        return "Muster";
    }

    /**
     * Returns the User Eamil 
     * @return
     */
    public static String getEmail(){
        return "Test@test.de";
    }

    /**
     * Returns the User Password 
     * @return
     */
    public static String getPassword(){
        return "Test123";
    }

    /**
     * Returns a new User
     * @return
     */
    public static User constructUser(String name, String lastname, String email, String password){
        User user = new User(name, lastname, email, password);
        return user;
    }
}
