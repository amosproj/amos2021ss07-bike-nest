import global from "../components/GlobalVars";

export class UserService{

    /**
     * Tries to login using the provided credentials. Returns a dict that contains the field success and the field error.
     * If success is false, then error will contain the error message. Also this function will automatically set the global JWT
     * if it's successful.
     * Use it like this:
     * userService.LoginUser(email, password)
     *      .then(response =>{
     *          if(response?.success){
     *              navigation.navigate("FindBikeNest");
     *          }else{
     *              setModalInfo(response?.error);
     *          }
     *      });
     * @param {string} email Email address as string
     * @param {string} password Password as string
     * @returns Promise with Dictionary with the fields success and error.
     */
    async loginUser(email, password) {
        let request = {
            "email": email,
            "password": password
        }

        return fetch(global.globalIPAddress + "/usermanagement/signin", {
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
