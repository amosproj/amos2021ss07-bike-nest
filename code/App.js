import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HistoryScreen } from './screens/HistoryScreen';



export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator initialRouteName="HistoryScreen">      
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}

const AppNavigator = createStackNavigator();