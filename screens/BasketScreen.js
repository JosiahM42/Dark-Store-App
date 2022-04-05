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
    const [count, setCount] = useState()

    const updateQuantity = (item) => {

        //setCount(basket.quantity)
        setCount(item.quantity)
        //console.log(basket.quantity)
    }

    return (
        <View style={{flex:1}}>
            {/* <Button onPress={() => console.log(basket)} title="Testing"><Text>Testing</Text></Button> */}
            <View style={{paddingLeft: "85%", paddingTop: "14%",}}>
              <Ionicons name="trash-outline" size={40}/>  
            </View>
            <Text style={styles.title}>Your Basket</Text>
            
            <View style={styles.screenVerticalLayout}>
                <FlatList
                        showsVerticalScrollIndicator={false}
                        //style={{paddingBottom: 10}}
                        data={basket}
                        renderItem={({item}) => (
                            // <View style={{flexDirection:"row", justifyContent: 'space-around'}}>
                            <View style={{flex: 1, height: 100}}>
                                <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                                <Text style={styles.productTitles}> {item.productName}</Text>
                                <Text style={styles.productPrice}>£{item.price}0</Text>
                                
                                <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
                                <View style={styles.removeItem}>
                                    <Ionicons name="trash-outline" size={25}/>  
                                </View>
                    
                            </View> 
                        )}   
                /> 
            </View>
            
            <Text style={{fontSize: 20, bottom: "10%"}}>
                    Summary
            </Text>

            {/* <View style={{flex: 1, paddingTop: "10%"}}>
                <Text style={{fontSize: 20}}>
                    Summary
                </Text>
            </View> */}
            
            
        </View>
    )
}

export default BasketScreen

const styles = StyleSheet.create({
    // button: {
    //     top: "20%"
    // },

    screenVerticalLayout: {
        flex: 1,
        //alignItems: 'center',
        //marginBottom: 20,
        paddingTop: "10%",
        paddingBottom: "20%",
    },

    title: {
        marginLeft: 30,
        fontSize: 30,
        //paddingTop: "1%",
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

        bottom: 118, 
        left: 240, 
        height: 30
    },

    productQuantity: {
        bottom: 90, 
        left: '31%', 
        height: 22,
        fontSize: 15,
    }
    
})