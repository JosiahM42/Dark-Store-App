import React, {useState, useEffect} from'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, TextInput, Button, ToastAndroid} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearBasket } from '../redux/reducers/basket';
import { 
    getGroceryBasket, 
    getFinalPrice, 
    getTotalPrice, 
    getDeliveryTotal,
} from '../redux/reducers/basket';


const OrderSummary = () => {

    const orderBasket = useSelector(getGroceryBasket)
    const orderPrice = useSelector(getTotalPrice)
    const Total = useSelector(getFinalPrice)
    const deliveryPrice = useSelector(getDeliveryTotal)
    const dispatchHook = useDispatch();
    const screenNavigate = useNavigation()

    return (
        <View style={{flex:1}}>
            <Text style={styles.exitCross} onPress={() => {
                // Resets the naviagational flow to the home screen
                screenNavigate.reset({
                    index: 0,
                    routes: [{name: 'Home'}]
                })
                dispatchHook(clearBasket())
                }}>x</Text>

            <Text style={styles.title}>Your Order Summary</Text>
            
            <View style={styles.screenVerticalLayout}>
                <FlatList
                        showsVerticalScrollIndicator={false}
                        data={orderBasket}
                        renderItem={({item}) => (

                            <View style={{flex: 1, height: 100}}>
                                <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                                <Text style={styles.productTitles}> {item.productName}</Text>
                                <Text style={styles.quantityText}> Quantity: {item.quantity} </Text>
                                <Text style={styles.productPrice}>£{parseFloat(item.price).toFixed(2)}</Text>
                    
                            </View> 
                        )}   
                /> 
            </View>
            
            <Text style={{fontSize: 20, bottom: "11%", marginLeft: 30}}>
                    Summary
            </Text>

            <View style={{flexDirection:"row", justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, bottom: "16%", marginLeft: 15}}>Total Price:</Text>
                <Text style={{fontSize: 18, bottom: "16%", marginLeft: 169}}>£{parseFloat(orderPrice).toFixed(2)}</Text>
            </View>

            <View style={{flexDirection:"row", justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, bottom: "15%", marginLeft: 15}}>Delivery Price:</Text>
                <Text style={{fontSize: 18, bottom: "15%", marginLeft: 146}}>£{parseFloat(deliveryPrice).toFixed(2)}</Text>
            </View>

            <View style={{flexDirection:"row", justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, bottom: "14%", marginLeft: 16}}>Order Total:</Text>
                <Text style={{fontSize: 18, bottom: "14%", marginLeft: 165}}>£{parseFloat(Total).toFixed(2)}</Text>
            </View>
            
        </View>
    )
}

export default OrderSummary;

const styles = StyleSheet.create({

    exitCross: {
        fontSize: 40,
        marginTop: "10%",
        marginLeft: "7%",
    },

    screenVerticalLayout: {
        flex: 1,
        marginBottom: "1%",
        paddingTop: "8%",
        paddingBottom: "20%",
    },

    title: {
        marginLeft: 30,
        fontSize: 30,
        paddingTop: "4%",
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
        bottom: "106%",
        left: '80%',
    },

    quantityText: {
        fontSize: 18,
        color: "black",
        left: '30%',
        bottom: '70%',
    },

    button: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "5%",
        width: "50%",
        bottom: "10%",
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 10,
    },
    
})