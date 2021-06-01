import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity,  Linking } from 'react-native';
import { Dimensions } from "react-native";
import bike from '../assets/bike.png'; 
import global from '../components/GlobalVars';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import colors from '../styles/Colors';
import BikeNest_Button, { ButtonStyle } from '../components/BikeNest_Button';
import {BookingService} from "../services/BookingService";


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function ReservationSuccessScreen({ route, navigation }) {
  let bookingService = new BookingService();

  let bikenest = route.params.state;
  let bikenestName = route.params.name;

  let nestAdresse = bikenestName;

  const [spotNum, setSpotNumber] = useState(0);

  let tryGETBooking = () => {
    console.log('start pulling reservation info');

    bookingService.getAllReservations().then(response => {
      if(response.success){
        // alert(JSON.stringify(response.reservations));
        // console.log(response.reservations);
        
        //TODO set spot number where reservation not expired
        setSpotNumber(response.reservations[0].bikespotId);
      }else{
        console.log(response.error);
      }
    });
}
tryGETBooking();

  return (
    <View style={mainStyles.container}>
      <View style={styles.historyContainer}>
        <View style={{alignSelf:'center'}}>
            <Text style={mainStyles.h2}>
                Reservierung <Image source={require('../assets/payment/info.png')}/>
            </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Lock") }
          style={styles.heightBike, {
            backgroundColor: '#FFF',
            height: 230,
            width: 370,
            margin: 10,
            position: 'relative'
          }}>
          <ImageBackground
            source={bike}
            style={{
              height: 230,
              width: 370,
              position: 'absolute',
            }}
          />
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 30}}>
            <Text style={{fontSize: 16, color: '#000000'}}>Vielen Dank für deine Reservierung! </Text>
            <Text style={{fontSize: 16, color: '#000000'}}>Begib dich zu folgendem BIKE NEST um dein Fahrrad abzustellen: {"\n"}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000000'}}>BIKE NEST {"\n"}{nestAdresse} {"\n"}Spot Nummer {spotNum}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.reserved}>
            <Image source={require('../assets/payment/clock.png')} style={{margin: 10}} />
            <Text style={mainStyles.stdText, {color: colors.UI_Light_2}}>
                Reserviert für 30min
            </Text>
        </View>
        <View style={{alignSelf:'center'}}>
            <Text style={mainStyles.stdText}>Bitte begib dich zu dem oben genannten BIKE NEST. Du kannst dich Navigieren lassen oder es direkt aufschließen, falls du schon hier bist.</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <BikeNest_Button overrideButtonColor={colors.UI_Light_4} 
                             overrideTextColor={colors.UI_BaseGrey_0} 
                             type={ButtonStyle.big} 
                             text="Navigation"  
                             onPress={() => { Linking.openURL('https://www.google.com/maps/dir//' + bikenest.coordinate.latitude + ',' + bikenest.coordinate.longitude) }}/>
            <BikeNest_Button overrideButtonColor={colors.UI_Light_4} 
                             overrideTextColor={colors.UI_BaseGrey_0} 
                             type={ButtonStyle.big} 
                             text="Ich bin schon hier" 
                             onPress={() => navigation.navigate("Lock")} />
        </View>
      </View>
      <BikeNest_NavigationFooter></BikeNest_NavigationFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyContainer: {
    flex: 1,
    padding: 15,
    marginTop: 30,
    justifyContent: 'space-evenly',
    position: 'relative',
  },
  reserved: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    },
});