import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import { Dimensions } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
// import {styles} from "./styles";

export default function LockScreen({ navigation }) {
    return(
        <View>
            
            <TouchableOpacity style={styles.Icon}>
                <SimpleLineIcons name="lock" size={24} color="black" />
                <Text style={styles.buttonText}> Lock </Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress={() => alert('go to next screen')} style={styles.LockButton}>
                <Text style={styles.LockButtonText}> Lock </Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    Icon:{
        position: 'absolute',
        left: 60,
        top: 197,
        height:128,
        width: 128,
        borderRadius: 64,
        backgroundColor: '#FFA500',
    },


});