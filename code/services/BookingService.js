import global from "../components/GlobalVars";
import JwtDecoder from "../components/JwtDecoder";

export class BookingService{

    /**
     * Tries to create a reservation. If it's successful, the returned dictionary will contain success=true and reservation=created reservation object, that could look like this:
     *  "reservation": {
     *  "actualEnd": null,
     *  "actualStart": null,
     *  "bikenestId": 1,
     *  "id": 1,
     *  "payed": false,
     *  "reservationEnd": "2021-05-24T12:43:11.092",
     *  "reservationMinutes": 30,
     *  "reservationStart": "2021-05-24T12:13:11.091",
     *  "userId": 1,
     *  }
     *  Use this function like this:
     *  bookingService.createReservation(1, 30)
     *  .then(response => {
     *      console.log(response);
     *  })
     * @param bikenestId {number}
     * @param reservationMinutes {number}
     * @returns {Promise<any | {success: boolean, error: any}>}
     */
    async createReservation(bikenestId, reservationMinutes) {
        let request = {
            "bikenestId": bikenestId,
            "reservationMinutes": reservationMinutes
        };
        let jwt = await global.getAuthenticationToken();

        return fetch(global.globalIPAddress + "/booking/add", {
            method: 'POST',
            body: JSON.stringify(request),
            headers: { Accept: 'application/json', 'Content-Type': 'application/json',
                        Authorization: jwt}
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("createReservation Response:" + json);
                if(json.success){
                    return {"success": true, "reservation": json.payload};
                }else{
                    return {"success": false, "error": json.error};
                }
            })
            .catch((error) => {
                console.error("createReservation Error:" + error);
                return {"success": false, "error": error}
            });
    }

}