import React, { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import { Dimensions } from "react-native";
import Avatar from '../assets/Avatar.png'; 
import bike from '../assets/bike.png'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import global from '../components/GlobalVars';
import { mainStyles } from "../styles/MainStyles";
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';


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
    <View style={mainStyles.container}>
      <View style={styles.historyContainer}>
        <View style={styles.containerRow}>
          <Image source={Avatar} style={styles.avatar} />
          <Text style={styles.name} >
            Max Muster </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Lock") }
          style={styles.heightBike, {
            backgroundColor: '#FFF',
            height: 230,
            width: 360,
            margin: 10,
            position: 'relative'
          }}>
          <ImageBackground
            source={bike}
            style={{
              height: 230,
              width: 360,
              position: 'absolute',
            }}
          />
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 30}}>
            <Text style={{fontSize: 16}}>Vielen Dank für die Reservierung! </Text>
            <Text style={{fontSize: 16}}>Begib dich zu folgendem BIKE NEST: {"\n"}</Text>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>BIKE NEST {"\n"}Nürnberg HBF </Text>
          </View>
        </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("EditPersonalInformation")} style={styles.buttonLock}>
        <Text style={styles.buttonLockOwner}> Max Muster's bike </Text>
        <Text style={styles.buttonLockText}> locked </Text>
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
    marginTop: 20,
    margin: 10,
    justifyContent: 'space-evenly',
    position: 'relative',
  },
  containerRow:{
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
    margin: 10,
  },
  welcome: {
    flex: 1,
    color: '#000000',
    fontSize: 15,
    fontWeight: 'normal',
  },
  heightBike: {
    height: 200,
    position: 'relative',           
  },
  textBike: {
    position: 'absolute',
    color: '#000000',
    fontSize:16,
    fontWeight:'bold',
    flex: 1,                    
    // backgroundColor: 'yellow',
  },
  place: {
    flex: 1,
    color: '#FFFFFF',
    fontSize:16,
    fontWeight:'bold',
  },
  nest: {
    flex: 1,
    color: '#FFFFFF',
    fontSize:14,
    fontWeight:'normal',
  },
  buttonLock: {
    flex: 1,
    backgroundColor: '#FFA500',
    borderRadius: 30,
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
  time:{
    flex: 1,
    borderColor: '#E6E5F2',
    borderWidth:1,
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
  timeRecord:{
    flex: 1,
    fontSize: 16,
    color: '#FFA500',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'normal',
  }, 

  cost:{
    flex: 1,
    borderColor: '#E6E5F2',
    borderWidth:1,
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
  costRecord:{
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
    borderWidth:1,
    maxHeight: 50,
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