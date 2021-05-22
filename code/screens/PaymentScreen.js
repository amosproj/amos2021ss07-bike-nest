import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Dimensions } from "react-native";
import Colors from '../styles/Colors';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { mainStyles } from "../styles/MainStyles";
import { TouchableOpacity } from 'react-native';
import { BookingService } from "../services/Booking";
import { ScrollView } from 'react-native';
import BikeNest_Modal from '../components/BikeNest_Modal';
import global from '../components/GlobalVars';
import moment from "moment";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function PaymentScreen({ navigation }) {
    let bookingData = new BookingService();
    const [slots, setSlots] = useState("");
    const [hours, setHours] = useState("");
    const [ebike, setEbike] = useState("");
    const [promocode, setPromoCode] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalHeadline, setModalHeadline] = useState("");

    let tryCreateBooking = (bikenestId, startTime, endTime) => {

      let data = {"bikenestId": bikenestId, "startDateTime": startTime, "endDateTime": endTime};

      return fetch(global.globalIPAddress + "/booking/add", {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'jwt-token'
          },
      })
          .then((response) => response.json())
          .then((json) => {
              console.log(JSON.stringify(data));

              //Testing
              let mockAccountCreated = true;
              let mockErrorMsg = "Error Msg test";
              let mockData = {mockAccountCreated, mockErrorMsg};

              //Pageforwarding
              navigation.navigate("ReservationSuccess");

              // console.log(mockData);
              // setModalInfo(mockData);

              //setModalInfo(json);
          })
          .catch((error) => {
              setModalHeadline("Sorry!");
              setModalText("Oops da ist etwas schief gelaufen. Bitte versuche es noch einmal.");
              setModalVisible(true);
              console.error(error);
          });
  }

  const onPressPaypal = () => {
    //reconnect to paypal
    //change style to border orange
    //change style of pressable Visa to no border
    Alert.alert("Paypal",
                    "Du wirst jetzt zu Paypal weitergeleitet.",
                    [
                      //API Call Paypal
                        { text: "OK", onPress: () => navigation.navigate("History") }
                    ]);
  };
  const onPressVisa = () => {
    //Not implemented yet
  };
  const onPressAdd = () => {
    //Zu Zahlungsmethodenauswahl?
  };
  const onPressInfo = () => {
    //zurück zu Find Bike Nest
    alert('this is an info.');
  };
  const onPressOrder = () => {
    var dateStart = moment()
    .utcOffset('+05:30')
    .format('yyyy-MM-DD');
    var timeStart =  moment()
    .utcOffset('+02:00')
    .format('HH:mm:ss');
    var dateEnd = moment()
    .utcOffset('+05:30')
    .format('yyyy-MM-DD');
    var timeEnd =  moment()
    .utcOffset('+02:30')
    .format('HH:mm:ss');

    var bikenestId = '1';
    var startTime = dateStart + 'T' + timeStart; 
    var endTime = dateEnd + 'T' + timeEnd;
    console.log(' start: ' + startTime + ' end: ' + endTime);

    tryCreateBooking(bikenestId, startTime, endTime);
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
      <BikeNest_Modal
          modalHeadLine={modalHeadline}
          modalText={modalText}
          isVisible={modalVisible}
          onPress={() => setModalVisible(false)}
          onRequestClose={() => { setModalVisible(!modalVisible); }}
        />
      <ScrollView>
      <View style={myStyles.paymentContainer}>
        <View style={{alignSelf:'center'}}>
            <Text style={myStyles.h2}>
                Meine Reservierung <Image onPress={() => onPressInfo(this)} source={require('../assets/payment/info.png')}/>
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
            {/* <Text style={[myStyles.h3, {fontWeight: 'bold'}]} onPress={() => onPressAdd(this)}> <Image source={require('../assets/payment/plus.png')}/> Hinzufügen </Text> */}
        </View>
        <View style={myStyles.zahlungsmethode}>
            <TouchableOpacity style={[mainStyles.buttonBig, {backgroundColor: '#ffffff'}]} onPress = {() => onPressPaypal(this)}>
              <View style={myStyles.buttonContent}>
                  <Image style={[myStyles.buttonImage, { maxWidth: 150, resizeMode: 'contain' }]} source={require('../assets/payment/Paypal1.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[mainStyles.buttonBig, {backgroundColor: '#ffffff'}]} onPress = {() => onPressVisa(this)}>
              <View style={myStyles.buttonContent}>
                  <Image style={[myStyles.buttonImage, { maxWidth: 150, resizeMode: 'contain' }]} source={require('../assets/payment/Visa.png')} />
              </View>
            </TouchableOpacity>
        </View>
        <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider}/>
        <View style={myStyles.headline}>
            <Text style={myStyles.h3}> Promocode </Text>
            <TextInput style={[myStyles.halfButton, { fontWeight: 'bold', color: Colors.UI_Light_2}]}
              placeholder='BIKE NEST'
              onChangeText={(promocode) => setPromoCode(promocode)}
              value={promocode} /> 
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
      </ScrollView>
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