import React, { useState, Component , useEffect} from'react';
import { StyleSheet, Text, View, Image, Linking, TouchableHighlight, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {selectedItem} from './HomeScreen';


import { Ionicons} from '@expo/vector-icons';


import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/reducers/basket';

import { 
    categories, 
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

    let objectSearch = (searchArray) => {
        for (let product = 0; product < searchArray.length; product++) 
        {
            if (searchArray[product].productName === selectedItem) 
            {
                //console.log(searchArray[product])
                return searchArray[product]
            }
            // Checks if iterator is at the end of list
            if ((product + 1) == searchArray.length)
            {
                //return "object is not in array";
                return false
            }
        }
    }

    function productSearch(){
        if (objectSearch(bakeryList) !== false){
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

    //console.log(searchResult)

    return(
        <View style={styles.screenVerticalLayout}>
            <Image style={styles.productImage} source={{uri: searchResult.imageUrl}}/>
            <Text style={styles.title}>{searchResult.productName}</Text>
            <Text style={styles.productPrice}>£{searchResult.price}0</Text>
            <View style={styles.line}></View>
            <Text style={styles.descTitle}>Description</Text>
            <Text style={styles.description}>{searchResult.description}</Text>
            <Text style={styles.sourceTitle}>Source</Text>
            <Text style={styles.imageSource} onPress={() => Linking.openURL(`${searchResult.imageSource}`)}>Photo taken by {searchResult.imageAuthor} on Unsplash</Text>
            
            <View style={{flexDirection: "row"}}>
                <TouchableHighlight
                    onPress={() => {
                        dispatchHook(addToBasket({searchResult, quantity: count}))
                    }}
                    style={styles.button}
                    underlayColor="#DDDDDD"
                    backgroundColor="#99D98C">
                    <Text style={{color: "white"}}>Add to Basket</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.quantity}>
                    <View style={styles.subtract}> 
                        <Ionicons name="remove-circle" size={40} color="green" onPress={() => {
                            if (count !== 1)
                            {
                                setCount(() => count - 1)
                                //count = count - 1
                                console.log(count)
                            }
                        }}/>
                    </View>
                    <Text style={styles.quant}>{count}</Text>
                    <View style={styles.add}> 
                        <Ionicons name="add-circle" size={40} color="green" onPress={() => {
                            setCount(() => count + 1)
                            //count = count + 1
                            console.log(count)
                        }}/>
                    </View>
                    
                    
            </View>
        </View>
    )
}

export default ProductScreen;


const styles = StyleSheet.create({
    screenVerticalLayout: {
        flex: 1,
        //alignItems: 'center',
        //paddingTop: "25%",
        // height: "130%",
        marginTop: "20%",
    },
    productImage: {
        //alignItems: 'center',
        width: 350,
        height: 250,
        borderRadius:10,
        marginLeft:30,
        marginRight: 25
    },
    title: {
        flex: 1,
        top: "2%",
        fontSize: 25,
        marginLeft: 20,
    },
    productPrice: {
        flex: 1,
        bottom: "4%",
        fontSize: 22,
        marginLeft: 20,
    },
    line: {
        flex: 1,
        bottom: "19%",
        borderBottomColor: 'rgba(0, 0, 0, 0.6)', 
        borderBottomWidth: 1.2, 
        borderRadius:1,
        marginRight: 20, 
        marginLeft: 20},
    descTitle: {
        flex: 1,
        bottom: "18%",
        fontSize: 19,
        marginLeft: 25,
    },
    description: {
        bottom: "25%",
        fontSize: 16,
        marginLeft: 35,
    },
    sourceTitle: {
        flex: 1,
        bottom: "24%",
        fontSize: 19,
        marginLeft: 25,
    },
    imageSource: {
        bottom: "31%",
        fontSize: 16,
        marginLeft: 35,
    },
    button: {
        flex: 1,
        alignItems: "center",
        //backgroundColor: "#d3d3d3",
        backgroundColor: "#119822",
        padding: "5%",
        width: "50%",
        bottom: "20%",
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 10,
        //borderColor: 'black',
        //borderWidth: 1,
    },

});


//roundedRect: {
    //     flex: 1,
    //     bottom: "20%",
    //     marginTop:10,
    //     paddingTop:20,
    //     paddingBottom:20,
    //     marginLeft:20,
    //     marginRight:20,
    //     borderRadius:10,
    //     borderWidth: 1,
    //     borderColor: 'rgba(0, 0, 0, 0.15)',
    // },