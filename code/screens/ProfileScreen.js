import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { mainStyles } from "../styles/MainStyles";

// This is the screen where the Profile is shown and additional information can be seen

export default function ProfileScreen({ navigation }) {
        return (
            <View style={mainStyles.container}>
                <ScrollView>
                    <Text style={mainStyles.h1}>Profil</Text>
                    <View style={myStyles.profile}>
                        <Image source={require('../assets/Avatar.png')}></Image>
                        <View style={mainStyles.profileInfo}>
                            <Text style={mainStyles.h3}>
                                Max Muster {"\n"} 
                            </Text>
                            <Text style={mainStyles.stdText}>
                                Beispiel@Gmail.com {"\n"} 
                                +52 1111111111 {"\n"} 
                                Adresse
                                {"\n"} 
                                {"\n"} 
                            </Text>
                            <Pressable onPress={()=>navigation.navigate("EditPersonalInformation")} >
                                <View style={mainStyles.buttonContent}>
                                    <Image style={[myStyles.buttonImage, { maxWidth: 150, resizeMode: 'contain' }]} source={require('../assets/edit-3.png')}></Image>
                                </View>
                            </Pressable>
                            
                        </View >
                    </View>
                </ScrollView>
            </View>
        )
    }

const myStyles = StyleSheet.create({
    profile:{
        flexDirection: 'row',
        margin: 10,
    },
    profileInfo:{
        flexDirection: 'column'
    }
})
