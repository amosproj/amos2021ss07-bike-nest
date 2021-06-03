import global from "../components/GlobalVars";

/**
 * Returns a promise that will always contain the content of the successful response in the non error case.
 * In the error case it will contain whether or not to display an error message to the user and that error message.
 * The responses from the Backend are actually always in the style {"success": bool, "error": string, "payload": dict}.
 * Here we check the ResponseCode (Is it 401 Unauthorized, 422 Unprocessable Entity (BusinessLogic Error), 400 Bad Request
 * (Validation Error) or 200 OK ?)
 * Meaningful error messages should only be returned if the StatusCode was 422. In other cases it is probably a coding bug
 * and should only be logged.
 * Example:
 * fetchWithTimeout(global.globalIPAddress + "/usermanagement/signin", {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
            }).then(response => {
                // Here you can be sure, that the response you got is a successful response
                // In this case the response will therefore just be the JWT String!
                global.saveAuthenticationToken(response);
            }.catch(error => {
                // In this case the call was unsuccesful. error cotains a field display that tells you
                // whether you should display the error message to the user or not
                // and error.message contains the error message
                if(error.display){
                    setModalInfo(error.message);
                }
            };
 * @param url
 * @param options
 * @param timeout
 * @returns {Promise<any>} Returns the Response of the server
 */
async function fetchWithTimeout(url, options, timeout = 15000) {
    // Always set the JWT
    options.headers.Authorization = await global.getAuthenticationToken();

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    options.signal = controller.signal
    return fetch(url, options).then(async response => {
            clearTimeout(timeoutId)
            console.debug("Request: " + url);
            console.debug("RequestBody: " + JSON.stringify(options.body));
            let responseJSON = "";
            try {
                responseJSON = await response.json();
                console.debug("ResponseBody: " + JSON.stringify(responseJSON));
            }catch(e){
                console.debug("Error retrieving JSON from the Response Body!");
            }

            if (response.status == 401) {
                console.debug("### FETCH EXCEPTION ###");
                console.debug("### Unauthorized! Maybe the JWT is expired?");

                // Delete the global jwt, since it is invalid anyways
                global.deleteAuthenticationToken();
                throw {
                    "display": true,
                    "message": "Deine Sitzung ist abgelaufen. Logge dich erneut ein!"
                };
            } else if (response.status == 400) {
                console.debug("### FETCH EXCEPTION ###");
                console.debug("### Bad Request! Maybe you provided some invalid request data? For more info see Backend logs.");
                throw {
                    "display": true,
                    "message": "Die Serveranfrage enthält falsche Daten!"
                };
            } else if (response.status == 422) {
                console.debug("### FETCH EXCEPTION ###");
                console.debug("### Unprocessable Entity! Most likely caused by a BusinessLogicException in the Backend.")
                throw {
                    "display": true,
                    "message": responseJSON.error
                };
            } else if (response.status == 415) {
                console.debug("### FETCH EXCEPTION ###");
                console.debug("### Unsupported Media Type! Did you the the Content-Type Header?");
                throw {
                    "display": false,
                    "message": "Unsupported Media Type"
                };
            } else if (response.status != 200) {
                console.debug("### FETCH EXCEPTION ###");
                console.debug("### Unknown response status (" + response.status + ")...")
                throw {
                    "display": true,
                    "message": "Ein unbekannter Fehler ist aufgetreten!"
                };
            }

            return responseJSON;
        }
    ).catch((error) => {
        //Catch any errors that could have been thrown.
        //We throw a few errors ourself, that are bascially a dictionary, so check if the error looks like
        //our dictionary.
        //If it doesn't then transform it to an error that looks like our dictionary
        if (error.display === undefined) {
            console.debug("### FETCH EXCEPTION ###");
            console.debug("### An error occurred during the fetch. Most likely the fetch just timed out.")
            console.debug("### Is the Backend running and your IP configured correctly?");
            throw {
                "display": true,
                "message": "Zeitüberschreitung bei der Anfrage!"
            };
        } else {
            throw error;
        }
    });
}
;

export default fetchWithTimeout;
