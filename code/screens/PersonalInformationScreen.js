import EditPersonalInformation from "../components/EditPersonalInformation/EditPersonalInformation";
import EditPassword from "../components/EditPersonalInformation/EditPassword";
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

export default class PersonalInformationScreen extends Component{
    render(){
        return (
            <View style={styles.mainview}>
                <Text style={styles.headline}>Personal settings</Text>
                <EditPersonalInformation style={{flex:1}}></EditPersonalInformation>
                <EditPassword style={{flex:0.5}}></EditPassword>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainview: {
        flexDirection: "column",
        width: "100%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F28D35'
    },
    headline:{
        margin:30
    },

});
