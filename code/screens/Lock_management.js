
import React, { useState } from 'react';
import {FlatList,SafeAreaView, StatusBar,StyleSheet,Text, TouchableOpacity, View,} from 'react-native';
import BikeNest_NavigationFooter from '../components/BikeNest_NavigationFooter';
import { mainStyles } from '../styles/MainStyles';
import { Dimensions } from "react-native";
import colors from "../styles/Colors";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Main Door',
  },
  {  
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Bike Spot',
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return <Item item={item} onPress={() => setSelectedId(item.id)} style={{ backgroundColor }} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.UI_Light_4}}>
        <View style={styles.header}>
            <Text style={mainStyles.h1}> Lock Management</Text>
        </View>
        <View style={styles.container}>
             <FlatList
             data={DATA}
             renderItem={renderItem}
             keyExtractor={item => item.id}
             extraData={selectedId}
             />

        </View>
     
      <BikeNest_NavigationFooter/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    header: {
    
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
      },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  item: {
    flex: 1,
    //marginTop: Dimensions.get('window').height * 0.02,
    //marginLeft: Dimensions.get('window').width * 0.01,
    //resizeMode: 'contain',
    //backgroundColor: '#fff',
    //alignItems: 'flex-start',
    //justifyContent: 'space-evenly',
    //alignContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 328,
    height: 55,
    borderRadius: 38,
    backgroundColor: colors.UI_Light_2
  },
  title: {
    fontSize: 32,
  },
});