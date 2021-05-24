import global from "../components/GlobalVars";
import JwtDecoder from "../components/JwtDecoder";

export class UserService{

    /**
     * Tries to login using the provided credentials. Returns a dict that contains the field success and the field error.
     * If success is false, then error will contain the error message. Also this function will automatically set the global JWT
     * if it's successful.
     * Use it like this:
     * userService.loginUser(email, password)
     *      .then(response =>{
     *          if(response?.success){
     *              navigation.navigate("FindBikeNest");
     *          }else{
     *              setModalInfo(response?.error);
     *          }
     *      });
     * @param {string} email Email address as string
     * @param {string} password Password as string
     * @returns {Promise<any | {success: boolean, error: any}>} A promise with a dictionary that contains the fields success and error. If success is false, you can read the error field.
     */
    async loginUser(email, password) {
        let request = {
            "email": email,
            "password": password
        };

        return fetch(global.globalIPAddress + "/usermanagement/signin", {
            method: 'POST',
            body: JSON.stringify(request),
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("loginUser Response:" + JSON.stringify(json));
                if(json.success){
                    global.saveAuthenticationToken(json.jwt);
                    return {"success": true, "error":null};
                }else{
                    return {"success": false, "error": json.error};
                }
            })
            .catch((error) => {
                console.error("loginUser Error:" + error);
                return {"success": false, "error": error}
            });
    }

    /**
     * Tries to sign up with the backend using email, password, first name and last name. Returns a promise with a dictionary. You can check the success field of this dictionary and
     * if success is false, show the error message to the user.
     * Use it like this:
     * userService.registerUser(email, password, firstName, lastName)
     *      .then(response =>{
     *          if(response?.success){
     *              setModalInfo("Erfolgreich registriert.");
     *          }else{
     *              setModalInfo(response?.error);
     *          }
     *      });
     * @param email {string}
     * @param password {string}
     * @param firstName {string}
     * @param lastName {string}
     * @returns {Promise<any | {success: boolean, error: any}>} A promise with a dictionary that contains the fields success and error. If success is false, you can read the error field.
     */
    async registerUser(email, password, firstName, lastName){
        let request = {
            "name": firstName,
            "lastname": lastName,
            "email": email,
            "password": password
        };

        return fetch(global.globalIPAddress + "/usermanagement/signup", {
            method: 'POST',
            body: JSON.stringify(request),
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("registerUser Response:" + JSON.stringify(json));
                if(json.success){
                    global.saveAuthenticationToken(json.jwt);
                    return {"success": true, "error": null};
                }else{
                    return {"success": false, "error": json.error};
                }
            })
            .catch((error) => {
                console.error("registerUser Error:" + error);
                return {"success": false, "error": error}
            });
    }

    /**
     * Returns if the user is currently logged in or not.
     * @returns {boolean}
     */
    isLoggedIn(){
        //TODO: Actually check if the jwt is not expired
        let jwt = global.getAuthenticationToken();
        return jwt != null;
    }

    //TODO: These functions are not tested yet
    getFirstName(){
        let jwt = global.getAuthenticationToken();
        let payload = JwtDecoder.decode(jwt);
        return payload.FirstName;
    }

    getLastName(){
        let jwt = global.getAuthenticationToken();
        let payload = JwtDecoder.decode(jwt);
        return payload.LastName;
    }

    getEmail(){
        let jwt = global.getAuthenticationToken();
        let payload = JwtDecoder.decode(jwt);
        return payload.sub;
    }

}
