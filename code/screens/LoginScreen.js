import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../styles/Colors';
import { CreateAccountVia3rdParty } from '../components/CreateAccountVia3rdParty';
import { mainStyles } from '../styles/MainStyles';
import BikeNest_Button, { ButtonStyle } from '../components/BikeNest_Button';
import BikeNest_TextInput from '../components/BikeNest_TextInput';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default function LoginScreen({ navigation }) {
  return (

    <View style={mainStyles.container}>

      <ScrollView>
        <View style={[mainStyles.container, { marginTop: 40, backgroundColor: 'transparent' }]}>
          <Text style={mainStyles.h1}>Willkommen!</Text>
        </View>

        <CreateAccountVia3rdParty />

        <View style={[mainStyles.container, { margin: 10, backgroundColor: 'transparent' }]}>
          <Text style={mainStyles.stdText}>ODER MIT EMAIL ANMELDEN</Text>
        </View>

        <View style={[mainStyles.container,{backgroundColor: 'transparent'}]}>
          <BikeNest_TextInput
            placeholder='E-Mail Adresse'
          />
          <BikeNest_TextInput
            placeholder='Passwort'
            secureTextEntry={true}
          />
        </View>

        <BikeNest_Button
          type={ButtonStyle.big}
          text="Los geht's!"
          onPress={() => navigation.navigate("FindBikeNest")}
        />

        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'space-between', marginBottom: 65 }}>
          <Text style={{ color: '#A1A4B2', marginTop: 17 }} >BEREITS REGISTRIERT? <Text style={{ color: Colors.Link_Text }}>ANMELDEN</Text></Text>
          <Text style={{ color: '#A1A4B2' }} >IMMER NOCH KEIN PROFIL? <Text style={{ color: Colors.Link_Text }} onPress={() => navigation.navigate("CreateAccount")}>REGISTRIEREN</Text></Text>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
      <ImageBackground
        style={[mainStyles.fixed, styles.containter, { zIndex: -1 }]}
        source={require('../assets/background/background.png')} />
    </View>

  );
}

const styles = StyleSheet.create({
  containter: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height + 50 // why + 60? 
  },
});
