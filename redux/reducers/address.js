import { createSlice } from "@reduxjs/toolkit";
import { Alert, ToastAndroid } from "react-native";

export const addressSlice = createSlice({
    name: 'address',
    initialState: {
        latitude: 0,
        longitude:0,
        streetAddress: "",
        postcode: "",
        city: "", 
        address: "",

    },
    reducers: {
        setCoordinates: (state, action) => {
            state.longitude = action.payload.longitude
            state.latitude = action.payload.latitude
        },
        setPostcode: (state, action) => {
            state.postcode = action.payload.postcode
        },
        setStreetAddress: (state, action) => {
            state.streetAddress = action.payload.streetAddress
        },
        setCity: (state, action) => {
            state.city = action.payload.city
        },
        setAddress: (state, action) => {
            state.address = action.payload.address
        },
    }

})

export const getlongitude = state => state.address.longitude
export const getLatitude = state => state.address.latitude
export const getAddress = state => state.address.address
export const getStreetAddress = state => state.address.streetAddress
export const getPostcode = state => state.address.postcode
export const getCity = state => state.address.city
export const {setPostcode, setStreetAddress, setCity, setAddress, setCoordinates} = addressSlice.actions;

export default addressSlice.reducer
