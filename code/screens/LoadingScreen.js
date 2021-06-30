import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../styles/Colors';
import { CreateAccountVia3rdParty } from '../components/CreateAccountVia3rdParty';
import { mainStyles } from '../styles/MainStyles';
import global from "../components/GlobalVars";
import JwtDecoder from "../components/JwtDecoder"

export default function LoginScreen({ navigation }) {


    global.authenticationTokenExists().then((exists) => {
        let initialScreen = "Login";

        if (exists === true) {
            global.getAuthenticationToken().then((jwt) => {
                let jwtPayload = JwtDecoder.decode(jwt);
                //console.log("Exp: " + jwtPayload.exp * 1000 + " Actual: " + Date.now());
                if (jwtPayload.exp * 1000 >= Date.now()) {
                    initialScreen = "FindBikeNest";
                    console.log("Valid JWT found.");
                    console.log("initial screen: " + initialScreen);
                    navigation.navigate(initialScreen);
                }
                else{
                    console.log("JWT is not valid.");
                    console.log("initial screen: " + initialScreen);
                    navigation.navigate(initialScreen);
                }
            })
        }
        else {
            console.log("No JWT found.");
            console.log("initial screen: " + initialScreen);
            navigation.navigate(initialScreen);
        }
    });

    return (
        <View style={mainStyles.container}>
            <Text>Loading</Text>
        </View>
    );
}

