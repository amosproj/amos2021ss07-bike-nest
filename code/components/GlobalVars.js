import * as SecureStore from 'expo-secure-store';

export default class GlobalVars {
        static #accessTokenKey = "secureToken";

        static get globalIPAddress() { return "http://192.168.2.124:9000" };

        static async saveAuthenticationToken(token) {
                await SecureStore.setItemAsync(GlobalVars.#accessTokenKey, token);
        }

        static async getAuthenticationToken() {
                let result = await SecureStore.getItemAsync(GlobalVars.#accessTokenKey);
                return result;
        }

        static async deleteAuthenticationToken() {
                await SecureStore.deleteItemAsync(GlobalVars.#accessTokenKey);
        }

        static async authenticationTokenExists() {
                let result = await this.getAuthenticationToken(GlobalVars.#accessTokenKey);

                if (result !== null) {
                        return true;
                }

                return false;
        }
}