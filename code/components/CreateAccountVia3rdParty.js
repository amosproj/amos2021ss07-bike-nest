import React from 'react';
import { Alert, View } from 'react-native';
import colors from "../styles/Colors";
import { useNavigation } from '@react-navigation/native';
import BikeNest_Button, { ButtonStyle } from './BikeNest_Button';

export function CreateAccountVia3rdParty() {
    const navigation = useNavigation();

    return (
        <View>
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
                onPress={() => Alert.alert("Nice!",
                    "Du hast erfolgreich einen Account erstellt.",
                    [
                        { text: "OK", onPress: () => navigation.navigate("FindBikeNest") }
                    ]
                )}
            />
        </View>
    );
}