import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SelectorScreen } from './SelectorScreen';
import { SignUpScreen } from './SignUpScreen';
import { SignInScreen } from './SignInScreen';

const Stack = createStackNavigator();

// const SelectorScreen = SelectorScreen()

export const AppNavigate = () => (
  <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} name="Selector" component={SelectorScreen} />
    <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
    <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
  </Stack.Navigator>
);

export const AuthNavigate = () => (
  <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} name="SignUpScreen" component={SignUpScreen} />
  </Stack.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigate/>
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