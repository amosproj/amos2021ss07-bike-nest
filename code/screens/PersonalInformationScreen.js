import EditPersonalInformation from "../components/EditPersonalInformation/EditPersonalInformation";
import EditPassword from "../components/EditPersonalInformation/EditPassword";
import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { mainStyles } from "../styles/MainStyles";
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';

// This is the Screen where Personal information is edited

export default class PersonalInformationScreen extends Component {
    render() {
        return (
            <View style={mainStyles.container}>
                <ScrollView>
                    <Text style={mainStyles.h1}>Personal settings</Text>
                    <View style={{ marginTop: 10, backgroundColor: '#D6F2C9', borderRadius: 15 }}>
                        <EditPersonalInformation />
                    </View>

                    <View style={{ marginTop: 25, backgroundColor: '#D6F2C9', borderRadius: 15 }}>
                        <EditPassword />
                    </View>
                </ScrollView>
                <BikeNest_NavigationFooter />
            </View>
        )
    }
}

