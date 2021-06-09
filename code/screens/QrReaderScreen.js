//////////
// This screen is placed in HistoryScreen.js
//////////
import React, { useEffect, useState } from 'react';
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
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BookingService } from '../services/BookingService';
import moment from "moment";

export default function QrReaderScreen ({ navigation }) {
  const [hasCameraPermission, setPermission] = useState(false);
  const [lastScannedUrl, setlastScannedUrl] = useState('Warte auf Scan ...');
  const [scanned, setScanned] = useState(false);
  let bookingService = new BookingService();

  // Logic of authorization checking
  const checkBooking = (userBikenestSpot) => {
    bookingService.getAllReservations().then(reservations => {
      let proceedWithUnlock = false;

      // check if reservation exists
      if (reservations.length < 1) {
        Alert.alert(
          'no reservation',
          'Keine Buchung vorhanden! Bitte Buchen Sie einen Platz im Bikenest.',
          [
            {
              text: 'Zur Karte',
              onPress: () => navigation.navigate('FindBikeNest')
            }
          ],
          { cancellable: false }
        );
        return;
      }
      let lastRes = reservations[reservations.length - 1];

      // check if user at right location
      if (userBikenestSpot !== lastRes['bikenestId']) {
        Alert.alert(
          'wrong nest',
          'Sie sind am falschen Bikenest Bikenest. Ihr Reservierter Platz befindet sich an Bikenest Nummer: ' + lastRes['bikenestId'],
          [
            {
              text: 'Zur Karte',
              onPress: () => navigation.navigate('FindBikeNest')
            }
          ],
          { cancellable: false }
        );
        return;
      }

      // check if user is allowed to enter and redirect to unlock screen
      if (checkActualFields(lastRes)) {
        console.log('fieldcheck passed');
        proceedWithUnlock = true;
      } else if (compareDates(lastRes['reservationEnd'])) {
        console.log('datecheck passed');
        proceedWithUnlock = true;
      }
      if (proceedWithUnlock) {
        navigation.navigate('Lock');
      }
    }).catch(error => {
      console.error('Error with pulling reservations: ' + JSON.stringify(error));
    });
  };

  const checkActualFields = (res) => {
    let checkPassed = false;

    let actualStart = res['actualStart'];
    let actualEnd = res['actualEnd'];
    if (actualEnd === null && actualStart !== null) {
      checkPassed = true;
    }
    return checkPassed;
  };

  const compareDates = (dateString) => {
    let checkPassed = false;

    let today = moment().format();
    // today = today.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
    let endDateOfBooking = moment(dateString).format();

    console.log(today);
    console.log(endDateOfBooking);

    if (today < endDateOfBooking) {
      checkPassed = true;
    }
    return checkPassed;
  };

  useEffect(() => {
    (async () => {
      // let { status } = await Permissions.askAsync(Permissions.CAMERA);
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('no permission log');
        Alert.alert('Zugriff auf Kamera verweigert..');
      } else {
        setPermission(true);
      }
    })();
  }, []);

  // gets called on scan
  const handleBarCodeRead = async ({ type, data }) => {
    if (data !== lastScannedUrl) {
      LayoutAnimation.spring();
      setlastScannedUrl(data);
      setScanned(true);
      data = JSON.parse(data);
      checkBooking(data['spot']);
    }
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
      {hasCameraPermission === null ? (
        <Text>Requesting for camera permission</Text>
      ) : hasCameraPermission === false ? (
        <Text style={{ color: '#fff' }}>
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

      {maybeRenderUrl()}

      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 20
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
});
