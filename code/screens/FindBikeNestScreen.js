import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { getDistance } from 'geolib';
// import { markers } from '../tools/mapData'
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
import global from '../components/GlobalVars';
import { BikenestService } from "../services/BikenestService";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 3.5;
const MODAL_HEIGHT = height * 0.85;
const CARD_WIDTH = width * 0.8;
const spacing_for_card_inset = width * 0.1 - 10;

export default function FindBikeNestScreen({ navigation }) {
  let bikenestService = new BikenestService();

  const initMarker = [{
    coordinate: {
      latitude: 49.46,
      longitude: 11.07
    },
    description: "This is Bikenest 1",
    capacity: 12,
    image: require("../assets/bike_nest.png"),
    color: "#FFD700",
    id: 1,
    chargingOptionAvailable: true,
  }];

  // states, each state change re-renders scene
  const [displayState, setDisplayState] = useState('flex');
  // const [location, setLocation] = useState(null);
  const [stateMarkers, setMarkers] = useState(initMarker);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);
  // const [cardMarkers, setCardMarkers] = useState(initMarker);
  const [distances, setDistances] = useState([-1]);

  // const [isLoggedIn, setLogin] = useState(false);
  const [modalState, setModalState] = useState(false);
  const _map = useRef(null);
  const _scrollView = useRef(null);
  let mapAnimation = new Animated.Value(0);

  const region = {
    latitude: 49.46,
    longitude: 11.07,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08
  };

  const getMarkers = async () => {
    const MarkersFromServer = await fetchMarkers();
    populateMarkers(MarkersFromServer);
  };

  useEffect(() => {
    getMarkers();
  }, []);

  const fetchMarkers = async (id) => {
    const res = await fetch(global.globalIPAddress + "/bikenest/all");
    // console.log(res);
    const data = await res.json();
    return data;
  };

  const populateMarkers = (fetchedMarkers) => {
    let tempMarkers = [];
    for (const marker of fetchedMarkers) {
      tempMarkers.push({
        coordinate: {
          latitude: parseFloat(marker.gpsCoordinates.split(",")[0]),
          longitude: parseFloat(marker.gpsCoordinates.split(",")[1])
        },
        address: marker.name,
        capacity: marker.currentSpots,
        image: require("../assets/bike_nest.png"),
        color: getColor(marker.currentSpots),
        id: marker.id,
        chargingOptionAvailable: marker.chargingAvailable,
      });
    }
    // setCardMarkers(tempMarkers);
    console.log(tempMarkers);
    setMarkers(tempMarkers);
  };

  function getColor(capacity) {
    let color = "";
    if (capacity < 1) { color = "#CD5C5C" } else
      if (capacity < 4) { color = "#EA8B60" } else
        if (capacity < 7) { color = "#FFD700" } else { color = "#8FBC8F"; }
    return color;
  }

  //  asks for user location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      } else {
        let location = await Location.getCurrentPositionAsync({});
        let localdistances = [];
        stateMarkers.map((marker, index) => {
          localdistances.push(getDistanceToUser(marker, location));
        });
        setDistances(localdistances);
        console.log("statechange");
      }
    })();
  }, []);

  // compute scaling of markers
  // var interpolations = stateMarkers.map((marker, index) => {
  //   const inputRange = [
  //     (index - 1) * (CARD_WIDTH * 1.06),
  //     (index) * (CARD_WIDTH * 1.06),
  //     ((index + 1) * (CARD_WIDTH * 1.06))
  //   ];

  //   const scale = mapAnimation.interpolate({
  //     inputRange,
  //     outputRange: [0.9, 1.4, 0.9],
  //     extrapolate: 'clamp'
  //   });

  //   return { scale };
  // });

  // let tempInterp = [...interpolations];
  // var swapArrayElements = function (arr, indexA, indexB) {
  //   var tempArr = [...arr];
  //   var temp = tempArr[indexA];
  //   tempArr[indexA] = tempArr[indexB];
  //   tempArr[indexB] = temp;
  //   return tempArr;
  // };
  // tempInterp = swapArrayElements(tempInterp, 0, modalData.CurrentMarkerIndex);

  const getDistanceToUser = (userMarker, location_) => {
    const distance = getDistance(
      { latitude: userMarker.coordinate.latitude, longitude: userMarker.coordinate.longitude },
      { latitude: location_.coords.latitude, longitude: location_.coords.longitude }
    );

    return distance;
  };

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      if (/*value % 1 !== 0 && */value !== 0) {
        let index = Math.floor(value / (CARD_WIDTH * 1.06)); // 
        if (index >= stateMarkers.length) {
          index = stateMarkers.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
        clearTimeout(regionTimeout);
        const regionTimeout = setTimeout(() => {
          if (currentMarkerIndex !== index) {
            const { coordinate } = stateMarkers[index];
            //console.log("Markerindex: " + index);
            setCurrentMarkerIndex(index);
            _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta
              },
              200
            );
          }
        }, 10);
      }
    });
  });

  // moves cards at the bottom of screen
  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - spacing_for_card_inset;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });

  }

  const onCardPress = (index, currentMarkerId) => {
    if (!modalState) {
      console.log("CurrentMarkerID: " + currentMarkerId + "    index: " + index);
      bikenestService.getBikenestInfo(currentMarkerId).then((response) => {
        stateMarkers[index].capacity = response.spotsLeft;
        stateMarkers[index].chargingOptionAvailable = response.chargingOptionAvailable;
        stateMarkers[index].address = response.bikenestName;
      }).then(() => setModalState(!modalState));
    }
    else {
      getMarkers().then(setModalState(!modalState));
    }

  };

  const proceedBooking = () => {
    setModalState(!modalState);
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
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/bike_location_small.png')}
                  // style={[styles.marker, scaleStyle]}
                  style={[styles.marker, { width: currentMarkerIndex === index ? 60 : 20 }]}
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
        visible={modalState}
        onRequestClose={() => {
          console.log("id: " + stateMarkers[currentMarkerIndex].id);
          onCardPress(currentMarkerIndex, stateMarkers[currentMarkerIndex].id);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: stateMarkers[currentMarkerIndex].color }, { alignItems: 'center' }]}>
            <Text numberOfLines={1} style={styles.cardtitle}>Ich befinde mich in der Straße:</Text>
            <Text>{stateMarkers[currentMarkerIndex].address} </Text>
            <Text style={styles.cardDescription}>Lade Optionen: <B>{stateMarkers[currentMarkerIndex].chargingOptionAvailable ? "Ja" : "Nein"}</B></Text>
            <Text numberOfLines={1} style={styles.cardtitle}>Entfernung: {distances[currentMarkerIndex] / 1000} Km</Text>
            <Text numberOfLines={1} style={styles.cardDescription}>In diesem Bikenest sind <B>{stateMarkers[currentMarkerIndex].capacity}</B> Plätze frei</Text>
            <Text>{ }</Text>
            <View style={styles.button}>
              <TouchableOpacity
                style={[styles.signIn, {
                  borderColor: '#FFF',
                  borderWidth: 1
                }]}
                onPress={() => onCardPress(currentMarkerIndex, stateMarkers[currentMarkerIndex].id)}
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
        {console.log("Distances vor map " + distances)}
        { /*isLoggedIn &&*/ stateMarkers.map((marker, index) => (
          <View style={[styles.card, { backgroundColor: marker.color, display: displayState }]} key={index}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode='cover'
            />
            <View style={styles.textContent}>
              {console.log("Test render" + distances[index])}
              {distances[0] !== -1 ? <Text numberOfLines={1} style={styles.cardtitle}>{marker.address},  {distances[index] / 1000} Km</Text> : <Text></Text>}
              <Text numberOfLines={1} style={styles.cardDescription}>In diesem Bikenest sind <B>{marker.capacity}</B> Plätze frei</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('Booking')}
                  onPress={() => onCardPress(currentMarkerIndex, stateMarkers[currentMarkerIndex].id)}
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
