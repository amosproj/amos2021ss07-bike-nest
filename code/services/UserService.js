import global from "../components/GlobalVars";

export class UserService{

    /**
     * Tries to login using the provided credentials. Returns a dict that contains the field success and the field error.
     * If success is false, then error will contain the error message. Also this function will automatically set the global JWT
     * if it's successful.
     * @param {string} email Email address as string
     * @param {string} password Password as string
     * @returns Dictionary with the fields success and error.
     */
    LoginUser(email, password) {
        let request = {
            "email": email,
            "password": password
        }

        fetch(global.globalIPAddress + "/usermanagement/signin", {
            method: 'POST',
            body: JSON.stringify(request),
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if(json.success){
                    global.saveAuthenticationToken(json.jwt);
                    return {"success": true, "error":null};
                }else{
                    return {"success": false, "error": json.error};
                }
            })
            .catch((error) => {
                console.error(error);
                return {"success": false, "error": error}
            });
    }
}
