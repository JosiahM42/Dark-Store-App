/*
    Author:  Josiah Murray
    Date Started: 06/08/2021
*/

import React, { useState, Component , useEffect} from'react';
import { StyleSheet, Text, View, Image, Linking, TouchableHighlight, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons} from '@expo/vector-icons';


import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../redux/reducers/basket';
import { getProduct } from '../redux/reducers/selected';

import { 
    categories,
    sustainableList,
    reducedList,
    bakeryList, 
    fruitList, 
    dairyList, 
    plantBasedList,
    poultryList,
    vegetableList,
} from '../firebase/groceryData';



export let searchResult;

const ProductScreen = () => {

    const [count, setCount] = useState(1)

    const dispatchHook = useDispatch()
    const chosenProduct = useSelector(getProduct)

    const screenNavigate = useNavigation();

    let objectSearch = (searchArray) => {
        for (let product = 0; product < searchArray.length; product++) 
        {
            if (searchArray[product].productName === chosenProduct) 
            {
                return searchArray[product]
            }
            // Checks if iterator is at the end of list
            if ((product + 1) == searchArray.length)
            {
                return false
            }
        }
    }

    function productSearch(){
        if (objectSearch(sustainableList) !== false){
            const result = objectSearch(sustainableList)
            return result
        }
        else if (objectSearch(reducedList) !== false){
            const result = objectSearch(reducedList)
            return result
        }
        else if (objectSearch(bakeryList) !== false){
            const result = objectSearch(bakeryList)
            return result
        }
        else if (objectSearch(fruitList) !== false){
            const result = objectSearch(fruitList)
            return result
        }
        else if (objectSearch(dairyList) !== false){
            const result = objectSearch(dairyList)
            return result
        }
        else if (objectSearch(plantBasedList) !== false){
            const result = objectSearch(plantBasedList)
            return result
        }
        else if (objectSearch(poultryList) !== false){
            const result = objectSearch(poultryList)
            return result
        }
        else if (objectSearch(vegetableList) !== false){
            const result = objectSearch(vegetableList)
            return result
        }
    }

    searchResult = productSearch()

    return(
        <View style={{flex:1}}>
            <Text style={styles.backArrow} onPress={() => screenNavigate.goBack()}>&gt;</Text>
            <View style={styles.screenVerticalLayout}>
                <Image style={styles.productImage} source={{uri: searchResult.imageUrl}}/>
                <Text style={styles.title}>{searchResult.productName}</Text>
                <Text style={styles.productPrice}>£{parseFloat(searchResult.price).toFixed(2)}</Text>
                <View style={styles.line}></View>
                <Text style={styles.descTitle}>Description</Text>
                <Text style={styles.description}>{searchResult.description}</Text>
                <Text style={styles.sourceTitle}>Source</Text>
                <Text style={styles.imageSource} onPress={() => Linking.openURL(`${searchResult.imageSource}`)}>Photo taken by {searchResult.imageAuthor} on Unsplash</Text>
                
            </View>

                <View style={{flex:2}}>
                    {/* Add to basket button */}
                    <TouchableHighlight
                        onPress={() => {
                            // Tells the store that a button has occurred
                            dispatchHook(addToBasket({searchResult, quantity: count}))
                            screenNavigate.goBack()
                        }}
                        style={styles.button}
                        underlayColor="#DDDDDD"
                        backgroundColor="#99D98C">
                        <Text style={styles.buttonText}>Add to Basket</Text>
                    </TouchableHighlight>

                <View style={styles.productQuantity}>
                        <View style={styles.subtract}> 
                            <Ionicons name="remove-outline" size={40} color="white" onPress={() => {
                                if (count !== 1)
                                {
                                    setCount(() => count - 1)
                                }
                            }}/>
                        </View>
                        <Text style={styles.quantity}>{count}</Text>
                        <View style={styles.add}> 
                            <Ionicons name="add-outline" size={40} color="white" onPress={() => {
                                setCount(() => count + 1)
                            }}/>
                        </View>
                </View>
                </View>
        </View>

    )
}

export default ProductScreen;


const styles = StyleSheet.create({
    backArrow: {
        fontSize: 40,
        marginTop: "10%",
        marginLeft: "7%",
    },
    screenVerticalLayout: {
        flex: 1,
        marginTop: "2%",
    },
    productImage: {
        width: "86%",
        height: "100%",
        borderRadius:10,
        marginLeft: "7%",
        marginRight: "7%",
    },
    title: {
        top: "1%",
        fontSize: 25,
        marginLeft: "7%",
    },
    productPrice: {
        top: "2%",
        fontSize: 22,
        marginLeft: "7%",
    },
    line: {
        top: "4%",
        borderBottomColor: 'rgba(0, 0, 0, 0.6)', 
        borderBottomWidth: 1.2, 
        borderRadius:1,
        marginRight: "7%", 
        marginLeft: "7%"},
    descTitle: {
        top: "6%",
        fontSize: 19,
        marginLeft: "7%",
    },
    description: {
        top: "7.5%",
        fontSize: 16,
        marginLeft: "10%",
    },
    sourceTitle: {
        top: "9%",
        fontSize: 19,
        marginLeft: "7%",
    },
    imageSource: {
        top: "10.5%",
        fontSize: 16,
        marginLeft: "10%",
    },
    button: {
        position:'absolute',
        alignItems: "center",
        backgroundColor: "#119822",
        padding: "5.3%",
        width: "40%",
        top: "74.5%",
        marginLeft: "50.2%",
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    productQuantity: {
        position:'absolute',
        top: "74.7%",
        left: '3%', 
        flexDirection:"row",
        padding: "3.8%",
        backgroundColor: "#119822",
        width: "45%",
        borderRadius: 20,
        justifyContent: 'space-around',

    },
    quantity: {
        color: '#ffffff',
        fontSize: 30,
        marginTop: "4%",
    },
    add: {
        marginTop: "4%",
    },
    subtract: {
        marginTop: "4%",
    },

});
