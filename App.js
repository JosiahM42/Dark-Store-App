import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SelectorScreen } from './screens/SelectorScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { SignInScreen } from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import { AddressScreen } from './screens/AddressScreen';
import {DeclineScreen} from './screens/AddressDeclineScreen'

LogBox.ignoreAllLogs(true);
//console.disableYellowBox = true;

const Stack = createStackNavigator();

// const SelectorScreen = SelectorScreen()


export const AuthNavigate = () => (
  <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} name="Address" component={AddressScreen} />
    <Stack.Screen options={{headerShown: false}} name="Selector" component={SelectorScreen} />
    <Stack.Screen options={{headerShown: false}} name="Decline" component={DeclineScreen} />
    <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
    <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
    <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

// export const AuthNavigate = () => (
//   <Stack.Navigator>
//     <Stack.Screen options={{headerShown: false}} name="SignUpScreen" component={SignUpScreen} />
//   </Stack.Navigator>
// )

// export const AppNavigate = () => (

// );

export default function App() {

  return (
    <NavigationContainer>
      <AuthNavigate/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});