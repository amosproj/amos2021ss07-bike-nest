import global from "../components/GlobalVars";

export class BikenestService{

    BikenestService(){};

    /**
     * Example usage:
     * bikenestService.getAllBikenests().then(response => {
     *      if(response.success){
     *          for(x of response.bikenests){
     *              console.log("Bikenest: " + JSON.stringify(x));
     *          }
     *      }
     *      });
     * @returns {Promise<{success: boolean, bikenests: any[]} | {success: boolean, error: string}>}
     */
    async getAllBikenests(){
        return fetch(global.globalIPAddress + "/bikenest/all", {
            method: 'GET',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'}
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("getAllBikenests Response:" + JSON.stringify(json));
                return {"success": true, "bikenests": json};
            })
            .catch((error) => {
                console.error("getAllBikenests Error:" + error);
                return {"success": false, "error": error};
            });
    }

    async getBikenestInfo(bikenestID){
        let request = {
            "bikenestID": bikenestID
        }

        return fetch(global.globalIPAddress + "/bikenest/bikenestInfo", {
            method: 'POST',
            body: JSON.stringify(request),
            headers: { Accept: 'application/json', 'Content-Type': 'application/json'}
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("getBikenestInfo Response:" + JSON.stringify(json));
                return json;
            })
            .catch((error) => {
                console.error("getBikenestInfo Error:" + error);
                return {"bikenestName": "NaN", "address": "NaN", "spotsLeft":"0", "chargingOptionAvailable":"false"};
            });
    }
}