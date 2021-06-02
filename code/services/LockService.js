import global from "../components/GlobalVars";
import fetchGeneralResponse from "./FetchHelper";


export class LockService {

    async startUnlock(reservationId, qrCode) {
        let jwt = await global.getAuthenticationToken();
        let body = {"reservationId": reservationId, "qrCode": qrCode};

        return fetchGeneralResponse(global.globalIPAddress + "/booking/lock/startunlock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                        Authorization: jwt
                    }
            }, 10000);
    }

    async startLock(reservationId) {
        let jwt = await global.getAuthenticationToken();
        let body = {"reservationId": reservationId};

        return fetchGeneralResponse(global.globalIPAddress + "/booking/lock/startlock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                        Authorization: jwt
                    }
            }, 10000);
    }

    async endUnlock(reservationId, qrCode) {
        let jwt = await global.getAuthenticationToken();
        let body = {"reservationId": reservationId, "qrCode": qrCode};

        return fetchGeneralResponse(global.globalIPAddress + "/booking/lock/endunlock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                        Authorization: jwt
                    }
            }, 10000);
    }

    async endLock(reservationId){
        let jwt = await global.getAuthenticationToken();
        let body = {"reservationId": reservationId};

        return fetchGeneralResponse(global.globalIPAddress + "/booking/lock/endlock",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                        Authorization: jwt
                    }
            }, 10000);
    }


}
