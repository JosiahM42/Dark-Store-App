import React, { useState, Component } from'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {selectedItem} from './HomeScreen';

import { 
    categories, 
    bakeryList, 
    fruitList, 
    dairyList, 
    plantBasedList,
    poultryList,
    vegetableList,
} from '../firebase/groceryData';




const ProductScreen = () => {

    // const displaySelected = () => {
    //     console.log(selectedItem)
    //     //console.log(testing)
    // }

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

    // const displaySelected = () => {
    //     console.log(objectSearch(dairyList))
    //     //console.log(testing)
    // }

    function productSearch(){
        if (objectSearch(bakeryList) !== false){
            const result = objectSearch(bakeryList)
            return result
            //console.log(result.imageUrl)
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

    // console.log(productSearch.imageUrl)

    let searchResult = productSearch()

    //console.log(searchResult)

    return(
        <View style={styles.screenVerticalLayout}>
            <Image style={styles.productImage} source={{uri: searchResult.imageUrl}}/>
            {/* <Button onPress={displaySelected} title="test">text</Button> */}
            <Text style={styles.title}>{searchResult.productName}</Text>
            <Text style={styles.descTitle}>Description</Text>
            <Text style={styles.description}>{searchResult.description}</Text>
            <Text>Source</Text>
        </View>
    )
}

export default ProductScreen;


const styles = StyleSheet.create({
    button: {
        top: "20%",
        //backgroundColor: "grey"
    },
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
        top: "3%",
        fontSize: 25,
        marginLeft: 20,
    },
    descTitle: {
        flex: 1,
        bottom: "10%",
        fontSize: 20,
        marginLeft: 20,
    },
    description: {
        flex: 1,
        bottom: "28%",
        fontSize: 18,
        marginLeft: 30,
    },

});