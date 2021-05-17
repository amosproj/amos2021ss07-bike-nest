import React from 'react';
import { Alert, View } from 'react-native';
import colors from "../styles/Colors";
import { useNavigation } from '@react-navigation/native';
import BikeNest_Button, { ButtonStyle } from './BikeNest_Button';
import { mainStyles } from "../styles/MainStyles";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';

export function CreateAccountVia3rdParty() {
    const navigation = useNavigation();
    const MY_SECURE_AUTH_STATE_KEY = 'MySecureAuthStateKey';

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            alert("🔐 Here's your value 🔐 \n" + result);
        } else {
            alert('No values stored under that key.');
        }
    }
    // const signInWithGoogle = () => {
    //     signInWithGoogleAsync()
    // }

    // async function signInWithGoogleAsync() {
    //     try {
    //         const result = await Google.logInAsync({
    //             behavior: 'web',
    //             //iosClientId: IOS_CLIENT_ID,
    //             //TODO:Hide client id 
    //             androidClientId: "1066777740971-p4f0ja4gl7sc8h1ingn9lo2gorc3qjts.apps.googleusercontent.com",
    //             scopes: ['profile', 'email'],
    //         });

    //         if (result.type === 'success') {
    //             return result.accessToken;
    //         } else {
    //             return { cancelled: true };
    //         }
    //     } catch (e) {
    //         return { error: true };
    //     }
    // }

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '1066777740971-sa5hjlbu6ucmequmlumjo5mresuh11n4.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: "1066777740971-p4f0ja4gl7sc8h1ingn9lo2gorc3qjts.apps.googleusercontent.com",
        webClientId: '1066777740971-sa5hjlbu6ucmequmlumjo5mresuh11n4.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        console.log("test");
        if (response?.type === 'success') {
            const { authentication } = response;
            console.log("success");

            const auth = response.params;
            const storageValue = JSON.stringify(auth);

            if (Platform.OS !== 'web') {
                // Securely store the auth on your device
                SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, storageValue);
            }
            //let value = SecureStore.getItemAsync(MY_SECURE_AUTH_STATE_KEY)
            getValueFor(MY_SECURE_AUTH_STATE_KEY);
            navigation.navigate("FindBikeNest");
        }
        else {
            console.log(response?.type);
        }
    }, [response]);

    return (
        <View style={[mainStyles.container, { backgroundColor: 'transparent' }]}>
            <BikeNest_Button
                type={ButtonStyle.big}
                text="MIT FACEBOOK ANMELDEN"
                iconPath={require("../assets/facebook_button_logo.png")}
                overrideButtonColor={colors.Facebook_Blue}
                onPress={() => Alert.alert("Nice!",
                    "Du hast erfolgreich einen Account erstellt.",
                    [
                        { text: "OK", onPress: () => navigation.navigate("FindBikeNest") }
                    ]
                )}
            />
            <BikeNest_Button
                type={ButtonStyle.big}
                text="MIT GOOGLE ANMELDEN"
                iconPath={require('../assets/google_button_logo.png')}
                overrideButtonColor={colors.UI_BaseGrey_5}
                overrideTextColor={colors.UI_BaseGrey_0}
                onPress={() => promptAsync()}
            />
        </View>
    );
}