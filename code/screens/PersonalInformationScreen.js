import EditPersonalInformation from "../components/EditPersonalInformation/EditPersonalInformation";
import EditPassword from "../components/EditPersonalInformation/EditPassword";
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

export default class PersonalInformationScreen extends Component{
    render(){
        return (
            <View style={styles.mainview}>
                <Text style={styles.headline}>Personal settings</Text>
                <EditPersonalInformation></EditPersonalInformation>
                <EditPassword></EditPassword>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ff0'
    },
    headline:{
        margin:30
    },

});
