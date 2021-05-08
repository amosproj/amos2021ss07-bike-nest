import React from 'react';
import { Text, View } from 'react-native';
import { CreateAccountManually } from '../components/CreateAccountManually';
import { CreateAccountVia3rdParty } from '../components/CreateAccountVia3rdParty';
import { mainStyles } from "../styles/MainStyles";

export function CreateAccountScreen({ navigation }) {
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.h1}>Profil erstellen</Text>
      <CreateAccountVia3rdParty />
      <Text>ODER MIT EMAIL ANMELDEN</Text>
      <CreateAccountManually />
    </View>
  );
}