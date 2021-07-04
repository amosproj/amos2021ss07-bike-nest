
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import { mainStyles } from "../styles/MainStyles";
import colors from "../styles/Colors";
import BikeNest_Button, { ButtonStyle } from '../components/BikeNest_Button';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import global from '../components/GlobalVars';
import JwtDecoder from '../components/JwtDecoder';
import { UserService } from '../services/UserService';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



// This is the screen where the Profile is shown and additional information can be seen

export default function ProfileScreen({ navigation }) {
    let userService = new UserService();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            global.getAuthenticationToken().then((jwt) => {
                let decodedJwt = JwtDecoder.decode(jwt);
                setFirstName(decodedJwt.FirstName);
                setLastName(decodedJwt.LastName);
                setEmail(decodedJwt.sub);
                setLoading(false);
            })
        }
    })

  
    return (
        <View style={mainStyles.container}>
            <ScrollView>
                <Text style={[mainStyles.h1, { alignSelf: 'center', justifyContent: 'center' }]}>Profil</Text>
                <View style={myStyles.profile}>
                    <Image source={require('../assets/Avatar.png')}></Image>
                    <View style={mainStyles.profileInfo}>
                        <Text style={mainStyles.h3}>
                        {firstName} {" "}{lastName}{"\n"}
                        </Text>
                        <Text style={mainStyles.stdText}>
                        {email}  {"\n"}
                           
                        </Text>
                    </View >
                </View>
                <View style={myStyles.pencil}>
                    <Pressable onPress={() => navigation.navigate("EditPersonalInformation")}>
                        <View style={mainStyles.buttonContent}>
                            <Feather name="edit-3" size={30} color="black" />
                            {/* <MaterialCommunityIcons name="account-edit-outline" size={30} color="black" /> */}
                            {/* <Image style={[myStyles.buttonImage, { maxWidth: 150, resizeMode: 'contain' }]} source={require()}></Image> */}
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
                    <Text style={{ textDecorationLine: 'underline' }}>Ausloggen</Text>
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
        margin: '5%',
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
