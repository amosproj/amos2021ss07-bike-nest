import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { styles } from "./EditPersonalInformation/styles";
import Colors from "../styles/Colors";
import { useNavigation } from '@react-navigation/native';

export function CreateAccountVia3rdParty() {
    const navigation = useNavigation();

    return (
        <View>
            <Pressable style={[styles.button, { backgroundColor: Colors.Facebook_Blue }]}
             onPress={() => Alert.alert("Nice!",
            "Du hast erfolgreich einen Account erstellt.",
            [             
              { text: "OK", onPress: () => navigation.navigate("FindBikeNest") }
            ]
          )}
            >
                <Text style={styles.buttonText}>MIT FACEBOOK ANMELDEN</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("EditPersonalInformation")} style={[styles.button, { backgroundColor: '#fff', borderColor: Colors.Google_Grey }]}>
                <Text style={[styles.buttonText, { color: "#000" }]}>MIT GOOGLE ANMELDEN</Text>
            </Pressable>
        </View>
    );
}