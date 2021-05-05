import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native'
import { Dimensions } from "react-native";
import { styles } from '../components/EditPersonalInformation/styles';
import { mainstyles } from '../styles/MainStyles';
import Colors from '../styles/Colors';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default function PaymentScreen({ navigation }) {
  return (
    <View style={mainstyles.container}>
      <ImageBackground source={require('../assets/background/background.png')} style={[styles.backgroundImage, { alignItems: 'center' }]}>
        <View style={{ flex: 0.2, alignContent: 'center', justifyContent: 'center', marginTop: 10 }}>
          <Text style={styles.h1}>Meine Bestellung</Text>
        </View>
        <Text style={mainstyles.h3}>
          <Text style={{position: 'absolute', textAlign:'left'}}>Details                                                 </Text>
          <Text style={{position: 'absolute', textAlign:'right'}}>         Ändern</Text>
        </Text>
        <View style={{ flex: 0.2, justifyContent: 'center' }}> 
        <Text>
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center' }}>1 Slot in BIKE NEST                                          </Text> 
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center' }}>3 Stunden</Text> 
        </Text>
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center' }}>Nürnberg HBF</Text>
          <Text></Text>
          <Text>
          <Image source={require('../assets/payment/clock.png')} />
          <Text style={{ color: Colors.UI_Light_2, alignItems: 'center', justifyContent: 'center' }}>   Reserviert für 30min</Text> 
          </Text>
        </View>
        <View style={{ flex: 0.9, justifyContent: 'center', color: Colors.UI_Light_1 }}>
        <Text>
          <Text style={mainstyles.h3}>Zahlungsmethode                          </Text>
          <Image source={require('../assets/payment/plus.png')}/>
          <Text style={mainstyles.h3}>Hinzufügen</Text>
        </Text>
        <View style={{ flex: 0.6, justifyContent: 'center' }}> 
          <Pressable style={[styles.button, { backgroundColor: '#ffffff' }]}>
            <View style={styles.buttonContent}>
              <Image style={styles.buttonImage, { maxWidth: 150 }} source={require('../assets/payment/Paypal1.png')} />
            </View>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: '#ffffff' , borderColor: Colors.UI_Light_2, borderWidth: 1 }]}>
            <View style={styles.buttonContent}>
              <Image style={styles.buttonImage} source={require('../assets/payment/Visa.png')} />
            </View>
          </Pressable>
        </View>
          <Image source={require('../assets/payment/Divider.png')} />
        <View style={{ flex: 0.6, justifyContent: 'center'}}> 
          <Text style={mainstyles.label}>Promocode</Text> 
          <TextInput style={mainstyles.inputFieldHalf}
            placeholder='BIKE NEST'
            secureTextEntry={true}/>
          <Image source={require('../assets/payment/Divider.png')} /> 
        </View>
        </View>
        <View style={{ flex: 0.6, justifyContent: 'center' }}> 
        <Text style={mainstyles.h3}>Übersicht</Text> 
        <Text></Text>
        <Text>
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center' }}>Gesamt exkl. Mwst.                                            </Text> 
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center',  fontWeight: 'bold' }}>50€</Text> 
        </Text>
        <Text>
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center' }}>Mwst. 19%                                                          </Text> 
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center',  fontWeight: 'bold' }}>9,50€</Text> 
        </Text>
        <Text>
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center' }}>Rabatt                                                                     </Text> 
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center',  fontWeight: 'bold' }}>-5€</Text> 
        </Text>
          <Text></Text>
          <Image source={require('../assets/payment/Line.png')} />
          <Text>
          <Text style={{ color: '#000000', alignItems: 'center', justifyContent: 'center' }}>Gesamt                                                            </Text> 
          <Text style={{ color: Colors.UI_Light_2, alignItems: 'center', justifyContent: 'center',  fontWeight: 'bold' }}>54,50€</Text> 
          </Text>
          <Text></Text>
          <Text style={{marginLeft: 120, margin: 10,}}>
          <Text style={mainstyles.h3}>Jetzt kostenpflichtig Bestellen  </Text> 
          <Image source={require('../assets/payment/mail-send.png')} />
          </Text>
        </View>
        
        
        <StatusBar style="auto" />
        </ImageBackground>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   backgroundImage: {
//   },
//   h1: {
//     position: 'absolute',
//     left: 50,
//     fontSize: 28,
//     fontWeight: 'bold',
//     alignItems: 'center'
//   },
//   inputField: {
//     width: 328,
//     height: 55,
//     color: '#BDBDBD',
//     backgroundColor: Colors.UI_Light_4,
//     borderRadius: 15,
//     margin: 9,
//     paddingLeft: 12,
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     elevation: 3,
//     width: 328,
//     height: 55,
//     borderRadius: 38,
//     margin: 9,
//     backgroundColor: Colors.UI_Light_2
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     width: '100%'
//   },
//   buttonText: {
//     alignSelf: 'center',
//     fontSize: 14,
//     color: Colors.UI_Light_4,
//   },
//   buttonImage: {
//     alignSelf: 'center'
//   }
// });
