import EditPersonalInformation from "../components/EditPersonalInformation/EditPersonalInformation";
import EditPassword from "../components/EditPersonalInformation/EditPassword";
import React, { Component } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { mainStyles } from "../styles/MainStyles";
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import BikeNest_Button, { ButtonStyle } from '../components/BikeNest_Button';
import colors from "../styles/Colors";
import { styles } from "../components/EditPersonalInformation/styles";

// This is the Screen where Personal information is edited

export default class PersonalInformationScreen extends Component {
    render() {
        return (
            <View style={mainStyles.container}>
                <ScrollView>
                    <Text style={[mainStyles.h1, { alignSelf: 'center', justifyContent: 'center' }]}>Einstellungen</Text>
                    <Image source={require('../assets/Avatar.png')} style={styles.Avatar}></Image>
                    <View style={{ marginTop: 10, backgroundColor: '#ffffff', borderRadius: 15 }}>
                        <EditPersonalInformation />
                    </View>

                    <View style={{ marginTop: 25, backgroundColor: '#fffff', borderRadius: 15 }}>
                        <EditPassword />
                    </View>
                </ScrollView>
                <BikeNest_NavigationFooter />
            </View>
        )
    }
}


