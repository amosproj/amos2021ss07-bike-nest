/*
This service provides access to Personal User Data. Currently the Data is just mocked but later it has to be fetched
from an API Endpoint with authentication required. See "Networking" in Expo Documentation for Information on how to access an API.
 */
export class UserDataService{

    public GetFirstName(): string{
        return "Max";
    }

    public GetLastName(): string{
        return "Mustermann";
    }

    public GetEmail(): string{
        return "maxmustermann@musteradresse.com";
    }

    public UpdateFirstName(firstName: string): boolean{
        return false;
    }

    public UpdateLastName(lastName: string): boolean{
        return false;
    }

    public UpdateEmail(email: string): boolean{
        return false
    }
}
