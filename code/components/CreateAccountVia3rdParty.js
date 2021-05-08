import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { mainStyles } from "../styles/MainStyles";
import  colors  from "../styles/Colors";
import { useNavigation } from '@react-navigation/native';

export function CreateAccountVia3rdParty() {
    const navigation = useNavigation();

    return (
        <View>
            <Pressable style={[mainStyles.buttonBig, { backgroundColor: colors.Facebook_Blue }]}
             onPress={() => Alert.alert("Nice!",
            "Du hast erfolgreich einen Account erstellt.",
            [             
              { text: "OK", onPress: () => navigation.navigate("FindBikeNest") }
            ]
          )}
            >
                <Text style={mainStyles.buttonText}>MIT FACEBOOK ANMELDEN</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("EditPersonalInformation")} style={[mainStyles.buttonBig, { backgroundColor: '#fff', borderColor: colors.Google_Grey }]}>
                <Text style={[mainStyles.buttonText, { color: "#000" }]}>MIT GOOGLE ANMELDEN</Text>
            </Pressable>
        </View>
    );
}