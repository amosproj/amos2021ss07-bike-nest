import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../styles/Colors';
import { CreateAccountVia3rdParty } from '../components/CreateAccountVia3rdParty';
import { mainStyles } from '../styles/MainStyles';
import global from "../components/GlobalVars"

export default function LoginScreen({ navigation }) {
    global.authenticationTokenExists().then((exists) => {
        let initialScreen = "Login";

        if (exists === true)
            initialScreen = "FindBikeNest";

        console.log("initial screen: " + initialScreen);
        navigation.navigate(initialScreen);
    });

    return (
        <View style={mainStyles.container}>
            <Text>Loading</Text>
        </View>
    );
}

