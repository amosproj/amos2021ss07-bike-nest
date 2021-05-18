import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView  } from 'react-native';
import { Dimensions } from "react-native";
import Avatar from '../assets/Avatar.png'; 
import bike from '../assets/bike.png'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import colors from "../styles/Colors";
import { mainStyles } from '../styles/MainStyles';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function HistoryScreen({ navigation }) {
   return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.UI_Light_4}}>

      <View style={HSstyles.header}>
        <View>
        <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 15}}>Hello,</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 13}}>
              Max Muster
            </Text>
          </View>
          <Image source={Avatar} style={HSstyles.avatar} />
        </View>
      </View>

      <View style={mainStyles.container}>

        <View style= {HSstyles.cardBikeContainer1}>
          <TouchableOpacity onPresss={()=> navigation.navigate("FindBikeNest")}>
            <View style={HSstyles.innerContainer}>
              <Image source={bike} style={HSstyles.bike}></Image>
              <View style={HSstyles.cardTextContainer}>
                <Text style={HSstyles.place} > Du hast einen Platz in: </Text>
                 <Text style={HSstyles.nest} >Fetch data of where bike is parked </Text>
              </View>
             </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("EditPersonalInformation")} style={mainStyles.button}>
          <Text style={HSstyles.buttonLockOwner}> Max Muster's bike </Text>
          <Text style={HSstyles.buttonLockText}> locked </Text>
        </TouchableOpacity>

        <View style={[
            HSstyles.cardContainer2,
            {
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'flex-start',
              alignContent: 'space-around',
            },
          ]}>
          <TouchableOpacity style={HSstyles.time}>
            <Text style={HSstyles.timeText}> Zeit verging </Text>
            <SimpleLineIcons name="clock" size={24} color="black" />
            <Text style={HSstyles.timeRecord}> 1 Tag </Text> 
          </TouchableOpacity>

          <TouchableOpacity style={HSstyles.cost}>
            <Text style={HSstyles.costText}> Parkkosten </Text>
            <AntDesign name="creditcard" size={24} color="black" />
            <Text style={HSstyles.costRecord}> 50 $ </Text> 
          </TouchableOpacity>

        </View>

        <TouchableOpacity onPress={() => navigation.navigate("EditPersonalInformation")} style={mainStyles.button}>
           <Text style={HSstyles.buttonHistoryText}> Frühere Reservierungen und Zahlungen </Text>
        </TouchableOpacity>

      
      </View>
      <BikeNest_NavigationFooter/>


    </SafeAreaView>


    )
}

const HSstyles = StyleSheet.create({
 

  header: {
    
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },

  avatar: {

    width:60,
    height: 66,
  },
  cardBikeContainer1: {
    flex: 1,
    marginTop: Dimensions.get('window').height * 0.02,
    marginLeft: Dimensions.get('window').width * 0.01,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
  },

  innerContainer: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    backgroundColor: '#fff',
  },

  bike: {

    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.2,
    resizeMode: 'contain',
  },

  cardTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  place: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'flex-start',
    //position: 'absolute',
    color: '#000000',
    fontSize:16,
    fontWeight:'bold',
    //left: 60,
    //top: 169,
  },
  nest: {
    /*position: 'absolute',
    color: '#FFFFFF',
    fontSize:14,
    fontWeight:'normal',
    left: 60,
    top: 197,
    width:150,
    height:109,
    padding:0,*/
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'flex-start',
    //position: 'absolute',
    color: '#000000',
    fontSize:16,
    fontWeight:'bold',
    //left: 60,
    //top: 169,
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
  cardBikeContainer2: {
    flex: 1,
    marginTop: Dimensions.get('window').height * 0.02,
    marginLeft: Dimensions.get('window').width * 0.01,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
  },
  time:{

    flex: 1,
    marginTop: 0,
    marginLeft: Dimensions.get('window').width * 0.01,
    borderColor: '#E6E5F2',
    borderWidth:1,
    borderRadius: 30,
    /*
    position:'absolute',
    width:152,
    height:127,
    left:25,
    top:500,
   
    padding: 20,*/
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
    /*position:'absolute',
    width:152,
    height:127,
    right:30,
    top:500,
    borderColor: '#E6E5F2',
    borderWidth:1,
    borderRadius: 30,
    padding: 20,*/
    flex: 1,
    marginTop: 0,
    marginLeft: Dimensions.get('window').width * 0.01,
    borderColor: '#E6E5F2',
    borderWidth:1,
    borderRadius: 30,
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
  }

})