import React, {useState,} from'react';
import { StyleSheet, Text, View, FlatList, Image,  TouchableHighlight, TextInput, Button} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { auth} from '../firebase/firebaseConfig';

import { useSelector } from 'react-redux';
import { getGroceryBasket } from '../redux/reducers/basket';

import { Ionicons} from '@expo/vector-icons';

// https://www.youtube.com/watch?v=Xfgjh2QbM-U

// See Redux folder


const BasketScreen = () => {
    const screenNavigate = useNavigation();
    const basket = useSelector(getGroceryBasket)

    return (
        <View>
            {/* <Button onPress={() => console.log(basket)} title="Testing"><Text>Testing</Text></Button> */}
            <View style={{paddingLeft: "85%", paddingTop: "14%",}}>
              <Ionicons name="trash-outline" size={40}/>  
            </View>
            <Text style={styles.title}>Your Basket</Text>
            
            
            
        <View style={styles.screenVerticalLayout}>
            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={basket}
                    renderItem={({item}) => (
                        <View style={{flexDirection:"row", justifyContent: 'space-around'}}> 

                            <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                            <Text style={styles.productTitles}> {item.productName}</Text>
                            <Text>£{item.price}0</Text>
                            <Text>    {item.quantity}</Text>
                        </View> 

                    )}   
            /> 
        </View>
            
            
        </View>
    )
}

export default BasketScreen

const styles = StyleSheet.create({
    // button: {
    //     top: "20%",
    // },

    screenVerticalLayout: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "25%",
    },

    title: {
        marginLeft: 30,
        fontSize: 30,
        //paddingTop: "1%",
    },

    productTitles: {
        // marginLeft:6,
        textAlign: 'left',
        fontSize: 14,
        //justifyContent: 'center',
    },
    productImage: {
        width: 20,
        height: 20,
        borderRadius:10,
        // marginLeft:5,
        // marginRight: 25
    },
})