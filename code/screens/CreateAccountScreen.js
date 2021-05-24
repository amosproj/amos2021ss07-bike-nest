import React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { CreateAccountManually } from '../components/CreateAccountManually';
import { CreateAccountVia3rdParty } from '../components/CreateAccountVia3rdParty';
import { mainStyles } from "../styles/MainStyles";


export function CreateAccountScreen() {
  return (

    <View style={mainStyles.container}>
      <ScrollView style={[styles.scrollview]} >

        <View style={[mainStyles.container, { marginTop: 40, backgroundColor: 'transparent' }]}>
          <Text style={mainStyles.h1}>Profil erstellen</Text>
        </View>

        <CreateAccountVia3rdParty />

        <View style={[mainStyles.container, { margin: 10, backgroundColor: 'transparent' }]}>
          <Text style={mainStyles.stdText}>ODER MIT EMAIL ANMELDEN</Text>
        </View>

        <CreateAccountManually />

      </ScrollView>
      <ImageBackground 
      style={[mainStyles.fixed, styles.containter, {zIndex: -1}]}
      source={require('../assets/background/background.png')}/>
    </View>

  );
}

const styles = StyleSheet.create({
  containter: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height + 50 // why + 60? 
  },
});