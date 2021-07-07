import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from "react-native";
import bike from '../assets/bike3.png';
import global from '../components/GlobalVars';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import Colors from '../styles/Colors';
import BikeNest_Button, { ButtonStyle } from '../components/BikeNest_Button';
import { Alert } from 'react-native';
import colors from '../styles/Colors';
import { BookingService } from "../services/BookingService";
import { BikenestService } from "../services/BikenestService";
import moment from "moment";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default function PaymentConfirmationScreen({ route, navigation }) {
  let bookingService = new BookingService();
  let bikenestService = new BikenestService();

  const [bikeDelivered, setBikeDelivered] = useState(null);
  const [bikeTook, setBikeTook] = useState(null);

  let bookings = route.params.bookingData;
  console.log(bookings);

useEffect(() => {
  if (bookings != null){
    setBikeDelivered(bookings.deliveredBike);
    setBikeTook(bookings.tookBike);
    console.log(bikeDelivered + "; " + bikeTook);
    bookings = null;
  }
});

  const downloadInvoice = () => {
    Alert.alert("Download", 'Deine Rechnung wird gedownloaded...');
  }
  const getPrice = () => {
    let hours = getHours(this);
    let days = 1;
    if(hours > 24){
      days = hours/24;
    } 
    let price = days;
    return price;
  }
  const getMwst = () => {
    let brutto = getPrice();
    let mwst = brutto/(1 + 19);
    return mwst;
  }

  const getHours = () => {
    var duration = 0;
    if(bikeDelivered != null && bikeTook != null){
       let delivered = bikeDelivered.split("T");
       let delivered2 = delivered[1];
       let delivered3 = delivered2.split(".");
       delivered = delivered[0] + " " + delivered3[0];
       let deliveredMoment = moment(delivered);
  
       let took = bikeTook.split("T");
       let took1 = took[1];
       let took2 = took1.split(".");
       took = took[0] + " " + took2[0];
       let tookMoment = moment(took);
  
       duration = moment.duration(tookMoment.diff(deliveredMoment)).get('minutes');
       let diff = tookMoment.diff(deliveredMoment);
       let f = moment.utc(diff).format("HH:mm");
       duration = f;
       console.log(f);
     }
    return duration;
  }
  const getBrutto = () => {
    let brutto = getPrice();
    let mwst = getMwst();
    let netto = brutto - mwst;
    return netto;
  }
  const getSlots = () => {
    return "1 Slot";
  }
  const getLocation = () => {
    return bookings.bikenestId;
  }

  return (
    <View style={mainStyles.container}>
      <View style={myStyles.historyContainer}>
        <View style={{ alignSelf: 'center' }}>
          <Text style={mainStyles.h2}>
            Zahlungsbestätigung <Image source={require('../assets/payment/info.png')} />
          </Text>
        </View>
        <TouchableOpacity
          style={[myStyles.heightBike, {
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
            <Text style={{ fontSize: 16, color: '#000000' }}>Vielen Dank für dein Vertrauen! </Text>
            <Text style={{ fontSize: 16, color: '#000000' }}>Wir ziehen folgenden Betrag von deiner ausgewählten Zahlungsmethode ein: {"\n"}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}>{getPrice(this) + " €"}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ alignSelf: 'center' }}>
          <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider} />
        </View>
        <View style={{ alignSelf: 'flex-start', margin: 10 }}>
          <Text style={[mainStyles.h3, { color: colors.UI_BaseGrey_0 }]}>Rechnungsdetails</Text>
        </View>
        <View style={myStyles.headline}>
          <Text style={mainStyles.stdText}>
            {getSlots()} {"\n"}BIKE NEST {getLocation()}
          </Text>
          <Text style={myStyles.stdText}> {getHours()} Stunden </Text>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider} />
        </View>
        <View style={{ alignSelf: 'flex-start', margin: 10 }}>
          <Text style={[mainStyles.h3, { color: colors.UI_Light_2 }]}>Angefallene Kosten</Text>
        </View>
        <View style={myStyles.headline}>
          <Text style={mainStyles.stdText}>Gesamt exkl. Mwst.</Text>
          <Text style={[mainStyles.stdText, { fontWeight: 'bold', color: Colors.UI_Light_2 }]}> {getBrutto() + " €"} </Text>
        </View>
        <View style={myStyles.headline}>
          <Text style={mainStyles.stdText}>Mwst. 19%</Text>
          <Text style={[mainStyles.stdText, { fontWeight: 'bold', color: Colors.UI_Light_2 }]}> {getMwst() + " €"} </Text>
        </View>
        {/* <View style={myStyles.headline}>
          <Text style={mainStyles.stdText}>Rabatt</Text>
          <Text style={[mainStyles.stdText, { fontWeight: 'bold', color: Colors.UI_Light_2 }]}> {getDiscount()} </Text>
        </View> */}
        <Image style={{ justifyContent: 'center', alignSelf: 'center', marginBottom: 10, width: 350 }} source={require('../assets/payment/Line.png')} />
        <View style={myStyles.headline}>
          <Text style={mainStyles.h3}>Gesamt (für {getHours()} Stunden)</Text>
          <Text style={[mainStyles.h3, { fontWeight: 'bold', color: Colors.UI_Light_2 }]}> {getPrice() + " €"} </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <BikeNest_Button overrideButtonColor={Colors.UI_Light_4} overrideTextColor={Colors.UI_BaseGrey_0} type={ButtonStyle.big} text="Rechnung herunterladen" onPress={() => downloadInvoice(this)} />
        </View>
      </View>
      <BikeNest_NavigationFooter></BikeNest_NavigationFooter>
    </View>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyContainer: {
    flex: 1,
    padding: 15,
    marginTop: 30,
    justifyContent: 'center',
    position: 'relative'
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  reserved: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: -(width * 0.2),
    width: 420,
  },
  headline: {
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
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
  place: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nest: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'normal',
  },
  buttonLock: {
    flex: 1,
    backgroundColor: '#FFA500',
    borderRadius: 30,
    margin: 10,
  },
  buttonLockOwner: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonLockText: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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

});
