/*
This service provides access to Personal User Data. Currently the Data is just mocked but later it has to be fetched
from an API Endpoint with authentication required. See "Networking" in Expo Documentation for Information on how to access an API.
 */
export class UserDataService{

    GetFirstName(){
        return "Max";
    }

    GetLastName(){
        return "Mustermann";
    }

    GetEmail(){
        return "maxmustermann@musteradresse.com";
    }

    UpdateFirstName(firstName){
        return false;
    }

    UpdateLastName(lastName){
        return false;
    }

    UpdateEmail(email){
        return false
    }

    UpdatePassword(oldPassword, newPassword){
        return false;
    }
}
