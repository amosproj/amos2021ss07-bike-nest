import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { getDistance } from 'geolib';
import { markers } from '../tools/mapData'
import * as Location from 'expo-location';
import {
  StyleSheet,
  Alert,
  Modal,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 3.5;
const MODAL_HEIGHT = height * 0.85;
const CARD_WIDTH = width * 0.8;
const spacing_for_card_inset = width * 0.1 - 10;

export default function FindBikeNestScreen({ navigation }) {

  const modalInitData = {
    CurrentMarkerIndex: 0,
    modalState: false
  }
  // states, each state change re-renders scene
  const [displayState, setDisplayState] = useState('flex');
  // const [location, setLocation] = useState(null);
  const [stateMarkers, setState] = useState(markers);
  const [distances, setDistances] = useState([0, 0, 0, 0]);
  // const [isLoggedIn, setLogin] = useState(false);
  const [modalData, setModalVisible] = useState(modalInitData);
  const _map = useRef(null);
  const _scrollView = useRef(null);
  let mapIndex = 0;

  let mapAnimation = new Animated.Value(0);
  const region = {
    latitude: 49.46,
    longitude: 11.07,
    latitudeDelta: 0.06,
    longitudeDelta: 0.04
  }

  //  asks for user location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      } else if (distances != [0, 0, 0, 0]) {
        let location = await Location.getCurrentPositionAsync({});
        let localdistances = []
        stateMarkers.map((marker, index) => {
          localdistances.push(getDistanceToUser(marker, location));
        });
        setDistances(localdistances);
        //  setLocation(location);
      }
    })();
  }, []);

  // compute scaling of markers
  const interpolations = stateMarkers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      (index) * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH)
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.4, 1],
      extrapolate: 'clamp'
    });
    return { scale };
  });

  const getDistanceToUser = (userMarker, location_) => {

    const distance = getDistance(
      { latitude: userMarker.coordinate.latitude, longitude: userMarker.coordinate.longitude },
      { latitude: location_.coords.latitude, longitude: location_.coords.longitude },
    );

    return distance;
  }

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= stateMarkers.length) {
        index = stateMarkers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = stateMarkers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta
            },
            300
          );
        }
      }, 10);
    });
  });

  // moves cards at the bottom of screen
  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    //  if(!isLoggedIn){setLogin(true);}

    // stateArr = [...stateMarkers];
    // console.log('setting markers')
    // setState(stateArr.concat(stateArr.splice(0, markerID)))

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - spacing_for_card_inset;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });

  }

  const onCardPress = (index) => {
    // const markerID = mapEventData._targetInst.return.key;
    let markerID = index;
    let tempModalData = { ...modalData };
    tempModalData.CurrentMarkerIndex = markerID;
    tempModalData.modalState = !tempModalData.modalState;
    // update state here
    // modalData.map((markerID) => {
    //   arrayvar: [...prevState.arrayvar]
    // })

    setModalVisible(tempModalData);
  };

  const proceedBooking = () => {
    let tempModalData = { ...modalData };
    tempModalData.modalState = false;
    setModalVisible(tempModalData);
    navigation.navigate('Booking');
  };

  // currently not used, hides cards at the bottom of screen
  // const onMapPress = (mapEventData) => {
  //   if (isplayState !== ("none")) { setDisplayState("none"); }
  // }

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={region}
        showsUserLocation={true}
        style={styles.container}
      // onPress={(e) => onMapPress(e)}
      >
        {stateMarkers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale
              }
            ]
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/bike_location_small.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode='center'
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalData.modalState}
        onRequestClose={() => {
          onCardPress(0);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: stateMarkers[modalData.CurrentMarkerIndex].color }, { alignItems: 'center' }]}>
            <Text style={styles.modalText}>{stateMarkers[modalData.CurrentMarkerIndex].title}</Text>
            <Text numberOfLines={1} style={styles.cardtitle}>Ich befinde mich in der XYZ Straße</Text>
            <Text style={styles.cardDescription}>Lade Optionen: <B>Ja</B></Text>
            <Text numberOfLines={1} style={styles.cardtitle}>Entfernung: {distances[modalData.CurrentMarkerIndex] / 1000} Km</Text>
            <Text numberOfLines={1} style={styles.cardDescription}>In diesem Bikenest sind <B>{stateMarkers[modalData.CurrentMarkerIndex].capacity}</B> Plätze frei</Text>
            <Text>{}</Text>
            <View style={styles.button}>
              <TouchableOpacity
                style={[styles.signIn, {
                  borderColor: '#FFF',
                  borderWidth: 1
                }]}
                onPress={() => onCardPress(0)}
              >
                <Text style={styles.textStyle}>Zurück</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => proceedBooking()}
                style={[styles.signIn, {
                  borderColor: '#FFF',
                  borderWidth: 1
                }]}
              >
                <Text style={styles.textSign}>Ich möchte Buchen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment='center'
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: spacing_for_card_inset,
          bottom: 0,
          right: spacing_for_card_inset
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? spacing_for_card_inset : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation
                }
              }
            }
          ],
          { useNativeDriver: true }
        )}
      >
        { /*isLoggedIn &&*/ stateMarkers.map((marker, index) => (
          <View style={[styles.card, { backgroundColor: marker.color, display: displayState }]} key={index}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode='cover'
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title},  {distances[index] / 1000} Km</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>In diesem Bikenest sind <B>{marker.capacity}</B> Plätze frei</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('Booking')}
                  onPress={() => onCardPress(index)}
                  style={[styles.signIn, {
                    borderColor: '#FFF',
                    borderWidth: 1
                  }]}
                >
                  <Text style={styles.textSign}>Zur Buchung</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { }}
                  style={[styles.signIn, {
                    borderColor: '#FFF',
                    borderWidth: 1
                  }]}
                >
                  <Text style={styles.textSign}>Bring mich hin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
      <BikeNest_NavigationFooter />
    </View >
  );
}

const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  image: {
    width: 120,
    height: 80
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 50
  },
  marker: {
    width: 30,
    height: 40
  },
  card: {
    // padding: 10,
    elevation: 1,
    //  backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    marginBottom: 70,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden'
  },
  cardImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  cardtitle: {
    fontSize: 13,
    // marginTop: 5,
    fontWeight: "bold",
    textAlign: "justify",
  },
  cardDescription: {
    fontSize: 14,
    color: "#444",
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  signIn: {
    // width: '100%',
    padding: 5,
    borderRadius: 3,
    // backgroundColor: '#FFF',
  },
  textSign: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalView: {
    margin: 20,
    height: MODAL_HEIGHT,
    borderRadius: 0,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
