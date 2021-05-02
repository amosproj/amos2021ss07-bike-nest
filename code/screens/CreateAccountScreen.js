import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Colors from '../Colors';


export default class CreateAccountScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <Button
          title="test"
          color={Colors.UI_Light_2}
          onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    );
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


