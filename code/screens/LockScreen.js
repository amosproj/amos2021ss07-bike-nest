import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground} from 'react-native';
import { Dimensions } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
// import {styles} from "./styles";
import { mainStyles } from "../styles/MainStyles";
import Colors from '../styles/Colors';
import lockBackground from '../assets/background/lockBackground.png'; 

import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function LockScreen({ navigation }) {
    return(

        <SafeAreaView style={mainStyles.container}>
        


        <View style={styles.lockContainer}>
            
            <ImageBackground
                source={lockBackground}
                style={{
                flex: 1,
                height: '90%',
                width: '100%',
                position: 'absolute',
                // flexWrap: 'wrap'
                }}
          />

            
            <View style={styles.storeText}>
                <Text style={mainStyles.h1}> Main Door </Text>
                <Text style={mainStyles.h2}>
                    Store your bike
                </Text>
            </View>

            
        
            
            {/* <TouchableOpacity style={styles.Icon}>
                <SimpleLineIcons name="lock" size={24} color="black" />
                <Text style={styles.buttonText}> Lock </Text>
            </TouchableOpacity> */}
            

            <TouchableOpacity onPress={() => alert('go to next screen')} style={styles.Icon}>
                <Text style={mainStyles.h3}> Lock </Text>
            </TouchableOpacity> 

           
        </View>
            <BikeNest_NavigationFooter></BikeNest_NavigationFooter>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    Icon:{
        position: 'absolute',
        left: 60,
        top: '70%',
        height:128,
        width: 128,
        alignItems: 'center',
        borderRadius: 64,
        backgroundColor: '#dddddd',
    },
    lockContainer: {
        flex: 1,
        alignItems: 'center',

      },


 
});