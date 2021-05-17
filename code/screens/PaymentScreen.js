import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Keyboard } from 'react-native'
import { Dimensions } from "react-native";
import Colors from '../styles/Colors';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { mainStyles } from "../styles/MainStyles";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function PaymentScreen({ navigation }) {
  var [ isPress, setIsPress ] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? myStyles.btnPress : myStyles.button, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
  };

  const onPressPaypal = () => {
    //reconnect to paypal
    //change style to border orange
    //change style of pressable Visa to no border
    
    borderWidth: 1
    borderColor: Colors.UI_Light_2
  };

  const onPressAdd = () => {
    //Zu Zahlungsmethodenauswahl?
  };
  const onPressInfo = () => {
    //zurück zu Find Bike Nest
    alert('this is an info.');
  };
  const onPressOrder = () => {
    //Daten an Backend senden
    //paymentContainer zu display none
    //paymentClosed Container zu display: flex
    //nach timer reconnect to findBikenest? 
  }
  const getSlots = () => {
    return "1 Slot";
  };
  const getLocation = () => {
    return "Nürnberg HBF";
  };
  const getHours = () => {
    return "3 Stunden";
  };
  const getPrice = () => {
    return "50€";
  };
  const getMwst = () => {
    return "9,50€";
  };
  const getDiscount = () => {
    return "-5€";
  };
  const getSum = () => {
    return "54,50€";
  };
  return (
    <View style={myStyles.container}>
      <View style={myStyles.paymentContainer}>
        <View style={{alignSelf:'center'}}>
            <Text style={myStyles.h2}>
                Meine Bestellung <Image onPress={() => onPressInfo(this)} source={require('../assets/payment/info.png')}/>
            </Text>
        </View>
        <View style={myStyles.headline}>
            <Text style={myStyles.h3}> Details </Text>
            <Text style={[myStyles.h3, {fontWeight: 'bold'}]} onPress={()=>navigation.navigate("FindBikeNest")}> Ändern </Text>
        </View>
        <View style={myStyles.headline}>
            <Text style={myStyles.stdText}>
                {"\n"} 
                {getSlots()} im BIKE NEST {"\n"}
                {getLocation()}
            </Text>
            <Text style={myStyles.stdText}> {getHours()} </Text>
        </View>
        <View style={myStyles.reserved}>
            <Image source={require('../assets/payment/clock.png')} style={{margin: 10}} />
            <Text style={myStyles.stdText, {color: Colors.UI_Light_2}}>
                Reserviert für 30min
            </Text>
        </View>
        <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider}/>
        <View style={myStyles.headline}>
            <Text style={myStyles.h3}> Zahlungsmethode </Text>
            <Text style={[myStyles.h3, {fontWeight: 'bold'}]} onPress={() => onPressAdd(this)}> <Image source={require('../assets/payment/plus.png')}/> Hinzufügen </Text>
        </View>
        <View style={myStyles.zahlungsmethode}>
            <Pressable {...touchProps} >
              <View style={myStyles.buttonContent}>
                  <Image style={[myStyles.buttonImage, { maxWidth: 150, resizeMode: 'contain' }]} source={require('../assets/payment/Paypal1.png')} />
              </View>
            </Pressable>
            <Pressable style={({ pressed }) => [{
              borderColor: pressed
                ? Colors.UI_Light_2
                : '#ffffff'},
            myStyles.button, {backgroundColor: '#ffffff'}]}>
            <View style={myStyles.buttonContent}>
                <Image style={myStyles.buttonImage} source={require('../assets/payment/Visa.png')} />
            </View>
            </Pressable>
        </View>
        <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider}/>
        <View style={myStyles.headline}>
            <Text style={myStyles.h3}> Promocode </Text>
            <TextInput style={[myStyles.halfButton, { fontWeight: 'bold', color: Colors.UI_Light_2}]}
                placeholder='BIKE NEST'/>
        </View>
        <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider}/>
        <View style={myStyles.headline}>
            <Text style={myStyles.stdText}>Gesamt exkl. Mwst.</Text>
            <Text style={[myStyles.stdText, { fontWeight: 'bold', color: Colors.UI_Light_2}]}> {getPrice()} </Text>
        </View>
        <View style={myStyles.headline}>
            <Text style={myStyles.stdText}>Mwst. 19%</Text>
            <Text style={[myStyles.stdText, { fontWeight: 'bold', color: Colors.UI_Light_2}]}> {getMwst()} </Text>
        </View>
        <View style={myStyles.headline}>
            <Text style={myStyles.stdText}>Rabatt</Text>
            <Text style={[myStyles.stdText, { fontWeight: 'bold', color: Colors.UI_Light_2}]}> {getDiscount()} </Text>
        </View>
        <Image style={{margin: 10}}source={require('../assets/payment/Line.png')}/>
        <View style={myStyles.headline}>
            <Text style={myStyles.h3}>Gesamt (für {getHours()})</Text>
            <Text style={[myStyles.h3, { fontWeight: 'bold', color: Colors.UI_Light_2}]}> {getSum()} </Text>
        </View>
        <Pressable style={[myStyles.reserved, {justifyContent: 'flex-end'}]} onPress={() => onPressOrder(this)}>
            <Text style={myStyles.h3}>Jetzt Reservieren</Text> 
            <Image style={{margin: 10}} source={require('../assets/payment/mail-send.png')} />
        </Pressable>
      </View>
      <View style={myStyles.paymentClosedContainer}>
        <View style={{alignSelf:'center'}}>
            <Text style={myStyles.h2}>
                Meine Bestellung <Image onPress={() => onPressInfo(this)} source={require('../assets/payment/info.png')}/>
            </Text>
        </View>
            <Text style={myStyles.h3}> Vielen Dank für Ihre Bestellung. </Text>
            <Text style={myStyles.h3}> Bitte begeben Sie sich zu folgendem BIKE NEST: </Text>
            <Text style={myStyles.h3}> {getLocation()} </Text>
      </View>
      <BikeNest_NavigationFooter/>
    </View>
  )
}

const myStyles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff',
  },
  paymentContainer: {
    flex: 1,
    padding: 15,
    marginTop: 30,
  },
  paymentClosedContainer:{
    flex: 1,
    padding: 15,
    marginTop: 30,
    display: 'none',
  },
  h2: {
      fontSize: 27,
      letterSpacing: 2,
      fontWeight: "400",
  },
  h3:{
      fontSize: 18,
      fontWeight: "300",
  },
  stdText:{
      fontSize: 14,
  },
  divider: {
      marginLeft: -15,
      marginTop: 10,
      marginBottom: 10,
      width: 500,
  },
  headline: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
  },
  reserved: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center', 
  },
  zahlungsmethode: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center', 
  },
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      width: 328,
      height: 55,
      borderRadius: 38,
      margin: 9,
      backgroundColor: Colors.UI_Light_4
  },
  btnPress: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    width: 328,
    height: 55,
    borderRadius: 38,
    margin: 9,
    backgroundColor: Colors.UI_Light_4,
    borderColor: Colors.UI_Light_3,
  },
  buttonContent: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%'
    },
  buttonImage: {
      alignSelf: 'center'
    },
  halfButton: {
      width: 150,
      height: 55,
      color: Colors.UI_Light_3,
      backgroundColor: Colors.UI_Light_4,
      borderRadius: 38,
      margin: 10,
      padding: 15,
    }
})