import { createSlice } from "@reduxjs/toolkit";
import { Alert, ToastAndroid } from "react-native";

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        groceryBasket: []
    },
    reducers: {
        addToBasket: (state, action) => {

            const product = state.groceryBasket.find(product => product.productName == action.payload.searchResult.productName)

            // if product is already in the basket just increase quantity
            if (product) {
                product.quantity += action.payload.quantity
            }
            else 
            {
                state.groceryBasket.push({
                    basketID: Math.floor(Math.random() * 1000),
                    productName: action.payload.searchResult.productName,
                    description: action.payload.searchResult.description,
                    quantity: action.payload.quantity,
                    originalPrice: parseFloat((action.payload.searchResult.price).toFixed(1)),
                    price: parseFloat((action.payload.searchResult.price * action.payload.quantity).toFixed(1)),
                    imageAuthor: action.payload.searchResult.imageAuthor,
                    imageSource: action.payload.searchResult.imageSource,
                    imageUrl: action.payload.searchResult.imageUrl
                });
            }


            console.log(state.groceryBasket)

            ToastAndroid.show('Added to basket', ToastAndroid.SHORT);
        },
        removeFromBasket: (state, action) => {
            state.groceryBasket = state.groceryBasket.filter(
                // Create a new array without the selected item
                product => product.basketID !== action.payload.selectedID
            );

            console.log(state.groceryBasket);

            ToastAndroid.show('Item removed from basket', ToastAndroid.SHORT);

        },
        clearBasket: (state, action) => {
            if (state.groceryBasket.length == 0)
            {
                ToastAndroid.show('Basket is empty', ToastAndroid.SHORT);
            }
            else
            {
                state.groceryBasket = []
            }
            
            console.log(state.groceryBasket);

            ToastAndroid.show('Basket Emptied', ToastAndroid.SHORT);
        },

        updateProductQuantityAdd: (state, action) => {
            const product = state.groceryBasket.find(product => product.productName == action.payload.name)

            if (product)
            {
                product.quantity += 1
                product.price = parseFloat((product.quantity * product.originalPrice).toFixed(1))
            }

            console.log(product)
        },
        updateProductQuantitySubtract: (state, action) => {
            const product = state.groceryBasket.find(product => product.productName == action.payload.name)

            if (product)
            {
                if (product.quantity !== 1)
                {
                    product.quantity -= 1
                    product.price = parseFloat((product.quantity * product.originalPrice).toFixed(1))
                    
                }
                
            }

            console.log(product)
        },
    }
});

export const getGroceryBasket = state => state.basket.groceryBasket

export const {addToBasket, removeFromBasket, clearBasket, updateProductQuantityAdd, updateProductQuantitySubtract} = basketSlice.actions;

export default basketSlice.reducer