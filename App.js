import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons} from '@expo/vector-icons';


import { SelectorScreen } from './screens/SelectorScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { SignInScreen } from './screens/SignInScreen';
import { AddressEntryScreen } from './screens/AddressEntryScreen';
import HomeScreen from './screens/HomeScreen';
import { AddressScreen } from './screens/AddressScreen';
import {DeclineScreen} from './screens/AddressDeclineScreen';
import BasketScreen from './screens/BasketScreen';
import ProductScreen from './screens/productScreen'
import CategoryScreen from './screens/CategoryScreen';
import AccountScreen from './screens/AccountScreen';
import OrderScreen from './screens/OrderScreen';
import OrderSummary from './screens/OrderSummary';


import { Provider } from 'react-redux';
import store from './redux/reduxStore/store';

LogBox.ignoreAllLogs(true);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const SelectorScreen = SelectorScreen()

const TabNavigate = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let selectedIcon;

        if (route.name === 'Homepage') {
          
          // This will change the colour of the home button
          selectedIcon = focused
           ? 'home'
           : 'home-outline' ; 
        }
        else if (route.name === 'Basket') {
          
          // This will change the colour of the home button
          selectedIcon = focused
          ? 'basket'
          : 'basket-outline';
        }
        // This will add icons to the tab
        return <Ionicons name={selectedIcon} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#119822',
      tabBarInactiveTintColor: '#808080',
    })}
  >
    <Tab.Screen options={{headerShown: false}} name = "Homepage" component={HomeScreen} />
    <Tab.Screen options={{headerShown: false}} name = "Basket" component={BasketScreen} />
  </Tab.Navigator>
);

export const AuthNavigate = () => (
  <Stack.Navigator>
    <Stack.Screen options={{headerShown: false}} name="Address" component={AddressScreen} />
    <Stack.Screen options={{headerShown: false}} name="Selector" component={SelectorScreen} />
    <Stack.Screen options={{headerShown: false}} name="Decline" component={DeclineScreen} />
    <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
    <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
    <Stack.Screen options={{headerShown: false}} name="AddressEntry" component={AddressEntryScreen} />
    <Stack.Screen options={{headerShown: false}} name="Home" component={TabNavigate} />
    <Stack.Screen options={{headerShown: false}} name="Account" component={AccountScreen} />
    <Stack.Screen options={{headerShown: false}} name="Product" component={ProductScreen} />
    <Stack.Screen options={{headerShown: false}} name="Category" component={CategoryScreen} />
    <Stack.Screen options={{headerShown: false}} name="Order" component={OrderScreen} />
    <Stack.Screen options={{headerShown: false}} name="OrderSummary" component={OrderSummary} />
  </Stack.Navigator>
);


// export const AuthNavigate = () => (
//   <Stack.Navigator>
//     <Stack.Screen options={{headerShown: false}} name="Address" component={AddressScreen} />
//     <Stack.Screen options={{headerShown: false}} name="Selector" component={SelectorScreen} />
//     <Stack.Screen options={{headerShown: false}} name="Decline" component={DeclineScreen} />
//     <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
//     <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignInScreen} />
//     <Stack.Screen options={{headerShown: false}} name="AddressEntry" component={AddressEntryScreen} />
//     <Stack.Screen options={{headerShown: false}} name="Home" component={TabNavigate} />
//   </Stack.Navigator>
// );




// export const homeNavigate = () => (
//   <Stack.Navigator
//   initialRouteName="Home">
//     <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
//     <Stack.Screen options={{headerShown: false}} name="Category" component={CategoryScreen} />
//   </Stack.Navigator>
  
// )

// export const homeNavigate = () => (
//   <Stack.Navigator
//   initialRouteName="Home">
//     <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
//     <Stack.Screen options={{headerShown: false}} name="Product" component={ProductScreen} />
//     <Stack.Screen options={{headerShown: false}} name="Account" component={AccountScreen} />
//     <Stack.Screen options={{headerShown: false}} name="Category" component={CategoryScreen} />
//   </Stack.Navigator>
  
// )

// export const basketNavigate = () => (
//   <Stack.Navigator
//   initialRouteName="Home">
//     <Stack.Screen options={{headerShown: false}} name = "Basket" component={BasketScreen}/>
//     <Stack.Screen options={{headerShown: false}} name="Order" component={OrderScreen} />
//     <Stack.Screen options={{headerShown: false}} name="OrderSummary" component={OrderSummary} />
//   </Stack.Navigator>
// )

// export const AuthNavigate = () => (
//   <Stack.Navigator>
//     <Stack.Screen options={{headerShown: false}} name="SignUpScreen" component={SignUpScreen} />
//   </Stack.Navigator>
// )

// export const AppNavigate = () => (

// );

export default function App() {

  return (
    // Provider is for redux - it will allow redux states to operate in the application
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigate/>
      </NavigationContainer>
    </Provider>

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