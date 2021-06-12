//////////
// This screen is placed in HistoryScreen.js
//////////
import React, {useEffect, useState} from 'react';
import {
    Alert,
    Dimensions,
    LayoutAnimation,
    Text,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {BookingService} from '../services/BookingService';
import moment from "moment";
import {ReservationService} from "../services/ReservationService";

/**
 * Starts the QrReaderScreen that is used to open a Bikenest.
 * It will read the QR Code and ask the Backend if there are any ongoing Reservations or Bookings for this Bikenest.
 * If there are, there is another Request made to the Backend, that will actually open the Bikenest.
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
export default function QrReaderScreen({navigation}) {
    const [hasCameraPermission, setPermission] = useState(false);
    const [lastScannedUrl, setlastScannedUrl] = useState('Warte auf Scan ...');
    const [scanned, setScanned] = useState(false);
    let bookingService = new BookingService();
    let reservationService = new ReservationService();

    //TODO: The Backend assumes, that there will not be more than one reservation/booking for each bikenest
    //Therefore the first found reservation/booking for the scanned bikenest will be used to open the cage

    const compareDates = (dateString) => {
        let today = moment().format();
        // today = today.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
        let endDateOfBooking = moment(dateString).format();

        console.log(today);
        console.log(endDateOfBooking);

        if (today < endDateOfBooking) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        (async () => {
            // let { status } = await Permissions.askAsync(Permissions.CAMERA);
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('no permission log');
                Alert.alert('Zugriff auf Kamera verweigert..');
            } else {
                setPermission(true);
            }
        })();
    }, []);

    // gets called on scan
    const handleBarCodeRead = async ({type, data}) => {
        await setScanned(true);
        console.log(data);
        reservationService.getReservationsByQr(data)
            .then(reservations => {
                for(let ind in reservations){
                    let res = reservations[ind];
                    console.log(JSON.stringify(res))
                    if(!compareDates(res.reservationStart) && compareDates(res.reservationEnd) && !res.used
                        && !res.cancelled){
                        //Unlock the Bikenest to deliver the bike
                        console.log("Doing unlock call for reservation now!");

                        navigation.navigate("LockDelivered");
                        return;
                    }
                }

                //If no reservation matches, check bookings
                bookingService.getBookingsByQr(data)
                    .then(bookings => {
                        for(let ind in bookings){
                            let booking = bookings[ind];
                            if(booking.deliveredBike !== null && booking.tookBike === null){
                                //Unlock the Bikenest to take the bike
                                console.log("doin unlock call for booking now!");

                                navigation.navigate("LockTaken");
                                return;
                            }
                        }

                        alert("Sie haben für dieses Bikenest keine Reservierung / kein Fahrrad abgestellt.");
                        navigation.navigate("FindBikeNest");
                    })
                    .catch(error => {
                        if (error.display) {
                            alert(error.message);
                            navigation.navigate('FindBikeNest');
                        }
                    })
            })
            .catch(error => {
                if (error.display) {
                    alert(error.message);
                    navigation.navigate('FindBikeNest');
                }
            })
    };

    // gets called on url press
    // const handlePressUrl = () => {
    //   Alert.alert(
    //     'URL öffnen?',
    //     lastScannedUrl,
    //     [
    //       {
    //         text: 'Ja',
    //         onPress: () => Linking.openURL(lastScannedUrl)
    //       },
    //       { text: 'Nein', onPress: () => {} }
    //     ],
    //     { cancellable: false }
    //   );
    // };

    // gets called on cancel
    const handlePressCancel = () => {
        console.log('Zurück pressed');
        setScanned(false);
        setlastScannedUrl('Warte auf Scan ...');
        // navigation.navigate('QrReaderScreen');
    };

    const maybeRenderUrl = () => {
        // if (!lastScannedUrl) {
        //   return;
        // }

        return (
            <View style={styles.bottomBar}>
                <Text numberOfLines={1} style={styles.urlText}>
                    {lastScannedUrl}
                </Text>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handlePressCancel}>
                    <Text style={styles.cancelButtonText}>Zurück</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {scanned == true ?
                <Text style={styles.urlText}>
                    QR Code wurde gescanned.
                </Text>
                :
                <View></View>
            }
            {hasCameraPermission === null ? (
                <Text>Requesting for camera permission</Text>
            ) : hasCameraPermission === false ? (
                <Text style={{color: '#fff'}}>
                    Camera permission is not granted
                </Text>
            ) : (
                <View
                    style={{
                        backgroundColor: 'black',
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeRead}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            )}

            <StatusBar hidden/>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000'
        },
        bottomBar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 15,
            flexDirection: 'row'
        },
        url: {
            flex: 1
        },
        urlText: {
            color: '#fff',
            fontSize: 20,
            margin:20
        },
        cancelButton: {
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        cancelButtonText: {
            color: 'rgba(255,255,255,0.8)',
            fontSize: 18
        }
    }
);
