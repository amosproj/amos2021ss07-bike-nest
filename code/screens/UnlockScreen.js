import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground} from 'react-native';
import { Dimensions } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { mainStyles } from "../styles/MainStyles";
import Colors from '../styles/Colors';
import lockBackground from '../assets/background/lockBackground.png'; 

import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { colors } from 'react-native-elements';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function UnlockScreen({ navigation }) {
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
                <Text style={mainStyles.h1}>Bikenest öffnen</Text>
                <Text style={mainStyles.h2}>Scannen sie den QR Code am Bikenest, um die Tür zu öffnen.</Text>
            </View>
            
            {/* <TouchableOpacity style={styles.Icon}>
                <SimpleLineIcons name="lock" size={24} color="black" />
                <Text style={styles.buttonText}> Lock </Text>
            </TouchableOpacity> */}
            

            <TouchableOpacity onPress={() => navigation.navigate("QrReaderScreen")} style={styles.Icon}>
                <SimpleLineIcons name="lock-open" size={24} color="black" />
                <Text style={mainStyles.h3}> Scan QR</Text>
            </TouchableOpacity> 

           
        </View>
            <BikeNest_NavigationFooter></BikeNest_NavigationFooter>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    Icon:{
        position: 'absolute',
        left: 90,
        top: '70%',
        height:128,
        width: 128,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 64,
        borderWidth: 6,
        borderColor: 'white',
        backgroundColor: '#D6F2C9',
        elevation: 3,
    },
    lockContainer: {
        flex: 1,
        alignItems: 'center',

      },
      storeText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',

      },


 
});
