import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { CreateAccountScreen } from './screens/CreateAccountScreen';
// import PersonalInformationScreen from './screens/PersonalInformationScreen';
import BikeNestScreen from './screens/FindBikeNestScreen';


export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator>
        <AppNavigator.Screen name='BikeNestScreen' component={BikeNestScreen} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}

const AppNavigator = createStackNavigator();


