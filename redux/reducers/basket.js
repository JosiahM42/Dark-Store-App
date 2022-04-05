import { createSlice } from "@reduxjs/toolkit";
import { Alert, ToastAndroid } from "react-native";

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        groceryBasket: []
    },
    reducers: {
        addToBasket: (state, action) => {
            state.groceryBasket.push({
                basketID: Math.floor(Math.random() * 1000),
                productName: action.payload.searchResult.productName,
                description: action.payload.searchResult.description,
                quantity: action.payload.quantity,
                price: parseFloat((action.payload.searchResult.price * action.payload.quantity).toFixed(1)),
                imageAuthor: action.payload.searchResult.imageAuthor,
                imageSource: action.payload.searchResult.imageSource,
                imageUrl: action.payload.searchResult.imageUrl
            });

            console.log(state.groceryBasket)

            ToastAndroid.show('Added to basket', ToastAndroid.SHORT);
        }
    }
});

export const getGroceryBasket = state => state.basket.groceryBasket

export const {addToBasket} = basketSlice.actions;

export default basketSlice.reducer