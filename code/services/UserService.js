import global from "../components/GlobalVars";
import JwtDecoder from "../components/JwtDecoder";
import fetchWithTimeout from "./FetchHelper";

export class UserService {

    /**
     * Tries to login using the provided credentials. In the successful case, you just get the raw JWT string.
     * For the unsucessful case you have to catch the error. The error will be a dictionary like
     * {"display": true, "message": "DISPLAY THIS MESSAGE TO THE USER"}
     *
     *
     * userService.loginUser(email, password)
     *      .then(response =>{
     *          //response contains the jwt
     *          global.saveAuthenticationToken(response);
     *          navigation.navigate("FindBikeNest");
     *      }).catch((error) => {
     *          if(error.display){
     *              setModalInfo(error.message);
     *          }
     *      };
     * @param {string} email Email address as string
     * @param {string} password Password as string
     * @returns {Promise<string>} This Promise will contain the JWT String that is sent back (if request is successful).
     */
    async loginUser(email, password) {
        let request = {
            "email": email,
            "password": password
        };
        return fetchWithTimeout(global.globalIPAddress + "/usermanagement/signin", {
            method: 'POST',
            body: JSON.stringify(request),
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
        }, 10000).then(json => json.jwt);
    }

    async registerUser(email, password, firstName, lastName) {
        let request = {
            "name": firstName,
            "lastname": lastName,
            "email": email,
            "password": password
        };

        return fetchWithTimeout(global.globalIPAddress + "/usermanagement/signup", {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }, 10000).then(json => json.jwt);
    }

    /**
     * Returns a boolean that indicates if the password change was successful or not.
     * @param oldPassword
     * @param newPassword
     * @returns {Promise<{boolean}>}
     */
    async changePassword(oldPassword, newPassword) {
        let request = {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
        };

        return fetchWithTimeout(global.globalIPAddress + "/usermanagement/changePassword", {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }, 10000).then(json => json.success);
    }

    /**
    * Returns a boolean that indicates if the password change was successful or not.
    * @param firstName
    * @param lastName
    * @param email
    * @param password
    * @returns {Promise<string>} This Promise will contain the JWT String that is sent back (if request is successful).
    */
    async changePersonalInformation(firstName, lastName, email, password) {
        let request = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
        };

        return fetchWithTimeout(global.globalIPAddress + "/usermanagement/changePersonalInformation", {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }, 10000).then(json => json.jwt);
    }

    /**
     * Returns if the user is currently logged in or not.
     * @returns {boolean}
     */
    isLoggedIn() {
        //TODO: Actually check if the jwt is not expired
        let jwt = global.getAuthenticationToken();
        return jwt != null;
    }

    //TODO: These functions are not tested yet
    getFirstName() {
        let jwt = global.getAuthenticationToken();
        let payload = JwtDecoder.decode(jwt);
        return payload.FirstName;
    }

    getLastName() {
        let jwt = global.getAuthenticationToken();
        let payload = JwtDecoder.decode(jwt);
        return payload.LastName;
    }

    getEmail() {
        let jwt = global.getAuthenticationToken();
        let payload = JwtDecoder.decode(jwt);
        return payload.sub;
    }

}
