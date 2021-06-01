
async function fetchWithTimeout(url, options, timeout){
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)
        options.signal = controller.signal
        return fetch(url, options).then(response => {
            clearTimeout(timeoutId)
            if(response.status == 401){
                throw new Error("Unauthorized! JWT: " + options.headers.Authorization + " Response: " +
                 JSON.stringify(response));
            }else if(response.status == 400){
                // In the Bad request case we want to do proper error handling and maybe display messages to
                // the user, so no Error thrown here
                console.log("Bad request! Did you fill the request body correctly? Body: "
                    + JSON.stringify(options.body) + " Response: " + JSON.stringify(response));
            }else if(response.status != 200){
                throw new Error("Unsucessful request. " + JSON.stringify(response));
            }
            return response.json();
        });
};

/**
 * Use this to fetch API Endpoints that return the GeneralResponse (success, error, payload).
 * @param url
 * @param options
 * @param timeout
 * @returns {Promise<void>}
 */
async function fetchGeneralResponse(url, options, timeout){
    return fetchWithTimeout(url, options, timeout)
        .then(response => {
            console.log("Request(" + url + ") Response: " + JSON.stringify(response));
            return {"success": response.success, "error": response.error, "payload": response.payload};
        }).catch((error) => {
            console.log("Request(" + url + ") Error: " + error);
            return {"success": false, "error": "Ein unbekannter Fehler ist aufgetreten."};
        });
}

export default (fetchWithTimeout, fetchGeneralResponse);
