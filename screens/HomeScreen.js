import React, { useState, Component } from'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth,firestore } from '../firebase/firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';

import {Ionicons} from '@expo/vector-icons';

import { userData } from '../firebase/userData';
import { useSelector } from 'react-redux';
import { getUser, getUsersData, clearUserData } from '../redux/reducers/users';
import { useDispatch } from 'react-redux';


import { 
    categories, 
    bakeryList, 
    fruitList, 
    dairyList, 
    plantBasedList,
    poultryList,
    vegetableList,
} from '../firebase/groceryData';
// import { FlatList } from 'react-native-gesture-handler';


// https://www.youtube.com/watch?v=ql4J6SpLXZA&t=1268s
//watch this 
//https://www.youtube.com/watch?v=-40TBdSRk6E&list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ&index=22 

//LogBox.ignoreAllLogs();

export let selectedItem = '';
export let selectedCategory = '';

const HomeScreen = () => {

    const screenNavigate = useNavigation();
    const userDetails = useSelector(getUser);
    const dispatchHook = useDispatch()

    const bakeryProducts = []

    // bakeryProducts.push(pullGroceries)
    //let [quantity, setQuantity] = useState(0);

    const signOut = () => {
        auth
            .signOut()
            .then(() => {
                screenNavigate.replace("Selector")
            })
            .catch(error => alert(error.message))
    }


    const userData = async () => {
        // Make a request to Firebase Auth to obtain the user's account ID
        const userID = auth.currentUser.uid;
        const details = []
        // An asynchronous request for pulling customer account data
        await firestore.collection('users').doc(userID).onSnapshot(
            (userSnapshot) => {
                details.push({
                    id: userID,
                    name: userSnapshot.data().name.toString(),
                    phone: userSnapshot.data().phone.toString(),
                    email: userSnapshot.data().email.toString(),
                })
                // Stores the pulled data in the user state array
                dispatchHook(getUsersData({details: details[details.length - 1]}))
            })
    }

    // const userData = async () => {
    //     const userID = auth.currentUser.uid;

    //     const details = []
    //     //console.log(user)
        
    //     await firestore.collection('users').doc(userID).onSnapshot(
    //         (userSnapshot) => {
    //             details.push({
    //                 id: userID,
    //                 name: userSnapshot.data().name.toString(),
    //                 phone: userSnapshot.data().phone.toString(),
    //                 email: userSnapshot.data().email.toString(),
    //             })
                
    //             // dispatchHook(getUsersData({
    //             //     id: details[0].id,
    //             //     name: details[0].name,
    //             //     phone: details[0].phone, 
    //             //     email: details[0].email,
    //             // }))
    //             dispatchHook(getUsersData({details: details[details.length - 1]}))
                
    //             //console.log(userDetails)
    //         })
        
    // }

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
                                screenNavigate.navigate('Product')
                                selectedItem = item.productName
                            }}>
                                <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                                <Text style={styles.productTitles}> {item.productName}</Text>
                                <Text style={{paddingLeft: "40%"}}>£{item.price}0</Text>
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
                        userData()
                        setTimeout(() => screenNavigate.navigate('Account'), 500)
                    }}
                />  
            </View>
            <View style={styles.screenVerticalLayout}>

                <View style={{}}> 
                        <FlatList
                            //style={{height: "1%"}}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={categories}
                            renderItem={({item}) => (
                                <TouchableOpacity 
                                onPress={() => 
                                    {
                                        screenNavigate.navigate("Category")
                                        selectedCategory = item.categoryName
                                    }
                                }>
                                    <Image style={styles.categoryImage} source={{uri: item.imageUrl}}/>
                                    <Text style={styles.categoryTitles}> {item.categoryName}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <View style={{borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, marginRight: "5%", marginLeft: "5%"}}/>
                    </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1,  paddingVertical: "3%" }}>

                    <View style={{paddingTop: "5%"}}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Bakery</Text>
                            <Text 
                                style={{marginLeft: "45%", fontSize: 15}} 
                                onPress={() => {
                                    screenNavigate.navigate("Category") 
                                    selectedCategory = 'Bakery'
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
                                    screenNavigate.navigate("Category") 
                                    selectedCategory = 'Fruit'
                                }}
                            >
                                View Category {'>'}
                            </Text>
                        </View>
                    </View>

                    {productDisplay(fruitList)}
                    
                    {/* https://www.npmjs.com/package/react-native-increment-decrement-button */}

                    <View style={{paddingTop: "5%" }}>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{marginLeft: "5%", fontSize: 18, fontWeight: "bold",}}>Dairy</Text>
                            <Text 
                                style={{marginLeft: "49%", fontSize: 15}}
                                onPress={() => {
                                    screenNavigate.navigate("Category") 
                                    selectedCategory = 'Dairy'
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
                                    screenNavigate.navigate("Category") 
                                    selectedCategory = 'Plant Based'
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
                                    screenNavigate.navigate("Category") 
                                    selectedCategory = 'Poultry'
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
                                    screenNavigate.navigate("Category") 
                                    selectedCategory = 'Vegetables'
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
        //top: "%",
        width: "10%",
        height: "10%",

    },

    screenVerticalLayout: {
        flex: 1,
        // alignItems: 'center',
        //paddingTop: "25%",
        // height: "130%",
        marginTop: "20%",
    },

    scrollHorizontalView: {
        flex: 1,
        height: "20%",
        // backgroundColor: 'red',
        // marginTop: "20%",
        // marginBottom: "60%"
    },

    categoryTitles: {
        //padding: "5%",
        marginLeft:20,
        textAlign: 'center',
        fontSize: 16,
        
    },

    categoryImage:{
        // top: "10%",
        // left: "10%",
        width: 90,
        height: 90,
        borderRadius:10,
        marginLeft:25
         
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

    quantityFormat: {
        // flex: 1,
        flexDirection: 'row',
    }
})