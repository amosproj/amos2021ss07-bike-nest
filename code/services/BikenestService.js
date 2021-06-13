import global from "../components/GlobalVars";
import fetchWithTimeout from "./FetchHelper";

export class BikenestService{

    BikenestService(){};

    /**
     * Returns a Promise that contains an array of Bikenests.
     * Example usage:
     * bikenestService.getAllBikenests().then(response => {
     *          for(x of response.bikenests){
     *              console.log("Bikenest: " + JSON.stringify(x));
     *          }
     *      });
     * @returns {Promise<any[]>}
     */
    async getAllBikenests(){
        return fetchWithTimeout(global.globalIPAddress + "/api/service-bikenest/bikenest/all",
            {
                method: 'GET',
                headers:
                    {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    }
            }, 10000);
    }

    /**
     * Returns a promise that contains a single bikenest.
     * @param bikenestID
     * @returns {Promise<*>}
     */
    async getBikenestInfo(bikenestID){
        let body = {
            "bikenestID": bikenestID
        }

        return fetchWithTimeout(global.globalIPAddress + "/api/service-bikenest/bikenest/bikenestinfo",
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
