import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Dimensions } from "react-native";
import Colors from '../styles/Colors';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { mainStyles } from "../styles/MainStyles";
import { ScrollView } from 'react-native';
import BikeNest_Modal from '../components/BikeNest_Modal';
import BikeNest_TextInput from '../components/BikeNest_TextInput';
import BikeNest_CheckBox from '../components/BikeNest_CheckBox';
import { ReservationService } from "../services/ReservationService";
import { pink } from 'color-name';
import { PaymentService } from '../services/PaymentService';
import { resolveDiscoveryAsync } from 'expo-auth-session';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function PaymentScreen({ route, navigation }) {
    let reservationService = new ReservationService();
    let paymentService = new PaymentService();

    const [iban, setIBAN] = useState("");
    const [bic, setBIC] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalHeadline, setModalHeadline] = useState("");
    const [paymentText, setPaymentText] = useState("Mit der Reservierung bestätige Ich, dass meine Kontodaten für zukünftige Zahlungen von BIKENEST belastet werden dürfen.*");

    const [paymentVisible, setPaymentVisible] = useState(true);

    let bikenest = route.params.state;
    let bikenestName = route.params.name;
    let selectedSlots = route.params.slots;
    let selectedTime = route.params.time;
    let selectedEbike = route.params.ebike;
    let estimatedPrice = route.params.price;

    useEffect(() => { 
        paymentService.getIban().then((response) => {
            console.log("Get Iban repsonse: " + response.iban);
            setIBAN(response.iban);
            setPaymentText("Du hast bereits eine IBAN hinterlegt, um diese zu ändern gehe bitte in deine Profileinstellungen");
            setPaymentVisible(false);
        }).catch(error => {
            console.log("Error while getting IBAN: " + error);
            setPaymentVisible(true);
        });
    });

    let tryCreateBooking = (bikenestId) => {

        reservationService.createReservation(bikenestId, 30)
            .then(reservation => {
                //Forward to Reservation Success also providing the bikenest, and the bikespot Number
                navigation.navigate("ReservationSuccess", {
                    state: bikenest, name: bikenestName,
                    bikespotNumber: reservation.bikespotNumber
                });
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

    let trySetIBAN = (iban) => {
                // Demo how to use it
        // paymentService.createPayment("22BuchstabenMussNeIban").then((response) => {
        //     console.log("Set Iban response" + response);
        // }).then(() => {
        //     paymentService.getIban().then((response) => {
        //         console.log("Get Iban repsonse: " + response);
        //     })
        // })
        paymentService.createPayment(iban).then((response) => {
            console.log("Set Iban response" + response);
            setPaymentVisible(false);
        }).catch(error => {
            console.log("Error while setting IBAN: " + error);
            setPaymentVisible(true);
        });
    }

    const onPressInfo = () => {
        //zurück zu Find Bike Nest  
        alert('Info', 'Du kannst hier deinen BIKE NEST Spot buchen. Wenn du dein Fahrrad wieder abholst werden wir dir die benutzte dauer über deine ausgewählte Zahlungsmethode berechnen.');
    };

    const onPressOrder = () => {
        // if()
        trySetIBAN(iban);
        tryCreateBooking(bikenest.id);
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
    const getSum = () => {
        return (estimatedPrice);
    };
    const validateIBAN = (text) => {
        // Die IBAN-Prüfziffer besteht aus zwei Ziffern an den Positionen 3 und 4 der IBAN.
        // Sie wird nach dem MOD97-Algorithmus berechnet und stellt die primäre Integritätsprüfung für den IBAN-Standard dar.
        
        setIBAN(text);
    }
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
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={myStyles.h2}>
                            Meine Reservierung <Image onPress={() => onPressInfo(this)}
                                source={require('../assets/payment/info.png')} />
                        </Text>
                    </View>
                    <View style={myStyles.headline}>
                        <Text style={myStyles.h3}> Details </Text>
                        <Text style={[myStyles.h3, { fontWeight: 'bold' }]}
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
                        <Image source={require('../assets/payment/clock.png')} style={{ margin: 10 }} />
                        <Text style={[myStyles.stdText, { color: Colors.UI_Light_2 }]}>
                            Reserviert für 30min
                        </Text>
                    </View>
                    <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider} />
                    <View style={myStyles.headline}>
                        <Text style={myStyles.h3}> Zahlungsmethode{"\n"}</Text>
                        <View style={myStyles.images}>
                            <Image style={[{ maxWidth: 45, maxHeight: 50, resizeMode: 'contain' }]}
                                source={require('../assets/payment/mc_vrt_opt_pos_45_1x.png')}></Image>
                            <Image style={[{ maxWidth: 35, maxHeight: 50, resizeMode: 'contain' }]}
                                source={require('../assets/payment/logo_girocard_mit_rand_hochformat_rgb.png')}></Image>
                        </View>
                    </View>
                    <View style={[myStyles.images]}>

                    </View>

                    <View style={myStyles.zahlungsmethode}>
                    {paymentVisible ?
                    (
                        <BikeNest_TextInput
                            placeholder='IBAN'
                            onChangeText={(text) => validateIBAN(text)}
                        />
                    ) : null}
                        {/* <BikeNest_TextInput
                            placeholder='BIC'
                            onChangeText={(text) => setBIC(text)}
                        /> */}
                        
                        <Text>{paymentText}</Text>
                        {paymentVisible ?
                       (   
                            <BikeNest_CheckBox
                                onPressText={() => Alert.alert("Lorem ipsum")}
                                toggleText={"SEPA-Lastschriftmandat akzeptieren"}
                                initialValue={false} />
                        ) : null}
                    </View>
      
                    <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider} />
                    <View style={[myStyles.headline, { marginTop: 10, marginBottom: 10 }]}>
                        <Text style={myStyles.h3}>Geschätzter Preis</Text>
                        <Text style={[myStyles.h3, {
                            fontWeight: 'bold',
                            color: Colors.UI_Light_2
                        }]}> ~{getSum()}€ </Text>
                    </View>
                    {/* <View style={[myStyles.headline, {marginTop: 10, marginBottom: 10}]}>
                        <Text style={myStyles.h3}>Gesamt (für {getHours()})</Text>
                        <Text
                            style={[myStyles.h3, {fontWeight: 'bold', color: Colors.UI_Light_2}]}> ~{getSum()}€ </Text>
                    </View> */}
                    <Pressable style={[myStyles.reserved, { justifyContent: 'flex-end' }]}
                        onPress={() => onPressOrder(this)}>
                        <Text style={myStyles.h3}>Jetzt Reservieren</Text>
                        <Image style={{ margin: 10 }} source={require('../assets/payment/mail-send.png')} />
                    </Pressable>
                    {paymentVisible ?
                    (
                    <Text>*Innerhalb von 14 Tagen können sie diese Einwilligung zurück ziehen. Schreiben Sie dafür unserem Kundenservice.</Text>
                    ):null}
                </View>
            </ScrollView>
            <BikeNest_NavigationFooter />
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
        justifyContent: 'space-evenly',
        alignSelf: 'auto',
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
    images: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
