import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Pressable, CheckBox, StyleSheet, Text, View, TextInput } from 'react-native';
import Colors from '../Colors';


export default class CreateAccountScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Profil erstellen</Text>
        <Pressable style={[styles.button, { backgroundColor: Colors.Facebook_Blue }]}>
          <Text style={styles.buttonText}>MIT FACEBOOK ANMELDEN</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: '#fff', borderColor: Colors.Google_Grey }]}>
          <Text style={[styles.buttonText, { color: "#000" }]}>MIT GOOGLE ANMELDEN</Text>
        </Pressable>
        <Text>ODER MIT EMAIL ANMELDEN</Text>
        <TextInput
          defaultValue='Name'
          style={styles.inputField}
        />
        <TextInput
          defaultValue='Email'
          style={styles.inputField}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.inputField}
        />
        <View style={styles.checkBoxContainer}>
          <Text style={styles.checkboxText} onPress={() => Alert.alert("Lorem ipsum")}>Datenschutzrichtlinien gelesen</Text>
          <CheckBox style={styles.checkbox} />
        </View>
        <Pressable style={styles.button} onPress={() => Alert.alert("Test")}>
          <Text style={styles.buttonText}>Los geht's</Text>
        </Pressable>
      </View>
    );
  };
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


