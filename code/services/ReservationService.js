import global from "../components/GlobalVars";
import fetchWithTimeout from "./FetchHelper";

export class ReservationService {

    /**
     * Gets all reservations that belong to the logged in user.
     * @returns {Promise<any[]>}
     */
    async getAllReservations() {
        return fetchWithTimeout(global.globalIPAddress + "/reservation/all",
            {
                method: 'GET',
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    /**
     * Returns a Promise that contains the created reservation if the request was successful.
     *
     *  Use this function like this:
     *  bookingService.createReservation(1, 30)
     *  .then(reservation => {
     *      console.log(reservation);
     *  }).catch(error => {
     *      if(error.display){
     *          //display error.message
     *      }else{
     *          //display a generic error message
     *      }
     *  }
     * @param bikenestId {number}
     * @param reservationMinutes {number}
     * @returns {Promise<Reservation>}
     */
    async createReservation(bikenestId, reservationMinutes) {
        let body = {
            "bikenestId": bikenestId,
            "reservationMinutes": reservationMinutes
        };

        return fetchWithTimeout(global.globalIPAddress + "/reservation/add",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }
}
