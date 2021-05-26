import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import { Dimensions } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { mainStyles } from "../styles/MainStyles";
import Colors from '../styles/Colors';
import gotospot from '../assets/gotospot.png'; 

import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { colors } from 'react-native-elements';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function LockSpotScreen ({ navigation }) {
    return(

        <SafeAreaView style={mainStyles.container}>
        


        <View style={styles.lockContainer}>
            <Text style={mainStyles.h1}> Great you are in!</Text>
            
            <Image style={styles.ImageContainer} source={gotospot}></Image>
              
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 20}}>Go to spot X </Text>
              <Text style={{fontSize: 20}}> and open with the button {"\n"}</Text>
            </View>
    

            <TouchableOpacity onPress={() =>  Alert.alert("Your bike is secure!","Leave the BikeNest and don´t forget to lock the door.", 
                    [
                          { text: "Ok", onPress: () => navigation.navigate("History") }
                      ])} style={styles.Icon}>
                <SimpleLineIcons name="lock-open" size={24} color="black" />
                <Text style={mainStyles.h3}> Unlock </Text>
            </TouchableOpacity> 

           
        </View>
            <BikeNest_NavigationFooter></BikeNest_NavigationFooter>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    Icon:{
        height:128,
        width: 128,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 64,
        borderWidth: 6,
        borderColor: 'white',
        backgroundColor: '#D6F2C9',
        elevation: 3,
        bottom: 50,
        
    },
    lockContainer: {
        flex: 1,
        alignItems: 'center',

      },
    ImageContainer:{
        width: 300, 
        height: 200,
        resizeMode: 'contain',
    },


 
});