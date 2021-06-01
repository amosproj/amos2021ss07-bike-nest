import global from "../components/GlobalVars";

export class BookingService {

    /**
     * Gets all reservations that belong to the logged in user.
     * @returns {Promise<{success: boolean, reservations: any[]} | {success: boolean, error: string}>}
     */
    async getAllReservations() {
        let jwt = await global.getAuthenticationToken();

        return fetch(global.globalIPAddress + "/booking/all", {
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                Authorization: jwt
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("getAllReservations Response:" + JSON.stringify(json));
                return {"success": true, "reservations": json};
            })
            .catch((error) => {
                console.error("getAllReservations Error:" + error);
                return {"success": false, "error": error};
            });
    }

    /**
     * Tries to create a reservation. If it's successful, the returned dictionary will contain success=true and reservation=created reservation object, that could look like this:
     *  "reservation": {
     *  "actualEnd": null,
     *  "actualStart": null,
     *  "bikenestId": 1,
     *  "bikspotId": 4
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
     * @returns {Promise<{success: boolean, reservation: any} | {success: boolean, error: string}>}
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
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
                Authorization: jwt
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("createReservation Response:" + JSON.stringify(json));
                if (json.success) {
                    return {"success": true, "reservation": json.payload};
                } else {
                    return {"success": false, "error": json.error};
                }
            })
            .catch((error) => {
                console.error("createReservation Error:" + error);
                return {"success": false, "error": error}
            });
    }
}
