import global from "../components/GlobalVars";
import fetchWithTimeout from "./FetchHelper";

export class BookingService {

    /**
     * Gets all bookings that belong to the logged in user.
     * @returns {Promise<any[]>}
     */
    async getAllBookings() {
        return fetchWithTimeout(global.globalIPAddress + "/api/service-booking/booking/all",
            {
                method: 'GET',
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    async getBookingsByQr(qrCode){
        let request = {"qrCode": qrCode};
        return fetchWithTimeout(global.globalIPAddress + "/api/service-booking/booking/forBikenest",
            {
                method: 'POST',
                body: JSON.stringify(request),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, timeout)
    }
}
