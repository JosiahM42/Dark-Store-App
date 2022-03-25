import React, {useState, useEffect} from'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Button} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { auth} from '../firebase/firebaseConfig';
import { fullBasket } from './productScreen';

// export const [productBasket, setProductBasket] = useState([]);

const BasketScreen = () => {
    const screenNavigate = useNavigation();
    const [productBasket, setProductBasket] = useState([]);

    //let test = fullBasket

    let productSearch = (searchArray) => {
        for (let selected = 0; selected < searchArray.length; selected++) 
        {
            if (searchArray[selected].productName === searchResult.productName) 
            {
                //console.log(searchArray[product])
                return true
            }
            // Checks if iterator is at the end of list
            if ((selected + 1) == searchArray.length)
            {
                //return "object is not in array";
                return false
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setProductBasket([...productBasket, fullBasket])
        }, 10);
        
        //setProductBasket((previous) => [...previous, fullBasket])
    }, [fullBasket])

    //test = []

    // function display() {
    //     console.log(productBasket);
    //     //console.log("works")
    // }

    // const addToBasket = (product) => {
    //     // const inBasket = productSearch(productBasket)
    //     // if (inBasket === true)
    //     // {
    //     //     setProductBasket(productBasket.map({product, quantity: productBasket.quantity + 1}));
    //     // }
    //     // else
    //     // {
    //     //     setProductBasket([{product, quantity: 1}]);
    //     // }
    //     setProductBasket([{product, quantity: 1}]);

    // };

    return (
        <View style={styles.screenVerticalLayout}>
            <Button onPress={() => console.log(productBasket)} title="Testing"><Text>Testing</Text></Button>
            {/* <Button onPress={display()} title="Testing"><Text>Testing</Text></Button> */}
        </View>
    )
}

export default BasketScreen

const styles = StyleSheet.create({
    button: {
        top: "20%",
    },

    screenVerticalLayout: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "25%",
    },
})