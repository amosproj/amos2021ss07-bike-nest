import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../Colors';
import { CreateAccountManually } from '../components/CreateAccountManually';
import { CreateAccountVia3rdParty } from '../components/CreateAccountVia3rdParty';

export function CreateAccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Profil erstellen</Text>
      <CreateAccountVia3rdParty />
      <Text>ODER MIT EMAIL ANMELDEN</Text>
      <CreateAccountManually />
    </View>
  );

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: 328,
    height: 55,
    borderRadius: 38,
    margin: 9,
    backgroundColor: Colors.UI_Light_2
  },
  inputField: {
    width: 328,
    height: 55,
    color: '#333333',
    backgroundColor: Colors.UI_Light_4,
    borderRadius: 15,
    margin: 9,
    paddingLeft: 12,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.UI_Light_4
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 30
  },
  checkbox: {
    borderRadius: 2,
    alignSelf: "center",
  },
  checkboxText: {
    margin: 8,
  }


});


