import { createSlice } from "@reduxjs/toolkit";
import { Alert, ToastAndroid } from "react-native";

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        deliveryAddress: "",
        orderedGroceries: [],
        orderTotal: 0,
        datePlaced: "",
        timePlaced: "",
        estimatedDeliveryTime: ""
    },
    reducers: {
        setDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload.address
        },
        setOrderedGroceries: (state, action) => {
            // state.orderedGroceries.push({
            //     basketID: action.payload.basket.basketID,
            //     productName: action.payload.basket.productName,
            //     quantity: action.payload.basket.quantity,
            //     price: action.payload.basket.price,
            //     imageUrl: action.payload.basket.imageUrl
            // });
            state.orderedGroceries = action.payload.basket
        },
        setOrderTotal: (state, action) => {
            state.orderTotal = action.payload.orderTotal
        },
        setDatePlaced: (state, action) => {
            state.datePlaced = action.payload.datePlaced
        },
        setTimePlaced: (state, action) => {
            state.timePlaced = action.payload.timePlaced
        },
        setEstimatedDeliveryTime: (state, action) => {
            state.estimatedDeliveryTime = action.payload.estimatedTime
        }
    }

})

export const getDeliveryAddress = state => state.order.deliveryAddress
export const getOrderedGroceries = state => state.order.orderedGroceries
export const getOrderTotal = state => state.order.orderTotal
export const getDatePlaced = state => state.order.datePlaced
export const getTimePlaced = state => state.order.timePlaced
export const getEstimatedDeliveryTime = state => state.order.estimatedDeliveryTime
export const {setDeliveryAddress, setOrderedGroceries, setOrderTotal, setDatePlaced, setTimePlaced, setEstimatedDeliveryTime} = orderSlice.actions;

export default orderSlice.reducer