import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { CreateAccountManually } from '../components/CreateAccountManually';
import { CreateAccountVia3rdParty } from '../components/CreateAccountVia3rdParty';
import { mainStyles } from "../styles/MainStyles";


export function CreateAccountScreen() {
  return (
    <View style={mainStyles.container}>
      <ScrollView >

        <View style={[mainStyles.container, { marginTop: 40 }]}>
          <Text style={mainStyles.h1}>Profil erstellen</Text>
        </View>

        <CreateAccountVia3rdParty />

        <View style={mainStyles.container}>
          <Text style={mainStyles.stdText}>ODER MIT EMAIL ANMELDEN</Text>
        </View>

        <CreateAccountManually />
      </ScrollView>  
    </View>
  );
}