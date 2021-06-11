import global from "../components/GlobalVars";
import fetchWithTimeout from "./FetchHelper";


export class LockService {

    /**
     * Returns a JSON with the content of a Reservation (see Backend).
     * @param reservationId
     * @param qrCode
     * @returns {Promise<Booking>}
     */
    async startUnlock(reservationId, qrCode) {
        let body = {"reservationId": reservationId, "qrCode": qrCode};

        return fetchWithTimeout(global.globalIPAddress + "/booking/lock/startunlock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    async startLock(bookingId) {
        let body = {"booking": bookingId};

        return fetchWithTimeout(global.globalIPAddress + "/booking/lock/startlock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    async endUnlock(bookingId, qrCode) {
        let body = {"bookingId": bookingId, "qrCode": qrCode};

        return fetchWithTimeout(global.globalIPAddress + "/booking/lock/endunlock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    async endLock(bookingId){
        let body = {"bookingId": bookingId};

        return fetchWithTimeout(global.globalIPAddress + "/booking/lock/endlock",
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
