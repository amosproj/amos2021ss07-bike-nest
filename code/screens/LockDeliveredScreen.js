import {Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {mainStyles} from "../styles/MainStyles";
import gotospot from "../assets/parkspot.png";
import {SimpleLineIcons} from "@expo/vector-icons";
import BikeNest_NavigationFooter from "../components/BikeNest_NavigationFooter";
import React from "react";
import {LockService} from "../services/LockService";
import { Dimensions } from "react-native";

export default function LockDeliveredScreen ({ route, navigation }) {
    let lockService = new LockService();
    let bookingId = route.params.bookingId;
    let spotNumber = route.params.spotNumber;

    let lockBikenest = () => {
        console.log("Lock bikenest!");
        lockService.deliverLock(bookingId).then(booking => {
            navigation.navigate("History");
        }).catch(error => {
            if(error.display){
                alert(error.message);
            }
        })
    };

    return(

        <SafeAreaView style={mainStyles.container}>



            <View style={styles.lockContainer}>
                <Text style={mainStyles.h1}> Stell dein Bike ab!</Text>
                
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 20}}>Stelle dein Bike am Spot {spotNumber} ab.</Text>
                    {/* <Text style={{fontSize: 20}}>Stelle dein Bike am Spot X ab</Text>  */}
                    <Text style={{fontSize: 20}}>Die <SimpleLineIcons name="bulb" size={24} color="orange" /> LED an diesem Platz blinkt</Text>
                </View>

                <Image style={styles.ImageContainer} source={gotospot}></Image>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>Schließe das Bikenest mit dem Knopf,{"\n"} nachdem du es verlassen hast.</Text>
                </View>


                <TouchableOpacity onPress={() => lockBikenest()} style={styles.Icon}>
                    <SimpleLineIcons name="lock" size={24} color="black" />
                    <Text style={{fontSize:14, textAlign:'center'}}> Bikenest schließen</Text>
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
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: '#D6F2C9',
        elevation: 2,
        bottom: 50,
        marginTop:'10%',

    },
    lockContainer: {
        flex: 1,
        alignItems: 'center',

    },
    ImageContainer:{
        flex: 2,
        width: 300,
        height: 200,
        resizeMode: 'contain',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        alignContent: 'space-around',
        //width: 300,
        //height: 200,
    },



});
