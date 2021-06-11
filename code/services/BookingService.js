import global from "../components/GlobalVars";
import fetchWithTimeout from "./FetchHelper";

export class BookingService {

    /**
     * Gets all bookings that belong to the logged in user.
     * @returns {Promise<any[]>}
     */
    async getAllBookings() {
        return fetchWithTimeout(global.globalIPAddress + "/booking/all",
            {
                method: 'GET',
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }
}
