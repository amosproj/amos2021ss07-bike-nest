import global from "../components/GlobalVars";
import fetchWithTimeout from "./FetchHelper";


export class LockService {

    /**
     * Returns a JSON with the content of a Reservation (see Backend).
     * @param reservationId
     * @param qrCode
     * @returns {Promise<Booking>}
     */
    async deliverUnlock(reservationId, qrCode) {
        let body = {"reservationId": reservationId, "qrCode": qrCode};

        return fetchWithTimeout(global.globalIPAddress + "/api/service-booking/lock/deliverUnlock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    async deliverLock(bookingId) {
        let body = {"bookingId": bookingId};

        return fetchWithTimeout(global.globalIPAddress + "/api/service-booking/lock/deliverLock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    async takeUnlock(bookingId, qrCode) {
        let body = {"bookingId": bookingId, "qrCode": qrCode};

        return fetchWithTimeout(global.globalIPAddress + "/api/service-booking/lock/takeUnlock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    async takeLock(bookingId){
        let body = {"bookingId": bookingId};

        return fetchWithTimeout(global.globalIPAddress + "/api/service-booking/lock/takeLock",
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
