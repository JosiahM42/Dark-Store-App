import React, {useState, useEffect} from'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, TextInput, Button, ToastAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore} from '../firebase/firebaseConfig';
import firebase from 'firebase';
import { Platform } from 'expo-modules-core';

import { useSelector } from 'react-redux';
import { getGroceryBasket } from '../redux/reducers/basket';

import { useDispatch } from 'react-redux';
import { 
    removeFromBasket, 
    clearBasket, 
    updateProductQuantityAdd, 
    updateProductQuantitySubtract,
    setFinalPrice,
    setTotalPrice,
    setDeliveryTotal
} from '../redux/reducers/basket';
import { setEstimatedDeliveryTime } from '../redux/reducers/order';
import { getUser } from '../redux/reducers/users';
import { Ionicons} from '@expo/vector-icons';


const BasketScreen = () => {
    const screenNavigate = useNavigation();
    const basket = useSelector(getGroceryBasket)
    const [price, setPrice] = useState(0.00)
    const [deliveryPrice, setDeliveryPrice] = useState(0.80)
    const [orderTotal, setOrderTotal] = useState(0.00)


    const dispatchHook = useDispatch()
    const accountDetails = useSelector(getUser)

    function submitOrder(){
        // Sends a request to obtain the user's unique identifier
        const userID = auth.currentUser.uid;
        if (basket.length !== 0) {   
            // Pushes the new order to the firestore database
            firestore.collection('orders').add({
                userID: userID,
                basket: basket,
                orderTotal: parseFloat(orderTotal).toFixed(2), 
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            // Stores the order totals 
            dispatchHook(setTotalPrice({totalPrice: price}))
            dispatchHook(setDeliveryTotal({deliveryTotal: deliveryPrice}))
            dispatchHook(setFinalPrice({finalPrice: orderTotal}))
            // This will reset the navigational stack so that it starts from the order screen
            screenNavigate.reset({
                index: 0,
                routes: [{name: 'Order'}]
            })
        }
        else {
            // Checks which platform the customer is running the app on
            if (Platform.OS === 'android') {
                // This will only show up on android
                ToastAndroid.show('Basket is empty', ToastAndroid.SHORT)
            }
            else {
                alert("Basket is empty")
            }
        }
    }

    function calculateProductTotal(){
        let totalPrice = 0.00
        for (let total = 0; total < basket.length; total++)
        {
            totalPrice += basket[total].price
        }

        return totalPrice
    }

    function calculateOrderTotal(){
        let orderPrice = price + deliveryPrice
        return orderPrice
    }

    async function getEstimatedDeliveryTime(){
        const googleMapsKey = "AIzaSyDDRYyy-kCd1dNrRH-eeQ4YHhQ4FoNRYIo";
        
        // Fulfilment centre address
        const fulfilmentCentreAddress = "Coldharbour Ln, Stoke Gifford, Bristol BS16 1QY"

        // Customer Delivery Address
        const customerAddress = accountDetails[0].address

        // Google Maps Distance Matrix API Call
        // This identifies the distance between 
        // the fulfilment centre and the customers address via Bike
        await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + fulfilmentCentreAddress + 
        '&mode=bicycling&destinations=side_of_road%' + customerAddress + '&key=' + googleMapsKey)
        .then((response) => response.json())
        .then((responseJson) => {
            dispatchHook(setEstimatedDeliveryTime({estimatedTime: JSON.parse(JSON.stringify(responseJson.rows[0].elements[0].duration.text))}))
        })
        .catch(error => alert(error.message))
    }


    useEffect (() => {
        setPrice(calculateProductTotal())
        setOrderTotal(calculateOrderTotal())
    });

    useEffect (() => {
        getEstimatedDeliveryTime()
    }, [])

    return (
        <View style={{flex:1}}>
            <View style={{paddingLeft: "85%", paddingTop: "12%",}}>
              <Ionicons name="trash-outline" size={40} 
                onPress={() => {
                    dispatchHook(clearBasket())
                }}
              />  
            </View>
            <Text style={styles.title}>Your Basket</Text>
            
            <View style={styles.screenVerticalLayout}>
                <FlatList
                        showsVerticalScrollIndicator={false}
                        data={basket}
                        renderItem={({item}) => (

                            <View style={{flex: 1, height: 90}}>
                                <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                                <Text style={styles.productTitles}> {item.productName}</Text>
                                <Text style={styles.productPrice}>£{parseFloat(item.price).toFixed(2)}</Text>
                                
                                <View style={styles.removeItem}>
                                    <Ionicons name="trash-outline" size={25}
                                    onPress={() => {
                                        dispatchHook(removeFromBasket({selectedID: item.basketID}))
                                    }} />  
                                </View>

                                <View style={styles.productQuantity}>
                                    <Ionicons name="remove-outline" size={25} color="white" 
                                    onPress={() => {
                                        dispatchHook(updateProductQuantitySubtract({name: item.productName}))}
                                    }
                                    />
                                    <Text style={styles.quantityText}> {item.quantity} </Text>
                                    <Ionicons name="add-outline" size={25} color="white" 
                                    onPress={() => {
                                        dispatchHook(updateProductQuantityAdd({name: item.productName}))}
                                    }
                                    />
                                </View>
                    
                            </View> 
                        )}   
                /> 
            </View>
            
            
            <Text style={{fontSize: 20, bottom: "11%", marginLeft: 30}}>
                    Summary
            </Text>

            <View style={{flexDirection:"row", justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, bottom: "16%", marginLeft: 15}}>Total Price:</Text>
                <Text style={{fontSize: 18, bottom: "16%", marginLeft: 169}}>£{parseFloat(price).toFixed(2)}</Text>
            </View>

            <View style={{flexDirection:"row", justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, bottom: "15%", marginLeft: 15}}>Delivery Price:</Text>
                <Text style={{fontSize: 18, bottom: "15%", marginLeft: 146}}>£{parseFloat(deliveryPrice).toFixed(2)}</Text>
            </View>

            <View style={{flexDirection:"row", justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, bottom: "14%", marginLeft: 16}}>Order Total:</Text>
                <Text style={{fontSize: 18, bottom: "14%", marginLeft: 165}}>£{parseFloat(orderTotal).toFixed(2)}</Text>
            </View>
            
            <View style={{flexDirection: "row"}}>
                <TouchableHighlight
                    onPress={() => {
                        submitOrder()
                    }}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C">
                    <Text style={{color: "white"}}>Order</Text>
                </TouchableHighlight>
            </View>
            
            
        </View>
    )
}

export default BasketScreen

const styles = StyleSheet.create({

    screenVerticalLayout: {
        flex: 1,
        marginBottom: "1%",
        paddingTop: "4%",
        paddingBottom: "20%",
    },

    title: {
        marginLeft: 30,
        fontSize: 30,
    },

    productTitles: {
        textAlign: 'left',
        fontSize: 18,
        bottom: 70,
        height: 40,
        left: '30%',
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius:5,
        marginLeft: '10%'
    },

    productPrice: {
        textAlign: 'left',
        fontSize: 18,
        bottom: 90,
        left: 320,
        height: 25
    },

    removeItem: {
        bottom: "106%", 
        left: "54%", 
        height: 30
    },

    productQuantity: {
        bottom: "35%", 
        left: '140%', 
        flexDirection:"row",

        backgroundColor: "#119822",
        width: "19%",
        height: "30%",
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 20
    },

    quantityText: {
        fontSize: 18,
        color: "white",
    },

    button: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "5%",
        width: "50%",
        bottom: "8%",
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 10,
    },
    
})