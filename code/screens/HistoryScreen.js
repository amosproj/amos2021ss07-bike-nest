import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { Dimensions } from "react-native";
import Avatar from '../assets/Avatar.png';
import bike from '../assets/bike.png';
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


  const compareDates = (dateString) => {
    let today = moment().format();
    // today = today.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
    let endDateOfBooking = moment(dateString).format();

    console.log(today);
    console.log(endDateOfBooking);

    if (today < endDateOfBooking) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    global.getAuthenticationToken().then((jwt) => {
      let payload = JwtDecoder.decode(jwt);
      console.log(jwt);
      setUserName(payload.FirstName + " " + payload.LastName);
      setLoadingUserInfo(false);
    })
  }, [])

  useEffect(() => {
    if (loadingBikeInfo) {
      bookingService.getAllBookings().then((bookings) => {
        let bikenestId = 0;
        for (let ind in bookings) {
          let booking = bookings[ind];
          if (booking.deliveredBike !== null && booking.tookBike === null) {
            //Unlock the Bikenest to take the bike
            console.log("Found a valid booking!");
            bikenestId = booking.bikenestId;
            setBikeSpot(booking.bikeSpot);
            setValidBooking(true);
            break;
          }
        }
        if (bikenestId === 0) {
          throw { display: true, message: "Du hast keine valide Buchung eines Bikenests." }
        }
        bikenestService.getBikenestInfo(bikenestId).then((info) => {
          setInfoHeadline("Buchungen");
          setBikenestInfo(info);
          setInfoText("Dein Fahrrad befindet sich hier:\n" + info.name);
          setLoadingBikeInfo(false);
        }).catch(error => {
          if (error.display) {
            setInfoText(error.message);
          } else {
            setInfoText("Oops da ist etwas schief gelaufen. Bitte versuche es noch einmal.");
          }
        })

      }).catch(error => {
        reservationService.getAllReservations().then((reservations) => {
          let bikenestId = 0;
          for (let ind in reservations) {
            let res = reservations[ind];
            console.log(JSON.stringify(res));
            if (!compareDates(res.reservationStart) && compareDates(res.reservationEnd) && !res.used
              && !res.cancelled) {
              //Unlock the Bikenest to deliver the bike
              console.log("Found a valid Reservation!");
              bikenestId = res.bikenestId;
              break;
            }
          }
          if (bikenestId === 0) {
            throw { display: true, message: "Du hast keine valide Reservierungr eines Bikenests." }
          }
          bikenestService.getBikenestInfo(bikenestId).then((info) => {
            setBikenestInfo(info);
            setInfoHeadline("Reservierungen");
            setInfoText("Dein Bikenest findest du hier:\n" + info.name);
            setLoadingBikeInfo(false);
          }).catch(error => {
            if (error.display) {
              setInfoText(error.message);
            } else {
              setInfoText("Oops da ist etwas schief gelaufen. Bitte versuche es noch einmal.");
            }
          })

        }).catch(error => {
          if (error.display) {
            setInfoText(error.message);
          } else {
            setInfoText("Oops da ist etwas schief gelaufen. Bitte versuche es noch einmal.");
          }
        })
      })
    }
  }, [])

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
    console.log("info: " + bikenestInfo.gpsCoordinates);
    let coordinates = bikenestInfo.gpsCoordinates.split(",");
    let latitude = coordinates[0];
    let longitude = coordinates[1];
    Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + latitude + ',' + longitude + '&travelmode=bicycling');
  }

  let showBikeSpotBtn = () =>
    validBooking === true ?
      <TouchableOpacity onPress={() => navigation.navigate("Unlock")} style={mainStyles.buttonMedium}>
        <Text style={mainStyles.buttonText}> {userName}'s bike </Text>
        <Text style={mainStyles.buttonText}> locked on spot {bikeSpot} </Text>
      </TouchableOpacity>
      : null;


  return (
    <View style={mainStyles.container}>
      <View style={styles.historyContainer}>
        <View style={styles.containerRow}>
          <TouchableOpacity onPress={() => navigation.navigate("EditPersonalInformation")}>
            <Image source={Avatar} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.name}>
            {userName}</Text>
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
            <Text style={mainStyles.h3}>{infoHeadline + "\n"}</Text>
            <Text style={{ fontSize: 16 }}>{infoText + "\n"}</Text>
            <Text style={{ textDecorationLine: 'underline', fontSize: 16, fontStyle: 'italic' }}> Zeig es auf
              der Karte </Text>
          </View>
        </TouchableOpacity>


        <View style={styles.containerRow}>
          <TouchableOpacity style={styles.time}>
            <Text style={styles.timeText}> Zeit </Text>
            <SimpleLineIcons name="clock" size={24} color="black" />
            <Text style={styles.timeRecord}> {validBooking === true ? "1 Tag" : ""}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cost}>
            <Text style={styles.costText}> Parkkosten </Text>
            <AntDesign name="creditcard" size={24} color="black" />
            <Text style={styles.costRecord}> {validBooking === true ? "50 $" : ""} </Text>
          </TouchableOpacity>
        </View>

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
