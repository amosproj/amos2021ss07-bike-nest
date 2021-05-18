import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import { Dimensions } from "react-native";
import Avatar from '../assets/Avatar.png'; 
import bike from '../assets/bike.png'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import global from '../components/GlobalVars';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default function HistoryScreen({ navigation }) {
  // const [myListData, setData] = useState("");

  let tryGETBooking = () => {
    console.log('start pulling reservation info');

    return fetch(global.globalIPAddress + "/booking/all", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((json) => {
          alert(JSON.stringify(json));
          console.log(json);
        })
        .catch((error) => {
            console.error(error);
        });
}

  return (
    <View style={styles.container}>
      <Image source={Avatar} style={styles.avatar} />

      <Text style={styles.name} >
        Max Muster </Text>
      <Text style={styles.welcome} >
        Willkommen Zurück! </Text>
      <TouchableOpacity  onPress={() => navigation.navigate("Lock") }>
        <Image source={bike} style={styles.bike}/>
        <Text style={styles.place} >
          Du hast einen Platz in: </Text>
        <Text style={styles.nest} >
          Fetch data of where bike is parked </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("EditPersonalInformation")} style={styles.buttonLock}>
        <Text style={styles.buttonLockOwner}> Max Muster's bike </Text>
        <Text style={styles.buttonLockText}> locked </Text>
      </TouchableOpacity>

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

      <TouchableOpacity onPress={() => tryGETBooking(this)} style={styles.buttonHistory}>
        <Text style={styles.buttonHistoryText}> Frühere Reservierungen und Zahlungen </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    position: 'absolute',
    width:60,
    height: 66,
    left: 13,
    top:25,
  },
  name: {
    position: 'absolute',
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    top:25,
    left: 91,
  },
  welcome: {
    position: 'absolute',
    color: '#000000',
    fontSize: 15,
    fontWeight: 'normal',
    top:49,
    left: 91,
  },
  bike: {
    position: 'absolute',
    width: 362,
    height:225,
    top: 118,
    left: 0,
    
  },
  place: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize:16,
    fontWeight:'bold',
    left: 60,
    top: 169,
  },
  nest: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize:14,
    fontWeight:'normal',
    left: 60,
    top: 197,
    width:150,
    height:109,
    padding:0,
  },
  buttonLock: {
    position:'absolute',
    top: 355,
    left:25,
    backgroundColor: '#FFA500',
    padding: 20,
    borderRadius: 30,
    width: 325,
    height:104,
    marginTop: 20,

  },
  buttonLockOwner: {
    fontSize: 20,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  buttonLockText: {
    fontSize: 18,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  time:{
    position:'absolute',
    width:152,
    height:127,
    left:25,
    top:500,
    borderColor: '#E6E5F2',
    borderWidth:1,
    borderRadius: 30,
    padding: 20,
  }, 
  timeText: {
    fontSize: 16,
    color: '#55418E',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginBottom:10,
  }, 
  timeRecord:{
    fontSize: 16,
    color: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'normal',
    marginTop:10,
  }, 

  cost:{
    position:'absolute',
    width:152,
    height:127,
    right:30,
    top:500,
    borderColor: '#E6E5F2',
    borderWidth:1,
    borderRadius: 30,
    padding: 20,
  }, 
  costText: {
    fontSize: 16,
    color: '#55418E',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginBottom:10,
  }, 
  costRecord:{
    fontSize: 16,
    color: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'normal',
    marginTop:10,
  }, 
  buttonHistory: {
    position:'absolute',
    top: 627,
    left:25,
    padding: 20,
    borderRadius: 30,
    width: 322,
    height:63,
    marginTop: 20,
    borderColor: '#E6E5F2',
    borderWidth:1,

  },
  buttonHistoryText: {
    fontSize: 15,
    color: '#55418E',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

});