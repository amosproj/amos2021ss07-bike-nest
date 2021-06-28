import global from "../components/GlobalVars";
import fetchWithTimeout from "./FetchHelper";

export class PaymentService{

    PaymentService(){};

    async getIban(){
        return fetchWithTimeout(global.globalIPAddress + "/api/service-payment/getIban",
            {
                method: 'GET',
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    async setIban(iban){
        let body = {
            "iban": iban
        }

        return fetchWithTimeout(global.globalIPAddress + "/api/service-payment/setIban",
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    async createPayment(iban){
        let body = {
            "iban": iban
        }

        return fetchWithTimeout(global.globalIPAddress + "/api/service-payment/createPayment",
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
