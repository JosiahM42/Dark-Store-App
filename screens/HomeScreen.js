import React, { useState, Component } from'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth,firestore } from '../firebase/firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';
import {productQuantity} from '../functions/IncrementDecrementButton';

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

export let selectedItem = ''

const HomeScreen = () => {

    const screenNavigate = useNavigation();

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

    // const saveGroceries = () => {
    //     //bakeryProducts.push(pullGroceries)
    //     // console.log(pullGroceries)
    //     console.log(bakeryList[0].description)
    // }

    const productDisplay = (categoryList, nextScreen) => {
        let quantity = new productQuantity();
        //let [quantity, setQuantity] = useState(0);

        return (
            <View style={{paddingTop: 10}}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categoryList.slice(0,4)}
                    renderItem={({item}) => (
                        <View> 
                            <TouchableOpacity onPress={() => {
                                screenNavigate.navigate(nextScreen)
                                selectedItem = item.productName
                            }
                                }>
                                <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                                <Text style={styles.productTitles}> {item.productName}</Text>
                                <Text style={{marginLeft: 80}}>£{item.price}0</Text>
                            </TouchableOpacity>
                            {/* <Text style={{marginLeft: 20}}>£{item.price}0</Text> */}
                            {/* <View style={{flexDirection:"row", justifyContent: 'space-around'}}>
                                <Text style={{marginLeft: 20}}>£{item.price}0</Text>
                                {/* {quantity.render()} */}
                                {/* {incrementDecrementCounter(10, 0, quantity, setQuantity)} */}
                            {/* </View> */}
                        </View> 

                    )}
                />
                <View style={{borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, marginRight: 20, marginLeft: 20}}/>
            </View>   
        )
    }

    return (
        
        <View style={styles.screenVerticalLayout}>

                <Button
                    title = "log out"
                    onPress={signOut}
                    style = {styles.button}
                />

            <View style={{}}> 
                    <FlatList
                        //style={{height: "1%"}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => screenNavigate.navigate("Basket")}>
                                <Image style={styles.categoryImage} source={{uri: item.imageUrl}}/>
                                <Text style={styles.categoryTitles}> {item.categoryName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={{borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, marginRight: 20, marginLeft: 20}}/>
                </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1,  paddingVertical: 20 }}>

                {/* <Text>Home Screen</Text>  */}

                {/*<Button
                    title = "upload"
                    onPress={signOut}
                    style = {styles.button}
                /> */}

                {/* <ScrollView horizontal={true} style={styles.scrollHorizontalView}>  */}
                    {/* <View>
                        <Text>{categories.categoryName}</Text>
                    </View> */}
                    
                {/* </ScrollView> */}

                
                {/* <View style={{height: "20%" }}>  */}
                {/* <View style={{}}> 
                    <FlatList
                        //style={{height: "1%"}}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => screenNavigate.navigate("Basket")}>
                                <Image style={styles.categoryImage} source={{uri: item.imageUrl}}/>
                                <Text style={styles.categoryTitles}> {item.categoryName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={{borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, marginRight: 20, marginLeft: 20}}/>
                </View> */}

                {/* <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/> */}
                            
                <View style={{paddingTop: 10}}>

                    <View style={{flexDirection:"row"}}>
                        <Text style={{marginLeft: 20, fontSize: 18, fontWeight: "bold",}}>Bakery</Text>
                        <Text style={{marginLeft: 200, fontSize: 15}}>View Category {'>'}</Text>
                    </View>
                </View>

                {productDisplay(bakeryList, "Product")}
                

                <View style={{paddingTop: 10}}>

                    <View style={{flexDirection:"row"}}>
                        <Text style={{marginLeft: 20, fontSize: 18, fontWeight: "bold",}}>Fruit</Text>
                        <Text style={{marginLeft: 200, fontSize: 15}}>View Category {'>'}</Text>
                    </View>
                </View>

                {productDisplay(fruitList, "Product")}
                
                {/* https://www.npmjs.com/package/react-native-increment-decrement-button */}

                <View style={{paddingTop: 10 }}>

                    <View style={{flexDirection:"row"}}>
                        <Text style={{marginLeft: 20, fontSize: 18, fontWeight: "bold",}}>Dairy</Text>
                        <Text style={{marginLeft: 200, fontSize: 15}}>View Category {'>'}</Text>
                    </View>
                </View>
                
                {productDisplay(dairyList, "Product")}


                <View style={{paddingTop: 10 }}>

                    <View style={{flexDirection:"row"}}>
                        <Text style={{marginLeft: 20, fontSize: 18, fontWeight: "bold",}}>Plant Based</Text>
                        <Text style={{marginLeft: 200, fontSize: 15}}>View Category {'>'}</Text>
                    </View>
                </View>

                {productDisplay(plantBasedList, "Basket")}

                <View style={{paddingTop: 10 }}>

                    <View style={{flexDirection:"row"}}>
                        <Text style={{marginLeft: 20, fontSize: 18, fontWeight: "bold",}}>Poultry</Text>
                        <Text style={{marginLeft: 200, fontSize: 15}}>View Category {'>'}</Text>
                    </View>
                </View>

                {productDisplay(poultryList, "Basket")}

                <View style={{paddingTop: 10 }}>

                    <View style={{flexDirection:"row"}}>
                        <Text style={{marginLeft: 20, fontSize: 18, fontWeight: "bold",}}>Vegetables</Text>
                        <Text style={{marginLeft: 200, fontSize: 15}}>View Category {'>'}</Text>
                    </View>
                </View>

                {productDisplay(vegetableList, "Basket")}


            </ScrollView>
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