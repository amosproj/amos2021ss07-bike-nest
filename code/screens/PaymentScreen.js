import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {Dimensions} from "react-native";
import Colors from '../styles/Colors';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import {mainStyles} from "../styles/MainStyles";
import {TouchableOpacity} from 'react-native';
import {BookingService} from "../services/BookingService";
import {ScrollView} from 'react-native';
import BikeNest_Modal from '../components/BikeNest_Modal';
import global from '../components/GlobalVars';
import moment from "moment";
import {ReservationService} from "../services/ReservationService";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function PaymentScreen({route, navigation}) {
    let reservationService = new ReservationService();
    const [promocode, setPromoCode] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalHeadline, setModalHeadline] = useState("");

    let bikenest = route.params.state;
    let bikenestName = route.params.name;
    let selectedSlots = route.params.slots;
    let selectedTime = route.params.time;
    let selectedEbike = route.params.ebike;
    let estimatedPrice = route.params.price;
    console.log(bikenest.id + "; " + bikenestName);

    let tryCreateBooking = (bikenestId) => {

        reservationService.createReservation(bikenestId, 30)
            .then(reservation => {
                //Forward to Reservation Success also providing the bikenest, and the bikespot Number
                navigation.navigate("ReservationSuccess", {state: bikenest, name: bikenestName,
                    bikespotNumber: reservation.bikespotNumber});
            }).catch(error => {
            if (error.display) {
                setModalHeadline("Sorry!");
                setModalText(error.message);
                setModalVisible(true);
            } else {
                setModalHeadline("Sorry!");
                setModalText("Oops da ist etwas schief gelaufen. Bitte versuche es noch einmal.");
                setModalVisible(true);
            }
        });
    }

    const onPressPaypal = () => {
        //reconnect to paypal
        //change style to border orange
        //change style of pressable Visa to no border
        Alert.alert("Paypal",
            "Du wirst jetzt zu Paypal weitergeleitet.",
            [
                //API Call Paypal
                {text: "OK", onPress: () => navigation.navigate("History")}
            ]);
    };
    const onPressVisa = () => {
        //Not implemented yet
    };
    const onPressAdd = () => {
        //Zu Zahlungsmethodenauswahl?
    };
    const onPressInfo = () => {
        //zurück zu Find Bike Nest
        alert('Info', 'Du kannst hier deinen BIKE NEST Spot buchen. Wenn du dein Fahrrad wieder abholst werden wir dir die benutzte dauer über deine ausgewählte Zahlungsmethode berechnen.');
    };
    const onPressOrder = () => {
        var bikenestId = '1';
        tryCreateBooking(bikenestId);
    }
    const getSlots = () => {
        return selectedSlots;
    };
    const getLocation = () => {
        return bikenestName;
    };
    const getEbike = () => {
        return selectedEbike;
    };
    const getHours = () => {
        return selectedTime;
    };
    const getPrice = () => {
        return estimatedPrice;
    };
    const getDiscount = () => {
        return 0.0;
    };
    const getSum = () => {
        return (estimatedPrice - getDiscount());
    };
    return (
        <View style={myStyles.container}>
            <BikeNest_Modal
                modalHeadLine={modalHeadline}
                modalText={modalText}
                isVisible={modalVisible}
                onPress={() => setModalVisible(false)}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            />
            <ScrollView>
                <View style={myStyles.paymentContainer}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={myStyles.h2}>
                            Meine Reservierung <Image onPress={() => onPressInfo(this)}
                                                      source={require('../assets/payment/info.png')}/>
                        </Text>
                    </View>
                    <View style={myStyles.headline}>
                        <Text style={myStyles.h3}> Details </Text>
                        <Text style={[myStyles.h3, {fontWeight: 'bold'}]}
                              onPress={() => navigation.navigate("Booking")}> Ändern </Text>
                    </View>
                    <View style={myStyles.headline}>
                        <Text style={myStyles.stdText}>
                            {"\n"}
                            {getSlots()} im BIKE NEST {"\n"}
                            {getLocation()} {"\n"}
                            {getEbike()}
                        </Text>
                        <Text style={myStyles.stdText}> {getHours()} </Text>
                    </View>
                    <View style={myStyles.reserved}>
                        <Image source={require('../assets/payment/clock.png')} style={{margin: 10}}/>
                        <Text style={[myStyles.stdText, {color: Colors.UI_Light_2}]}>
                            Reserviert für 30min
                        </Text>
                    </View>
                    <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider}/>
                    <View style={myStyles.headline}>
                        <Text style={myStyles.h3}> Zahlungsmethode </Text>
                        {/* <Text style={[myStyles.h3, {fontWeight: 'bold'}]} onPress={() => onPressAdd(this)}> <Image source={require('../assets/payment/plus.png')}/> Hinzufügen </Text> */}
                    </View>
                    <View style={myStyles.zahlungsmethode}>
                        <TouchableOpacity style={[mainStyles.buttonBig, {backgroundColor: '#ffffff'}]}
                                          onPress={() => onPressPaypal(this)}>
                            <View style={myStyles.buttonContent}>
                                <Image style={[myStyles.buttonImage, {maxWidth: 150, resizeMode: 'contain'}]}
                                       source={require('../assets/payment/Paypal1.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[mainStyles.buttonBig, {backgroundColor: '#ffffff'}]}
                                          onPress={() => onPressVisa(this)}>
                            <View style={myStyles.buttonContent}>
                                <Image style={[myStyles.buttonImage, {maxWidth: 150, resizeMode: 'contain'}]}
                                       source={require('../assets/payment/Visa.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider}/>
                    <View style={myStyles.headline}>
                        <Text style={myStyles.h3}> Promocode </Text>
                        <TextInput style={[myStyles.halfButton, {fontWeight: 'bold', color: Colors.UI_Light_2}]}
                                   placeholder='BIKE NEST'
                                   onChangeText={(promocode) => setPromoCode(promocode)}
                                   value={promocode}/>
                    </View>
                    <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider}/>
                    <View style={[myStyles.headline, {marginTop: 10, marginBottom: 10}]}>
                        <Text style={myStyles.h3}>Geschätzter Preis</Text>
                        <Text style={[myStyles.h3, {
                            fontWeight: 'bold',
                            color: Colors.UI_Light_2
                        }]}> ~{getPrice()}€ </Text>
                    </View>
                    <View style={[myStyles.headline, {marginTop: 10, marginBottom: 10}]}>
                        <Text style={myStyles.h3}>Rabatt</Text>
                        <Text style={[myStyles.h3, {
                            fontWeight: 'bold',
                            color: Colors.UI_Light_2
                        }]}> {getDiscount()}€ </Text>
                    </View>
                    <View style={[myStyles.headline, {marginTop: 10, marginBottom: 10}]}>
                        <Text style={myStyles.h3}>Gesamt (für {getHours()})</Text>
                        <Text
                            style={[myStyles.h3, {fontWeight: 'bold', color: Colors.UI_Light_2}]}> ~{getSum()}€ </Text>
                    </View>
                    {/* <View style={myStyles.headline}>
            <Text style={myStyles.stdText}>Gesamt exkl. Mwst.</Text>
            <Text style={[myStyles.stdText, { fontWeight: 'bold', color: Colors.UI_Light_2}]}> {getPrice()} </Text>
        </View>
        <View style={myStyles.headline}>
            <Text style={myStyles.stdText}>Mwst. 19%</Text>
            <Text style={[myStyles.stdText, { fontWeight: 'bold', color: Colors.UI_Light_2}]}> {getMwst()} </Text>
        </View>
        <View style={myStyles.headline}>
            <Text style={myStyles.stdText}>Rabatt</Text>
            <Text style={[myStyles.stdText, { fontWeight: 'bold', color: Colors.UI_Light_2}]}> {getDiscount()} </Text>
        </View>
        <Image style={{margin: 10}}source={require('../assets/payment/Line.png')}/>
        <View style={myStyles.headline}>
            <Text style={myStyles.h3}>Gesamt (für {getHours()})</Text>
            <Text style={[myStyles.h3, { fontWeight: 'bold', color: Colors.UI_Light_2}]}> {getSum()} </Text>
        </View> */}
                    <Pressable style={[myStyles.reserved, {justifyContent: 'flex-end'}]}
                               onPress={() => onPressOrder(this)}>
                        <Text style={myStyles.h3}>Jetzt Reservieren</Text>
                        <Image style={{margin: 10}} source={require('../assets/payment/mail-send.png')}/>
                    </Pressable>
                </View>
            </ScrollView>
            <BikeNest_NavigationFooter/>
        </View>
    )
}

const myStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    paymentContainer: {
        flex: 1,
        padding: 15,
        marginTop: 30,
    },
    h2: {
        fontSize: 27,
        letterSpacing: 2,
        fontWeight: "400",
    },
    h3: {
        fontSize: 18,
        fontWeight: "300",
    },
    stdText: {
        fontSize: 14,
    },
    divider: {
        marginLeft: -15,
        marginTop: 10,
        marginBottom: 10,
        width: 500,
    },
    headline: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reserved: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    zahlungsmethode: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        width: 328,
        height: 55,
        borderRadius: 38,
        margin: 9,
        backgroundColor: Colors.UI_Light_4
    },
    btnPress: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        width: 328,
        height: 55,
        borderRadius: 38,
        margin: 9,
        backgroundColor: Colors.UI_Light_4,
        borderColor: Colors.UI_Light_3,
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    buttonImage: {
        alignSelf: 'center'
    },
    halfButton: {
        width: 150,
        height: 55,
        color: Colors.UI_Light_3,
        backgroundColor: Colors.UI_Light_4,
        borderRadius: 38,
        margin: 10,
        padding: 15,
    }
})
