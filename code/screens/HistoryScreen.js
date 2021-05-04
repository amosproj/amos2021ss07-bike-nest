import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import Avatar from './assets/Avatar.png'; 
import bike from './assets/bike.png'; 


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default function HistoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={Avatar} style={styles.avatar} />

      <Text style={styles.name} >
        Max Muster
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    position: 'absolute',
    width:60,
    height: 66,
    marginLeft: 13,
  },
  name: {
    color: '##000000',
    fontSize: 18,
    marginLeft: 91,
    fontWeight: 'bold',
  }

});