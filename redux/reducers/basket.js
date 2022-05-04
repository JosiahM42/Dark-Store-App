import { createSlice } from "@reduxjs/toolkit";
import { Alert, ToastAndroid } from "react-native";

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        groceryBasket: [],
        finalPrice: 0,
        totalPrice: 0,
        deliveryTotal: 0,
    },
    reducers: {
        addToBasket: (state, action) => {
            // Check if the the passed product is already in the basket
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

            console.log(state.groceryBasket);
            // Displays an alert at the bottom of the screen
            // THIS IS ONLY VIEWABLE ON ANDROID DEVICES
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
            if (state.groceryBasket.length != 0){
                state.groceryBasket = []
            }
        },

        updateProductQuantityAdd: (state, action) => {
            // Locates the selected product 
            const product = state.groceryBasket.find(product => product.productName == action.payload.name)
            if (product)
            {
                // Increase both quantity and price
                product.quantity += 1
                product.price = parseFloat((product.quantity * product.originalPrice).toFixed(1))
            }
        },
        updateProductQuantitySubtract: (state, action) => {
            // Locates the selected product 
            const product = state.groceryBasket.find(product => product.productName == action.payload.name)
            if (product)
            {
                if (product.quantity !== 1)
                {
                    // Reduces both quantity and price
                    product.quantity -= 1
                    product.price = parseFloat((product.quantity * product.originalPrice).toFixed(1))
                    
                } 
            }
        },
        setFinalPrice: (state, action) => {
            state.finalPrice = action.payload.finalPrice
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload.totalPrice
        },
        setDeliveryTotal: (state, action) => {
            state.deliveryTotal = action.payload.deliveryTotal
        },
    }
});

export const getGroceryBasket = state => state.basket.groceryBasket
export const getFinalPrice = state => state.basket.finalPrice
export const getTotalPrice = state => state.basket.totalPrice
export const getDeliveryTotal = state => state.basket.deliveryTotal

export const {
    addToBasket,
    removeFromBasket,
    clearBasket, 
    updateProductQuantityAdd, 
    updateProductQuantitySubtract,
    setFinalPrice,
    setTotalPrice,
    setDeliveryTotal
} = basketSlice.actions;

export default basketSlice.reducer