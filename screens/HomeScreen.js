import React, { useState, Component, useEffect } from'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth,firestore } from '../firebase/firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';

import {Ionicons} from '@expo/vector-icons';

import { useSelector } from 'react-redux';
import { getUser, getUsersData, clearUserData } from '../redux/reducers/users';
import { useDispatch } from 'react-redux';

import { setSelectedProduct, setSelectedCategory } from '../redux/reducers/selected';

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

export let selectedItem = '';
export let selectedCategory = '';

const HomeScreen = () => {

    const screenNavigate = useNavigation();
    const userDetails = useSelector(getUser);

    const dispatchHook = useDispatch()


    const userData = async () => {
        // Make a request to Firebase Auth to obtain the user's account ID
        const userID = auth.currentUser.uid;
        const details = []
        // An asynchronous request for pulling customer account data
        await firestore.collection('users').doc(userID).get()
        .then((doc) => doc.data())
        .then((docData) => {
            console.log(docData)
            details.push({
                id: userID,
                name: docData.name.toString(),
                phone: docData.phone.toString(),
                email: docData.email.toString(),
                address: docData.address.toString(),
            })
        })    
        .catch((error) => console.log(error.message))
        dispatchHook(getUsersData({details: details[details.length - 1]}))
    }

    // useEffect rendered once due to having [] at the end
    useEffect(() => {
        userData()
    }, [])


    const productDisplay = (categoryList) => {
        return (
            <View style={{paddingTop: "4%"}}>
                {/* Displays each item in an array and applies the same attributes to each */}
                <FlatList
                    // Forces the flatlist to be displayed horizontally rather than the vertical default
                    horizontal 
                    // Removes the scroll bar from the bottom of each view
                    showsHorizontalScrollIndicator={false}
                    data={categoryList.slice(0,4)}
                    // For each item do the following
                    renderItem={({item}) => (
                        <View>
                            <TouchableOpacity onPress={() => {
                                dispatchHook(setSelectedProduct({selectedProduct: item.productName}))
                                screenNavigate.navigate('Product')
                            }}>
                                <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                                <Text style={styles.productTitles}> {item.productName}</Text>
                                <Text style={{paddingLeft: "40%"}}>£{parseFloat(item.price).toFixed(2)}</Text>
                            </TouchableOpacity>
                        </View> 
                    )}
                />
                {/* Displays a line on the screen */}
                <View style={{borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, marginRight: "5%", marginLeft: "5%"}}/>
            </View>   
        )
    }

    return (
        <View style={{flex:1}}>
            <View style={{paddingLeft: "85%", paddingTop: "14%",}}>
                <Ionicons name="person-circle-outline" size={40} 
                    onPress={() => {
                        //signOut()
                        screenNavigate.navigate('Account')
                    }}
                />  
            </View>
            <View style={styles.screenVerticalLayout}>

                <View style={{}}> 
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={categories}
                            renderItem={({item}) => (
                                <TouchableOpacity 
                                onPress={() => 
                                    {
                                        dispatchHook(setSelectedCategory({selectedCategory: item.categoryName}))
                                        screenNavigate.navigate("Category")
                                    }
                                }>
                                    <Image style={styles.categoryImage} source={{uri: item.imageUrl}}/>
                                    <Text style={styles.categoryTitles}> {item.categoryName}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <View style={{borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, marginRight: "5%", marginLeft: "5%"}}/>
                    </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1,  paddingVertical: "1%" }}>
                    
                    <View style={{paddingTop: "5%"}}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Sustainable</Text>
                            <Text 
                                style={{marginLeft: "40%", fontSize: 15}} 
                                onPress={() => {
                                    dispatchHook(setSelectedCategory({selectedCategory: 'Sustainable'}))
                                    screenNavigate.navigate("Category") 
                                }}
                            >
                            View Category {'>'}</Text>
                        </View>
                    </View>

                    {productDisplay(sustainableList)}

                    <View style={{paddingTop: "5%"}}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Reduced</Text>
                            <Text 
                                style={{marginLeft: "45%", fontSize: 15}} 
                                onPress={() => {
                                    dispatchHook(setSelectedCategory({selectedCategory: 'Reduced'}))
                                    screenNavigate.navigate("Category") 
                                }}
                            >
                            View Category {'>'}</Text>
                        </View>
                    </View>

                    {productDisplay(reducedList)}

                    <View style={{paddingTop: "5%"}}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Bakery</Text>
                            <Text 
                                style={{marginLeft: "45%", fontSize: 15}} 
                                onPress={() => {
                                    dispatchHook(setSelectedCategory({selectedCategory: 'Bakery'}))
                                    screenNavigate.navigate("Category") 
                                }}
                            >
                            View Category {'>'}</Text>
                        </View>
                    </View>

                    {productDisplay(bakeryList)}
                    

                    <View style={{paddingTop: "5%"}}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Fruit</Text>
                            <Text 
                                style={{marginLeft: "50%", fontSize: 15}}
                                onPress={() => {
                                    dispatchHook(setSelectedCategory({selectedCategory: 'Fruit'}))
                                    screenNavigate.navigate("Category") 
                                }}
                            >
                                View Category {'>'}
                            </Text>
                        </View>
                    </View>

                    {productDisplay(fruitList)}

                    <View style={{paddingTop: "5%" }}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Dairy</Text>
                            <Text 
                                style={{marginLeft: "49%", fontSize: 15}}
                                onPress={() => {
                                    dispatchHook(setSelectedCategory({selectedCategory: 'Dairy'}))
                                    screenNavigate.navigate("Category") 
                                }}
                            >
                                View Category {'>'}
                            </Text>
                        </View>
                    </View>
                    
                    {productDisplay(dairyList)}


                    <View style={{paddingTop: "5%" }}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Plant Based</Text>
                            <Text 
                                style={{marginLeft: "35%", fontSize: 15}}
                                onPress={() => {
                                    dispatchHook(setSelectedCategory({selectedCategory: 'Plant Based'}))
                                    screenNavigate.navigate("Category") 
                                }}
                            >
                                View Category {'>'}
                            </Text>
                        </View>
                    </View>

                    {productDisplay(plantBasedList)}

                    <View style={{paddingTop: "5%" }}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Poultry</Text>
                            <Text 
                                style={{marginLeft: "45%", fontSize: 15}}
                                onPress={() => {
                                    dispatchHook(setSelectedCategory({selectedCategory: 'Poultry'}))
                                    screenNavigate.navigate("Category") 
                                }}
                            >
                                View Category {'>'}
                            </Text>
                        </View>
                    </View>

                    {productDisplay(poultryList)}

                    <View style={{paddingTop: "5%" }}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Vegetables</Text>
                            <Text 
                                style={{marginLeft: "35%", fontSize: 15}}
                                onPress={() => {
                                    dispatchHook(setSelectedCategory({selectedCategory: 'Vegetables'}))
                                    screenNavigate.navigate("Category") 
                                }}
                            >
                                View Category {'>'}
                            </Text>
                        </View>
                    </View>

                    {productDisplay(vegetableList)}


                </ScrollView>
            </View>
        </View>
        
        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    button: {
        width: "10%",
        height: "10%",

    },

    screenVerticalLayout: {
        flex: 1,
        marginTop: "4%",
    },

    scrollHorizontalView: {
        flex: 1,
        height: "20%",
    },

    categoryTitles: {
        marginLeft:20,
        textAlign: 'center',
        fontSize: 16,
        
    },

    categoryImage:{
        width: 90,
        height: 90,
        borderRadius:10,
        marginLeft:25
         
    },

    productTitles: {
        marginLeft:2,
        textAlign: 'center',
        fontSize: 16,
    },

    productImage: {
        width: 140,
        height: 180,
        borderRadius:10,
        marginLeft:25,
        marginRight: 25
    },

    quantityFormat: {
        flexDirection: 'row',
    }
})