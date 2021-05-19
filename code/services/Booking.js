/*
This service provides access to Personal User Data. Currently the Data is just mocked but later it has to be fetched
from an API Endpoint with authentication required. See "Networking" in Expo Documentation for Information on how to access an API.
 */
export class BookingService{

    GetUserID(){
        return "12";
    }

    GetBikeNest(){
        //ID ?
        return "HBF";
    }

    GetNumSlots(){
        return "1";
    }

    GetHours(){
        return "3";
    }

    GetEBike(){
        return "no";
    }

    UpdateBikeNest(){
        return false;
    }

    UpdateNumSlots(){
        return false;
    }

    UpdateHours(){
        return false;
    }

    UpdateEBike(){
        return false;
    }
}
