import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Image} from 'react-native';
import { Dimensions } from "react-native";
import Colors from '../styles/Colors';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { mainStyles } from "../styles/MainStyles";
import ModalDropdown from 'react-native-modal-dropdown';
import colors from '../styles/Colors';
import { BikenestService } from "../services/BikenestService";
import { Alert } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function BookingScreen({ route, navigation }) {
  let bikenestService = new BikenestService();

  const [textSlots, setTextSlots] = React.useState();
  const [textHours, setTextHours] = React.useState();
  const [textEbike, setTextEbike] = React.useState();
  const [costSlots, setcostSlots] = React.useState();
  const [costHours, setcostHours] = React.useState();
  const [costEbike, setcostEbike] = React.useState();
  const [estimatedPrice, setEstimatedPrice] = React.useState();

  const [spotsLeft, setSpotsLeft] = React.useState(0);
  const [chargingOption, setChargingOption] = React.useState(true);
  const [bikenestName, setbikenestName] = React.useState('default Bikenest');

  let bikenest = route.params.state;
  console.log(bikenest.id);

  const fetchBikenestInfos = () => {
      bikenestService.getBikenestInfo(bikenest.id).then((response) => {
        setSpotsLeft(response.currentSpots);
        setChargingOption(response.chargingAvailable);
        setbikenestName(response.name);
      }).catch((error) => {
        console.error("getBikenest Infos Error:" + error);
     });
  };

  const onPressInfo = () => {
    //zurück zu Find Bike Nest
    alert('this is an info.');
  };
  const onPressOrder = () => {
    //weiter zu order verarbeitung
    if(textSlots != null && textHours != null && textEbike != null){
      navigation.navigate("Payment", {state: bikenest, name: bikenestName, slots: textSlots, time: textHours, ebike: textEbike, price: estimatedPrice});
    } else {
      Alert.alert("Halt", "Bitte wähle Slots, Stunden und Ebike-Option aus")
    } 
  }
  const getLocation = () => {
    fetchBikenestInfos();
    return bikenestName;
  };
  const getSelectedHours = (value) => {
    if(value == 0){
      setTextHours('1 Tag');
      setcostHours(1);
    }else if(value == 1){
      setTextHours('2 Tage');
      setcostHours(2);
    }else if(value == 2){
      setTextHours('3 Tage');
      setcostHours(3);
    }else if(value == 3){
      setTextHours('1 Monat');
      setcostHours(12);
    } else {
      setTextHours('Keine Zeit ausgewählt.');
      setcostHours(0);
    }
  }
  const getSelectedSlots = (value) => {

    if(value == 0){
      setTextSlots('1 Slot');
      setcostSlots(1);
    } else if(value == 1){
      setTextSlots('2 Slots');
      setcostSlots(2);
    } else {
      setTextSlots('Keine Slots ausgewählt.');
      setcostSlots(0);
    }
  }

  const getSelectedEbike = (value) => {
    if(value == 0){
      setTextEbike('1 E-Bike Ladestation');
      setcostEbike(5);
    } else if(value == 1){
      setTextEbike('2 E-Bike Ladestation');
      setcostEbike(10);
    } else if(value == 2){
      setTextEbike('keine E-Bike Ladestation');
      setcostEbike(0);
    } else {
      setTextEbike('kein E-bike ausgewählt.');
      setcostEbike(0);
    }
  }

  useEffect(()=>{
    let price = 0

    if(costHours != null){
      price = costHours;
    } 
    if (costHours != null && costSlots != null){
      price = (costHours*costSlots);
    } 
    if (costHours != null && costSlots != null && costEbike != null){
      price = (costHours*costSlots) + costEbike;
    }
    setEstimatedPrice(price);
     
  });
  return (
    <View style={myStyles.container}>
      <View style={myStyles.paymentContainer}>
        <View style={{alignSelf:'center'}}>
            <Text style={myStyles.h2}>
                Buchungsinformationen <Image onPress={() => onPressInfo()} source={require('../assets/payment/info.png')}/>
            </Text>
        </View>
        <View style={myStyles.headline}>
            <Text style={myStyles.h3}> Details </Text>
            <Text style={[myStyles.h3, {fontWeight: 'bold'}]} onPress={()=>navigation.navigate("FindBikeNest")}> Ändern </Text>
        </View>
        <View style={myStyles.headline}>
            <Text style={myStyles.stdText}>
              BIKE NEST {"\n"}
              {getLocation()}
            </Text>
        </View>
        <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider}/>
        <View style={myStyles.headline}>
            <Text style={myStyles.h3}> {"\n"} Zusätzliche Informationen </Text>
        </View>
       
        <View style={myStyles.headline}>
          <Text style={myStyles.h3}> Wie viele Slots? </Text>
          <ModalDropdown onSelect={(value) => getSelectedSlots(value)} options={['1 Slot', '2 Slots']} defaultValue={'Bitte wählen...'} textStyle={{fontSize: 18 }} dropdownTextStyle={{fontSize: 18}}/>
        </View>
        <View style={myStyles.headline}>
          <Text style={myStyles.h3}> Wie lange buchen? </Text>
          <ModalDropdown onSelect={(value) => getSelectedHours(value)} options={['1 Tag', '2 Tage', '3 Tage', '1 Monat']} defaultValue={'Bitte wählen...'} textStyle={{fontSize: 18 }} dropdownTextStyle={{fontSize: 18}}/>
        </View>
        <View style={myStyles.headline}>
          <Text style={myStyles.h3}> E-Bike Ladestation? </Text>
          <ModalDropdown onSelect={(value) => getSelectedEbike(value)} options={['ja, eine', 'ja, zwei', 'nein, danke']} defaultValue={'Bitte wählen...'} textStyle={{fontSize: 18 }} dropdownTextStyle={{fontSize: 18}}/>
        </View>

        <Image source={require('../assets/payment/Divider.png')} style={myStyles.divider}/>
        <View style={myStyles.headline}>
          <Text style={myStyles.h3}> Zusammenfassung</Text>
        </View>
        <View style={myStyles.headline}>
          <Text style={myStyles.stdText}>
                {"\n"} 
                BIKE NEST {"\n"}
                {getLocation()} {"\n"}
                {textSlots}{"\n"}
                {textHours}{"\n"}
                {textEbike}{"\n"}
                ~{estimatedPrice}€
              </Text>
        </View>
          {/* <Pressable style={[myStyles.reserved, {justifyContent: 'flex-end'}]}  onPress={() => getPrice(this)}>
            <Text style={myStyles.h3}>Preis Kalkulieren</Text> 
          </Pressable> */}
          <Pressable style={[myStyles.reserved, {justifyContent: 'flex-end'}]}  onPress={() => onPressOrder(this)}>
            <Text style={myStyles.h3}>Weiter</Text> 
            <Image style={{margin: 10}} source={require('../assets/payment/mail-send.png')} />
          </Pressable>
      </View>
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
  h3:{
      fontSize: 18,
      fontWeight: "300",
  },
  stdText:{
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
      fontSize: 18,
      fontWeight: "300",
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
