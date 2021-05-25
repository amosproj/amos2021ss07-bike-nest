import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateAccountScreen } from './screens/CreateAccountScreen';
import PersonalInformationScreen from './screens/PersonalInformationScreen';
import LoginScreen from './screens/LoginScreen';
import PaymentScreen from './screens/PaymentScreen';
import FindBikeNestScreen from './screens/FindBikeNestScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingScreen from './screens/BookingScreen';
import LockScreen from './screens/LockScreen';
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen';
import ReservationSuccessScreen from './screens/ReservationSuccessScreen';
import LockSpotScreen from './screens/LockSpotScreen';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator screenOptions={{ headerShown: false }}>
        <AppNavigator.Screen name='Login' component={LoginScreen} />
        <AppNavigator.Screen name='FindBikeNest' component={FindBikeNestScreen} />
        <AppNavigator.Screen name='Profile' component={ProfileScreen} />
        <AppNavigator.Screen name='Payment' component={PaymentScreen} />
        <AppNavigator.Screen name='CreateAccount' component={CreateAccountScreen} />
        <AppNavigator.Screen name='EditPersonalInformation' component={PersonalInformationScreen} />
        <AppNavigator.Screen name='History' component={HistoryScreen} />
        <AppNavigator.Screen name='Booking' component={BookingScreen} />
        <AppNavigator.Screen name='Lock' component={LockScreen} />
        <AppNavigator.Screen name= 'LockSpot' component ={LockSpotScreen}/>
        <AppNavigator.Screen name='ReservationSuccess' component={ReservationSuccessScreen} />
        <AppNavigator.Screen name='PaymentConfirmation' component={PaymentConfirmationScreen} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}

const AppNavigator = createStackNavigator();
