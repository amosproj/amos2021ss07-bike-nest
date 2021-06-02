import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QrReaderScreen ({ navigation }) {
  const [hasCameraPermission, setPermission] = useState(false);
  const [lastScannedUrl, setlastScannedUrl] = useState('Warte auf Scan ...');
  const [scanned, setScanned] = useState(false);

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

  const handleBarCodeRead = ({ type, data }) => {
    console.log('barcode red');
    if (data !== lastScannedUrl) {
      LayoutAnimation.spring();
      setlastScannedUrl(data);
      setScanned(true);
    }
  };

  const handlePressUrl = () => {
    console.log('handling press');
    Alert.alert(
      'URL öffnen?',
      lastScannedUrl,
      [
        {
          text: 'Ja',
          onPress: () => Linking.openURL(lastScannedUrl)
        },
        { text: 'Nein', onPress: () => {} }
      ],
      { cancellable: false }
    );
  };

  const handlePressCancel = () => {
    setlastScannedUrl('Warte auf Scan ...');
    setScanned(false);
  };

  const maybeRenderUrl = () => {
    // if (!lastScannedUrl) {
    //   return;
    // }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handlePressCancel}>
          <Text style={styles.cancelButtonText}>Erneut scannen</Text>
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
