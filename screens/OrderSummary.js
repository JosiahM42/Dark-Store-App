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
            {/* <Button onPress={() => console.log(basket)} title="Testing"><Text>Testing</Text></Button> */}
            <Text style={styles.exitCross} onPress={() => {
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

                            <View style={{flex: 1, height: 90}}>
                                <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                                <Text style={styles.productTitles}> {item.productName}</Text>
                                <Text style={styles.productPrice}>£{parseFloat(item.price).toFixed(2)}</Text>
                    
                            </View> 
                        )}   
                /> 
            </View>
            
            <Text style={{fontSize: 20, bottom: "9%", marginLeft: 30}}>
                    Summary
            </Text>

            <View style={{flexDirection:"row", justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, bottom: "17%", marginLeft: 15}}>Total Price:</Text>
                <Text style={{fontSize: 18, bottom: "17%", marginLeft: 169}}>£{parseFloat(orderPrice).toFixed(2)}</Text>
            </View>
            {/* <Text style={{fontSize: 18, bottom: "13%", marginLeft: 30}}>Total Price:</Text>
            <Text style={{fontSize: 18, bottom: "13%", marginLeft: 30}}>£{parseFloat(price).toFixed(2)}</Text> */}

            <View style={{flexDirection:"row", justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, bottom: "16%", marginLeft: 15}}>Delivery Price:</Text>
                <Text style={{fontSize: 18, bottom: "16%", marginLeft: 146}}>£{parseFloat(deliveryPrice).toFixed(2)}</Text>
            </View>

            <View style={{flexDirection:"row", justifyContent: 'space-evenly'}}>
                <Text style={{fontSize: 18, bottom: "15%", marginLeft: 16}}>Order Total:</Text>
                <Text style={{fontSize: 18, bottom: "15%", marginLeft: 165}}>£{parseFloat(Total).toFixed(2)}</Text>
            </View>
            
        </View>
    )
}

export default OrderSummary;

const styles = StyleSheet.create({
    // button: {
    //     top: "20%"
    // },
    exitCross: {
        fontSize: 40,
        marginTop: "10%",
        marginLeft: "7%",
    },

    screenVerticalLayout: {
        flex: 1,
        //alignItems: 'center',
        marginBottom: "1%",
        paddingTop: "8%",
        paddingBottom: "15%",
    },

    title: {
        marginLeft: 30,
        fontSize: 30,
        paddingTop: "4%",
    },

    productTitles: {
        // marginLeft:6,
        textAlign: 'left',
        fontSize: 18,
        bottom: 70,
        height: 40,
        left: '30%',
        //justifyContent: 'center',
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius:5,
        marginLeft: '10%'
        // marginLeft:5,
        // marginRight: 25
    },

    productPrice: {
        // textAlign: 'left',
        // fontSize: 18,
        // bottom: 68,
        // left: '64%',
        // height: 25
        
        textAlign: 'left',
        fontSize: 18,
        bottom: 90,
        left: 320,
        height: 25
    },

    removeItem: {
        // bottom: 138, 
        // left: '80%', 
        // height: 304

        bottom: "106%", 
        left: "54%", 
        height: 30
    },

    productQuantity: {
        // bottom: 118, 
        // left: 240, 
        // height: 30,
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
        //backgroundColor: "#d3d3d3",
        backgroundColor: "#119822",
        padding: "5%",
        width: "50%",
        bottom: "10%",
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 10,
        //borderColor: 'black',
        //borderWidth: 1,
    },
    
})