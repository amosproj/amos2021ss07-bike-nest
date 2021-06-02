import React from "react";
import { ScrollView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { mainStyles } from "../styles/MainStyles";
import colors from "../styles/Colors";
import BikeNest_Button, { ButtonStyle } from '../components/BikeNest_Button';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import global from '../components/GlobalVars';

// This is the screen where the Profile is shown and additional information can be seen

export default function ProfileScreen({ navigation }) {
    return (
        <View style={mainStyles.container}>
            <ScrollView>
                <Text style={[mainStyles.h1, { alignSelf: 'center', justifyContent: 'center' }]}>Profil</Text>
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
                        </Text>
                    </View >
                </View>
                <View style={myStyles.pencil}>
                    <Pressable onPress={() => navigation.navigate("EditPersonalInformation")}>
                        <View style={mainStyles.buttonContent}>
                            <Image style={[myStyles.buttonImage, { maxWidth: 150, resizeMode: 'contain' }]} source={require('../assets/edit-3.png')}></Image>
                        </View>
                    </Pressable>
                </View>
                <BikeNest_Button
                    type={ButtonStyle.big}
                    text="Zahlungsinformationen"
                    overrideButtonColor={'#ffffff'}
                    overrideTextColor={colors.UI_BaseGrey_0}
                    onPress={() => console.log('HELLO')} />
                <BikeNest_Button
                    type={ButtonStyle.big}
                    text="Über Bike Nest"
                    overrideButtonColor={'#ffffff'}
                    overrideTextColor={colors.UI_BaseGrey_0}
                    onPress={() => console.log('HELLO')} />
                <BikeNest_Button
                    type={ButtonStyle.big}
                    text="FAQ"
                    overrideButtonColor={'#ffffff'}
                    overrideTextColor={colors.UI_BaseGrey_0}
                    onPress={() => console.log('HELLO')} />
                <BikeNest_Button
                    type={ButtonStyle.big}
                    text="Hilfe"
                    overrideButtonColor={'#ffffff'}
                    overrideTextColor={colors.UI_BaseGrey_0}
                    onPress={() => console.log('HELLO')} />
                <Pressable style={[myStyles.logout, mainStyles.stdText]} onPress={() => global.deleteAuthenticationToken().then(navigation.navigate("Login"))}>
                    <Text style={{ textDecorationLine: 'underline' }}>Log out</Text>
                </Pressable>
            </ScrollView>
            <BikeNest_NavigationFooter />
        </View>
    )
}

const myStyles = StyleSheet.create({
    profile: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    profileInfo: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    pencil: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20
    }
})
