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
  Linking ,
} from "react-native";
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import global from '../components/GlobalVars';
import { BikenestService } from "../services/BikenestService";
import BikeNest_Modal from '../components/BikeNest_Modal';
import BikeNest_Button, { ButtonStyle } from '../components/BikeNest_Button';
import { mainStyles } from '../styles/MainStyles';
import colors from '../styles/Colors';

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
  // const [location, setLocation] = useState(null);
  const [reload, setReload] = useState(false);
  const [stateMarkers, setMarkers] = useState(initMarker);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);
  const [distances, setDistances] = useState([-1]);
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
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
      } else {
        console.log("got location");
      }
    })();
  }, []);

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
        chargingOptionAvailable: marker.chargingAvailable
      });
    }
    getLocationAsync(tempMarkers);
  };

  const getLocationAsync = async (tempMarkers) => {
    let location = await Location.getCurrentPositionAsync({});
    console.log("location: "+ location);
    let localdistances = [];
    tempMarkers.map((marker, index) => {
      localdistances.push(getDistanceToUser(marker, location));
    });
    setDistances(localdistances);
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
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert('Permission to access location was denied');
  //     } else {
  //       let location = await Location.getCurrentPositionAsync({});
  //       let localdistances = [];
  //       stateMarkers.map((marker, index) => {
  //         localdistances.push(getDistanceToUser(marker, location));
  //       });
  //       setDistances(localdistances);
  //       console.log(localdistances);
  //     }
  //   })();
  // }, [stateMarkers]);
  
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
        let index = Math.round(value / (CARD_WIDTH * 1.06));
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
            setCurrentMarkerIndex(index);
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

    _scrollView.current.scrollTo({ x: x, y: 0, animated: false });
  };

  const onCardPress = (index, currentMarkerId) => {
    if (!modalState) {
      console.log("ungleich modal state")
      bikenestService.getBikenestInfo(currentMarkerId).then((response) => {
        stateMarkers[index].capacity = response.spotsLeft;
        stateMarkers[index].chargingOptionAvailable = response.chargingOptionAvailable;
        stateMarkers[index].address = response.bikenestName;
      }).then(() => setModalState(!modalState));
    }
    else {
      console.log("else state")
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
                  style={[styles.marker, { width: currentMarkerIndex === index ? 60 : 20 }]}
                  resizeMode='center'
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <BikeNest_Modal
        isVisible={modalState}
        onRequestClose={() => {
          onCardPress(currentMarkerIndex, stateMarkers[currentMarkerIndex].id);
        }}
        content={
          <View style={[mainStyles.modalContentContainer, { backgroundColor: stateMarkers[currentMarkerIndex].color, width: 360, height: 280 }]}>
            <Text style={mainStyles.h3}>{stateMarkers[currentMarkerIndex].address} </Text>
            <Text style={mainStyles.stdText}>Lade Optionen: <B>{stateMarkers[currentMarkerIndex].chargingOptionAvailable ? "Ja" : "Nein"}</B></Text>
            <Text numberOfLines={1} style={mainStyles.stdText}>Entfernung:<B> {distances[currentMarkerIndex] / 1000} Km</B></Text>
            <Text numberOfLines={1} style={mainStyles.stdText}>In diesem Bikenest sind <B>{stateMarkers[currentMarkerIndex].capacity}</B> Plätze frei</Text>
            <Text>{ }</Text>
            <View style={styles.button}>
              <BikeNest_Button
                type={ButtonStyle.small}
                text="Zurück"
                onPress={() => onCardPress(currentMarkerIndex, stateMarkers[currentMarkerIndex].id)}
              />
              <BikeNest_Button
                type={ButtonStyle.medium}
                text="Ich möchte Buchen"
                onPress={() => proceedBooking()}
              />
            </View>
          </View>}
      >
      </BikeNest_Modal>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={5}
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
        {stateMarkers.map((marker, index) => (
          <View style={[styles.card, { backgroundColor: marker.color }]} key={index}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode='cover'
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.address}</Text>
              {distances.length > 1 ? <Text>Entfernung:  <B>{(distances[index] / 1000).toFixed(2).toLocaleString()} Km </B></Text> : <Text></Text>}
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
                  onPress={() => { Linking.openURL('https://www.google.com/maps/dir//' + stateMarkers[currentMarkerIndex].coordinate.latitude + ',' + stateMarkers[currentMarkerIndex].coordinate.longitude) }}
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
