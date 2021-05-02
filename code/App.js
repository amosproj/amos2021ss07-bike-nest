// App.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  CreateAccount: {
    screen: CreateAccountScreen
  },
  Home: {
    screen: HomeScreen
  },
  About: {
    screen: AboutScreen
  }

});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});