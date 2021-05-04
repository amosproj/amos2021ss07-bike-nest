import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native'
import { Dimensions } from "react-native";
import Colors from '../Colors';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background/background.png')} style={[styles.backgroundImage, { alignItems: 'center' }]}>
        <View style={{ flex: 0.2, alignContent: 'center', justifyContent: 'center', marginTop: 130, width: width }}>
          <Text style={styles.h1}>Willkommen zurück!</Text>
        </View>

        <View style={{ flex: 0.6, justifyContent: 'center' }}>
          <Pressable style={[styles.button, { backgroundColor: Colors.Facebook_Blue }]}>
            <View style={styles.buttonContent}>
              <Image style={styles.buttonImage} source={require('../assets/facebook_button_logo.png')} />
              <Text style={styles.buttonText}>MIT FACEBOOK ANMELDEN</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: '#ffffff', borderColor: Colors.Google_Grey, borderWidth: 1 }]}>
            <View style={styles.buttonContent}>
              <Image style={styles.buttonImage} source={require('../assets/google_button_logo.png')} />
              <Text style={[styles.buttonText, { color: '#3F414E' }]}>MIT GOOGLE ANMELDEN</Text>
            </View>
          </Pressable>
        </View>


        <View>
          <Text style={{ color: '#A1A4B2', alignItems: 'center', justifyContent: 'center' }} >ODER MIT EMAIL ANMELDEN</Text>
        </View>

        <View style={{ flex: 0.6, justifyContent: 'center' }}>
          <TextInput style={styles.inputField}
            placeholder='E-Mail Adresse'
          />
          <TextInput style={styles.inputField}
            placeholder='Passwort'
            secureTextEntry={true}
          />
        </View>

        <View style={{ flex: 0.2, justifyContent: 'center' }}>
          <Pressable style={styles.button}>
            <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>Log In</Text>
          </Pressable>

        </View>

        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'space-between', marginBottom: 65 }}>
          <Text style={{ color: '#A1A4B2', marginTop: 17 }} >BEREITS REGISTRIERT? <Text style={{ color: Colors.Link_Text }}>ANMELDEN</Text></Text>
          <Text style={{ color: '#A1A4B2' }} >IMMER NOCH KEIN PROFIL? <Text style={{ color: Colors.Link_Text }} onPress={() => navigation.navigate("CreateAccount")}>REGISTRIEREN</Text></Text>
        </View>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  backgroundImage: {
  },
  h1: {
    position: 'absolute',
    left: 50,
    fontSize: 28,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  inputField: {
    width: 328,
    height: 55,
    color: '#BDBDBD',
    backgroundColor: Colors.UI_Light_4,
    borderRadius: 15,
    margin: 9,
    paddingLeft: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 3,
    width: 328,
    height: 55,
    borderRadius: 38,
    margin: 9,
    backgroundColor: Colors.UI_Light_2
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 14,
    color: Colors.UI_Light_4,
  },
  buttonImage: {
    alignSelf: 'center'
  }

});
