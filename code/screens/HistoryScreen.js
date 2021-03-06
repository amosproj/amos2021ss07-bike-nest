import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Dimensions } from "react-native";
import Avatar from '../assets/Avatar.png';
import bike from '../assets/bike3.png';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import global from '../components/GlobalVars';
import JwtDecoder from '../components/JwtDecoder';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { BookingService } from "../services/BookingService";
import { BikenestService } from '../services/BikenestService';
import { ReservationService } from "../services/ReservationService";
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';
import colors from '../styles/Colors';
import { Alert } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function HistoryScreen({ navigation }) {
  let bookingService = new BookingService();
  let reservationService = new ReservationService();
  let bikenestService = new BikenestService();

  //const [bikenestIDs, setBikenestIDs] = useState();
  const [loadingBikeInfo, setLoadingBikeInfo] = useState(true);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [infoHeadline, setInfoHeadline] = useState("Du hast weder eine Reservierung noch eines deiner Fahrräder bei uns sicher verstaut.");
  const [infoText, setInfoText] = useState("");
  const [bikenestInfo, setBikenestInfo] = useState(
    { "id": "1", "charging_available": "true", "current_spots": "2", "gpsCoordinates": "50,50", "maximum_spots": "10", "name": "Biknest 1", "qr_code": "i6UBe6AziP7Q" });
  const [userName, setUserName] = useState("Max Muster");
  const [bikeSpot, setBikeSpot] = useState(-1);
  const [validBooking, setValidBooking] = useState(false);
  const [bookingTime, setBookingTime] = useState();

  const compareDates = (dateString) => {
    let today = moment().format();
    // today = today.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
    let endDateOfBooking = moment(dateString).format();

    // console.log("Today: " + today);
    // console.log("End: " +endDateOfBooking);

    if (today < endDateOfBooking) {
      return true;
    }
    return false;
  };

  useFocusEffect(
    React.useCallback(() => {

      global.getAuthenticationToken().then((jwt) => {
        let payload = JwtDecoder.decode(jwt);
        console.log(jwt);
        setUserName(payload.FirstName + " " + payload.LastName);
        setLoadingUserInfo(false);
      })


      Promise.all([reservationService.getAllReservations(), bookingService.getAllBookings()])
        .then((values) => {
          const reservations = values[0]
          const bookings = values[1];
          console.log('RESERVATIONS:' + JSON.stringify(reservations));
          console.log('BOOKINGS:' + JSON.stringify(bookings));

          //Check bookings first
          let bikenestId = -1;
          for (let ind in bookings) {
            let booking = bookings[ind];
            if (booking.deliveredBike !== null && booking.tookBike === null) {
              //Unlock the Bikenest to take the bike
              console.log("Found a valid booking!");
              bikenestId = booking.bikenestId;
              setBikeSpot(booking.bikespotNumber);
              setBookingTime(booking.deliveredBike);
              setValidBooking(true);
              return bikenestService.getBikenestInfo(bikenestId).then((info) => {
                setInfoHeadline("Buchungen");
                setBikenestInfo(info);
                setInfoText("Dein Fahrrad befindet sich hier:\n" + info.name);
              }).catch(error => {
                if (error.display) {
                  setInfoText(error.message);
                } else {
                  setInfoText("Oops da ist etwas schief gelaufen. Bitte versuche es noch einmal.");
                }
              });
            }
          }

          //Check reservations if no booking was found
          for (let ind in reservations) {
            let res = reservations[ind];
            // console.log(JSON.stringify(res) + "\n reservationStart: " + !compareDates(res.reservationStart) + "\n reservationEnd: "
            //   + compareDates(res.reservationEnd) + "\n res not Used: " + !res.used + "\n res not cancelles: " + !res.cancelled);
            if (!compareDates(res.reservationStart) && compareDates(res.reservationEnd) && !res.used
              && !res.cancelled) {
              //Unlock the Bikenest to deliver the bike
              console.log("Found a valid Reservation!");
              bikenestId = res.bikenestId;
              return bikenestService.getBikenestInfo(bikenestId).then((info) => {
                setBikenestInfo(info);
                setInfoHeadline("Reservierungen");
                setInfoText("Dein Bikenest findest du hier:\n" + info.name);
              }).catch(error => {
                if (error.display) {
                  setInfoHeadline("Fehler");
                  setInfoText(error.message);
                } else {
                  setInfoText("Oops da ist etwas schief gelaufen. Bitte versuche es noch einmal.");
                }
              });
            }
          }

          //No suitable reservation or booking found -> error
          throw { display: true, message: "Du hast weder eine valide Reservierung, noch hast du ein Fahrrad in einem Bikenest abgestellt." }
        }).catch(error => {
          if (error.display) {
            setInfoHeadline("Ups");
            setInfoText(error.message);
          } else {
            setInfoText("Oops da ist etwas schief gelaufen. Bitte versuche es noch einmal.");
          }
        })

      const unsubscribe = () => console.log("On Focus lost");

      return () => unsubscribe();
    }, [])
  );

  let tryGETBooking = () => {
    console.log('start pulling reservation info');
    reservationService.getAllReservations().then(reservations => {
      // var text = "";
      // reservations.forEach(element => {
      //   var bikenest = reservations[element].bikenestId;
      //   var spotnum = reservations[element].bikespotNumber;
      //   var resStart = reservations[element].reservationStart;
      //   var resEnd = reservations[element].reservationEnd;
      //   text += "bikenest: " + bikenest + "\n" + "Spot: " + spotnum + "\n" + "Reservation Started: " + resStart + "\n" + "Reservation Ended: " + resEnd;
      // });
      var reservate = "" + JSON.stringify(reservations);
      Alert.alert("Alle Reservierungen", reservate);
    }).catch(error => {
      console.error("Error with pulling reservations: " + JSON.stringify(error));
    });
  }

  let forwardToGoogle = () => {
    console.log("info: " + bikenestInfo.gpsCoordinates);
    let coordinates = bikenestInfo.gpsCoordinates.split(",");
    let latitude = coordinates[0];
    let longitude = coordinates[1];
    Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + latitude + ',' + longitude + '&travelmode=bicycling');
  }

  let showBikeSpotBtn = () =>
    validBooking === true ?
      <TouchableOpacity onPress={() => navigation.navigate("Unlock")} style={styles.buttonHistoryOrange}>
        <Text style={styles.buttonTextOrange}> {userName}'s bike an Spot {bikeSpot}</Text>
      </TouchableOpacity>
      : null;
    let getTimeHours = () => {
      var bookingT = bookingTime.split('T');
      var startTime = bookingT[0] + ' ' + bookingT[1];
      var now = new moment()
      var duration = moment.duration(now.diff(startTime)).get('hours');
      return duration;
    }
    let getTimeMinutes = () => {
      var bookingT = bookingTime.split('T');
      var startTime = bookingT[0] + ' ' + bookingT[1];
      var now = new moment()
      var duration = moment.duration(now.diff(startTime)).get('minutes');
      return duration;
    }


    let getBookingTime = () => {
      var hours = getTimeHours();
      var minutes = getTimeMinutes();
      var duration = hours + " hour(s) \n" + minutes + " minute(s)";
      return duration;
    }

    let getEstimatedCost = () => {
      var duration = getTimeHours(this);
      var price = 0;
      if(duration <= 24){
        price = 1;
      } else if (duration > 24){
        price = 2;
      } else if (duration > 48){
        price = 3;
      } else if (duration > 72){
        price = 12;
      }
      return price;
    }

  return (
    <View style={mainStyles.container}>
      <View style={styles.historyContainer}>
        <View style={styles.containerRowName}>
          <TouchableOpacity onPress={() => navigation.navigate("EditPersonalInformation")}>
            <Image source={Avatar} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.name}>
            {userName}</Text>
        </View>
        <TouchableOpacity onPress={() => validBooking === true ? forwardToGoogle(this) : navigation.navigate("FindBikeNest")}
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
            <Text style={mainStyles.h3}>{infoHeadline + "\n"}</Text>
            <Text style={{ fontSize: 16 }}>{infoText + "\n"}</Text>
            <Text style={{ textDecorationLine: 'underline', fontSize: 16, fontStyle: 'italic' }}>{validBooking === true ? "Zeig es auf der Karte" : "Jetzt Buchen"}</Text>
          </View>
        </TouchableOpacity>
        {validBooking === true ?
          <View style={styles.containerRow}>
            <TouchableOpacity style={styles.time}>
              <Text style={styles.timeText}> Zeit </Text>
              <SimpleLineIcons name="clock" size={24} color="black" />
              <Text style={styles.timeRecord}> {validBooking === true ? getBookingTime(this) : ""}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cost}>
              <Text style={styles.costText}> Parkkosten </Text>
              <AntDesign name="creditcard" size={24} color="black" />
              <Text style={styles.costRecord}> {validBooking === true ? getEstimatedCost(this) + " €" : ""} </Text>
            </TouchableOpacity>
          </View>
        : null}

        {showBikeSpotBtn()}

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
    justifyContent: 'space-around',
    margin: 10,
  },
  containerRowName: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
  },
  avatar: {
    flex: -1,
    maxWidth: 60,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'flex-start'
  },
  name: {
    flex: -1,
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    alignItems: 'flex-start'
  },
  cardTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHistoryText: {
    flex: 1,
    fontSize: 15,
    color: '#55418E',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 9,
  },
  buttonHistoryOrange: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    maxHeight: 50,
    borderRadius: 30,
    margin: 10,
    backgroundColor: colors.UI_Light_2
  },
  buttonTextOrange: {
    flex: 1,
    fontSize: 15,
    color: colors.UI_Light_4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 9
  },
})
