import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Image} from 'react-native';
import { Dimensions } from "react-native";
import Colors from '../styles/Colors';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { mainStyles } from "../styles/MainStyles";
import ModalDropdown from 'react-native-modal-dropdown';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function BookingScreen({ navigation }) {
  const [textSlots, setTextSlots] = React.useState();
  const [textHours, setTextHours] = React.useState();
  const [textEbike, setTextEbike] = React.useState();
  const [estimatedPrice, setEstimatedPrice] = React.useState();

  const onPressInfo = () => {
    //zurück zu Find Bike Nest
    alert('this is an info.');
  };
  const onPressOrder = () => {
    //weiter zu order verarbeitung
    navigation.navigate("Payment");
  }
  const getLocation = () => {
    return "Nürnberg HBF";
  };
  const getSelectedHours = (value) => {
    if(value == 0){
      setTextHours('1 Stunde');
    }else if(value == 1){
      setTextHours('2 Stunden');
    }else if(value == 2){
      setTextHours('3 Stunden');
    }else if(value == 3){
      setTextHours('4 Stunden');
    } else {
      setTextHours('Keine Zeit ausgewählt.');
    }
  }
  const getSelectedSlots = (value) => {

    if(value == 0){
      setTextSlots('1 Slot');
    } else if(value == 1){
      setTextSlots('2 Slots');
    } else {
      setTextSlots('Keine Slots ausgewählt.');
    }
  }

  const getSelectedEbike = (value) => {
    if(value == 0){
      setTextEbike('1 E-Bike Ladestation');
    } else if(value == 1){
      setTextEbike('2 E-Bike Ladestation');
    } else if(value == 2){
      setTextEbike('keine E-Bike Ladestation');
    } else {
      setTextEbike('kein E-bike ausgewählt.');
    }
  }
  const getPrice = () => {
    return "50€";
  };
  const getMwst = () => {
    return "9,50€";
  };
  const getDiscount = () => {
    return "-5€";
  };
  const getSum = () => {
    return "54,50€";
  };
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
          <ModalDropdown onSelect={(value) => getSelectedHours(value)} options={['1 Stunde', '2 Stunden', '3 Stunden', '4 Stunden']} defaultValue={'Bitte wählen...'} textStyle={{fontSize: 18 }} dropdownTextStyle={{fontSize: 18}}/>
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
              </Text>
        </View>
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