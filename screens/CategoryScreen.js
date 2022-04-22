import React, { useState, Component , useEffect} from'react';
import { StyleSheet, Text, View, Image, Linking, TouchableHighlight, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import {selectedCategory} from './HomeScreen';

import { 
    categories, 
    bakeryList, 
    fruitList, 
    dairyList, 
    plantBasedList,
    poultryList,
    vegetableList,
} from '../firebase/groceryData';

export let selectedProduct = ''; 

const CategoryScreen = () => {

    const screenNavigate = useNavigation();

    function selected() {

        switch(selectedCategory)
        {
            case "Bakery":
                return bakeryList;
                
            case "Fruit":
                return fruitList;
            
            case "Dairy":
                return dairyList;

            case "Plant Based":
                return plantBasedList;
            
            case "Poultry":
                return poultryList;

            case "Vegetables":
                return vegetableList;
            default:
                return []

        }
    }


    return (
        <View style={styles.screenVerticalLayout}>
            <Text style={styles.backArrow} onPress={() => screenNavigate.goBack()}>&gt;</Text>
            <Text style={styles.categoryTitles}>{selectedCategory}</Text>
            <ScrollView contentContainerStyle={{ flexGrow: 1,  paddingVertical: 20 }}>
            <View style={{marginLeft: 10, }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={selected()}
                        renderItem={({item}) => (
                            <View> 
                                <TouchableOpacity onPress={() => {
                                    screenNavigate.navigate("Product")
                                    selectedProduct = item.productName
                                }
                                    }>
                                    <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                                    <Text style={styles.productTitles}> {item.productName}</Text>
                                    <Text style={{marginLeft: 80}}>£{item.price}0</Text>
                                </TouchableOpacity>
                            </View> 

                        )}
                    />
                </View>  
                </ScrollView> 
            </View>
    )
}

export default CategoryScreen;

const styles = StyleSheet.create({

    screenVerticalLayout: {
        flex: 1,
        // alignItems: 'center',
        //paddingTop: "25%",
        // height: "130%",
        marginTop: "5%",
    },
    backArrow: {
        fontSize: 40,
        marginTop: "8%",
        marginLeft: "7%",
    },
    categoryTitles: {
        //padding: "5%",
        //marginLeft:20,
        textAlign: 'center',
        fontSize: 30,
        
    },
    productTitles: {
        marginLeft:2,
        textAlign: 'center',
        fontSize: 16,
        //justifyContent: 'center',
    },

    productImage: {
        width: 140,
        height: 180,
        borderRadius:10,
        marginLeft:25,
        marginRight: 25
    },
})