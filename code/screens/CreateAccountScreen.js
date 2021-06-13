import React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { CreateAccountManually } from '../components/CreateAccountManually';
import { CreateAccountVia3rdParty } from '../components/CreateAccountVia3rdParty';
import { mainStyles } from "../styles/MainStyles";
import Colors from '../styles/Colors';

export function CreateAccountScreen({navigation}) {
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
        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'space-between', marginBottom: 65 }}>
          <Text style={{ color: '#A1A4B2' }} >BEREITS REGISTRIERT? <Text style={{ color: Colors.Link_Text }} onPress={() => navigation.navigate("Login")}>HIER GEHTS ZUM LOGIN</Text></Text>
        </View>
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