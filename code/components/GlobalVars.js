import * as SecureStore from 'expo-secure-store';

export default class GlobalVars {
        static #accessTokenKey = "secureToken";

        static get globalIPAddress() { return "http://192.168.2.129:9000" };

        static async saveAuthenticationToken(token) {
                await SecureStore.setItemAsync(GlobalVars.#accessTokenKey, token);
        }

        static async getAuthenticationToken() {
                let result = await SecureStore.getItemAsync(GlobalVars.#accessTokenKey);
                return result;
        }
}