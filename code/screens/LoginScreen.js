import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Dimensions } from "react-native";
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

      <ImageBackground source={require('../assets/background/background.png')} style={[mainStyles.backgroundImage, { alignItems: 'center' }]}>
        <View style={{ flex: 0.2, alignContent: 'center', justifyContent: 'center', marginTop: 130, width: width }}>
          <Text style={mainStyles.h1}>Willkommen zurück!</Text>
        </View>

        <CreateAccountVia3rdParty />

        <View>
          <Text style={{ color: '#A1A4B2', alignItems: 'center', justifyContent: 'center' }} >ODER MIT EMAIL ANMELDEN</Text>
        </View>

        <View style={{ flex: 0.6, justifyContent: 'center' }}>
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
          onPress={() => navigation.navigate("History")}
        />

        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'space-between', marginBottom: 65 }}>
          <Text style={{ color: '#A1A4B2', marginTop: 17 }} >BEREITS REGISTRIERT? <Text style={{ color: Colors.Link_Text }}>ANMELDEN</Text></Text>
          <Text style={{ color: '#A1A4B2' }} >IMMER NOCH KEIN PROFIL? <Text style={{ color: Colors.Link_Text }} onPress={() => navigation.navigate("CreateAccount")}>REGISTRIEREN</Text></Text>
        </View>

        <StatusBar style="auto" />
      </ImageBackground>

    </View>

  );
}
