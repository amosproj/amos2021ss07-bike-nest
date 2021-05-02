import EditPersonalInformation from "../components/EditPersonalInformation/EditPersonalInformation";
import EditPassword from "../components/EditPersonalInformation/EditPassword";
import React, {Component} from "react";
import {Text, View} from "react-native";

export default class PersonalInformationScreen extends Component{
    render(){
        return (
            <View>
                <h1>Personal settings</h1>
                <EditPersonalInformation></EditPersonalInformation>
                <EditPassword></EditPassword>
            </View>
        )
    }
}
