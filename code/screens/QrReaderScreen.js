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
import {LockService} from "../services/LockService";

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
    let lockService = new LockService();

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
        console.log("Barcode Detected: " + data);
        await setScanned(true);

        //Calls two endpoints and once the result of both is there, goes into the then branch
        Promise.all([reservationService.getReservationsByQr(data), bookingService.getBookingsByQr(data)])
            .then((values) => {
                const reservations = values[0]
                const bookings = values[1];
                console.log('RESERVATIONS:' + JSON.stringify(reservations));
                console.log('BOOKINGS:' + JSON.stringify(bookings));
                //Check reservations first
                for (let ind in reservations) {
                    let res = reservations[ind];
                    console.log(JSON.stringify(res))
                    if (!compareDates(res.reservationStart) && compareDates(res.reservationEnd) && !res.used
                        && !res.cancelled) {
                        //Unlock the Bikenest to deliver the bike
                        console.log("Found a valid Reservation!");
                        return lockService.deliverUnlock(res.id, data)
                            .then(booking => {return () => navigation.navigate("LockDelivered", {bookingId: booking.id, spotNumber: booking.bikespotNumber})});
                    }
                }

                for (let ind in bookings) {
                    let booking = bookings[ind];
                    if (booking.deliveredBike !== null && booking.tookBike === null) {
                        //Unlock the Bikenest to take the bike
                        console.log("Found a valid booking!");
                        return lockService.takeUnlock(booking.id, data)
                            .then(result => { return () => navigation.navigate("LockTaken", {bookingId: result.id, spotNumber: result.bikespotNumber})});
                    }
                }

                //No suitable reservation or booking found -> error
                throw {display: true, message: "Du hast weder eine valide Reservierung, noch hast du ein Fahrrad in diesem Bikenest abgestellt."}
            }).then(continueFunc => {
                console.log('CONTINUE FUNC!');
                setTimeout(continueFunc, 500);
        })
            .catch(error =>{
                if(error.display){
                    alert(error.message);
                    navigation.navigate("FindBikeNest");
                }
            });
    };

    return (
        <View style={styles.container}>
            {hasCameraPermission === null ? (
                <Text>Requesting for camera permission</Text>
            ) : hasCameraPermission === false ? (
                <Text style={{color: '#000'}}>
                    Camera permission is not granted
                </Text>
            ) : (
                <View
                    style={{
                        backgroundColor: 'white',
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    {
                        scanned !== true ?
                        //If the QR Code has not been scanned, we show a information text
                            <Text style={styles.topBar}>
                                QR Code wird gescanned...
                            </Text>
                            :
                            <Text style={[styles.urlText, styles.topBar]}>
                                QR Code erfolgreich gescanned.
                            </Text>
                    }
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
        topBar: {
            position: 'absolute',
            flex: 1,
            top: 0,
            left: 0,
            right: 0,
            padding: 15,
            flexDirection: 'row',
            fontSize: 20,
            margin: 20
        },
    }
);
