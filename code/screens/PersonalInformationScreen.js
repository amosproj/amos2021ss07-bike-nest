import EditPersonalInformation from "../components/EditPersonalInformation/EditPersonalInformation";
import EditPassword from "../components/EditPersonalInformation/EditPassword";
import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";

export default class PersonalInformationScreen extends Component{
    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.h1}>Personal settings</Text>
                    <View style={{marginTop:10, backgroundColor: '#D6F2C9', borderRadius: 15}}>
                        <EditPersonalInformation/>
                    </View>

                    <View style={{marginTop:25, backgroundColor: '#D6F2C9', borderRadius: 15}}>
                        <EditPassword/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 30
    }
});
