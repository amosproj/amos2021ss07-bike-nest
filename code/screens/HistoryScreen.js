import React, { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Dimensions } from "react-native";
import Avatar from '../assets/Avatar.png';
import bike from '../assets/bike.png';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import global from '../components/GlobalVars';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { BookingService } from "../services/BookingService";
import { BikenestService } from '../services/BikenestService';
import {ReservationService} from "../services/ReservationService";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function HistoryScreen({ navigation }) {
  let bookingService = new BookingService();
  let reservationService = new ReservationService();
  let bikenestService = new BikenestService();

  const [bikenestIDs, setBikenestIDs] = useState();

  let tryGETBooking = () => {
    console.log('start pulling reservation info');

    reservationService.getAllReservations().then(reservations => {
      alert(JSON.stringify(reservations));
      // This wont work, because reservations is an array of bikenests
      //setBikenestIDs(reservations.bikenestId);
    }).catch(error => {
      console.error("Error with pulling reservations: " + JSON.stringify(error));
    });
  }
  let forwardToGoogle = () => {
    console.log('start pulling bikenest info');
    let latitude = 49.46;
    let longitude = 11.07;

    bikenestService.getAllBikenests().then(bikenests => {
      console.log(bikenests);
      //TODO get right bikenest for the navigation!
      // for (let y of response.bikenests){
      //   for (let x of bikenestIDs){
      //     if (y.id == x){
      //       latitude = y.gpsCoordinates[0];
      //       longitude = y.gpsCoordinates[1];
      //     }
      //   }
      // }
    }).catch(error => {
      console.error("Error retrieving all bikenests: " + JSON.stringify(error));
    });
    Linking.openURL('https://www.google.com/maps/dir//' + latitude + ',' + longitude);
  }

  return (
    <View style={mainStyles.container}>
      <View style={styles.historyContainer}>
        <View style={styles.containerRow}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image source={Avatar} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.name}>
                        Max Muster </Text>
        </View>
        <TouchableOpacity onPress={() => forwardToGoogle(this)}
          style={[styles.heightBike, {
            backgroundColor: '#FFF',
            height: 230,
            width: 370,
            margin: 10,
            position: 'relative'
          }]}>
          <ImageBackground
            source={bike}
            style={{
              height: 230,
              width: 370,
              position: 'absolute',
            }}
          />
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 30 }}>
            <Text style={{ fontSize: 16 }}>Danke für dein Vertrauen! </Text>
            <Text style={{ fontSize: 16 }}>Dein Fahrrad befindet sich hier: {"\n"}</Text>
            <Text style={{ textDecorationLine: 'underline', fontSize: 16, fontStyle: 'italic' }}> Zeig es auf
                            der Karte </Text>
          </View>
        </TouchableOpacity>


        <View style={styles.containerRow}>
          <TouchableOpacity style={styles.time}>
            <Text style={styles.timeText}> Zeit verging </Text>
            <SimpleLineIcons name="clock" size={24} color="black" />
            <Text style={styles.timeRecord}> 1 Tag </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cost}>
            <Text style={styles.costText}> Parkkosten </Text>
            <AntDesign name="creditcard" size={24} color="black" />
            <Text style={styles.costRecord}> 50 $ </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerRow}>
          <TouchableOpacity onPress={() => navigation.navigate("Lock")} style={mainStyles.buttonMedium}>
            {/* <SimpleLineIcons name="lock-open" size={10} color="black" style={styles.icon} /> */}
            <Text style={mainStyles.buttonText}> Max Muster's bike </Text>
            <Text style={mainStyles.buttonText}> locked on spot X </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("QrReaderScreen")} style={mainStyles.buttonSmall}>
            <Text style={mainStyles.buttonText}>QR Scanner</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => tryGETBooking(this)} style={styles.buttonHistory}>
          <Text style={styles.buttonHistoryText}> Frühere Reservierungen und Zahlungen </Text>
        </TouchableOpacity>
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
    marginTop: 10,
    margin: 10,
    justifyContent: 'space-around',
    position: 'relative',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  avatar: {
    flex: 1,
    maxWidth: 60,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    flex: 1,
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  welcome: {
    flex: 1,
    color: '#000000',
    fontSize: 15,
    fontWeight: 'normal',
  },

  cardTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  place: {
    flex: 1,
    margin: 10,
  },
  cardBikeContainer2: {
    flex: 1,
    marginTop: Dimensions.get('window').height * 0.02,
    marginLeft: Dimensions.get('window').width * 0.01,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    alignContent: 'space-around',
  },
  time: {
    flex: 1,
    borderColor: '#E6E5F2',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    maxWidth: 160,
  },
  timeText: {
    flex: 1,
    fontSize: 16,
    color: '#55418E',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  timeRecord: {
    flex: 1,
    fontSize: 16,
    color: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'normal',
  },

  cost: {
    flex: 1,
    borderColor: '#E6E5F2',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    maxWidth: 160,
  },
  costText: {
    flex: 1,
    fontSize: 16,
    color: '#55418E',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  costRecord: {
    flex: 1,
    fontSize: 16,
    color: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'normal',
  },
  buttonHistory: {
    flex: 1,
    borderRadius: 30,
    borderColor: '#E6E5F2',
    borderWidth: 1,
    maxHeight: 50,
    margin: 10,
  },
  buttonHistoryText: {
    flex: 1,
    fontSize: 15,
    color: '#55418E',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  icon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
  },

})
