import { createSlice } from "@reduxjs/toolkit";
import { Alert, ToastAndroid } from "react-native";

export const addressSlice = createSlice({
    name: 'address',
    initialState: {
        location: [],
        longitude: 0,
        latitude: 0,
        error: false,
    },
    reducers: {
        setUserAddress: (state, action) => {
            
            state.longitude = action.payload.longitude
            state.latitude = action.payload.latitude

            // state.longitude = {...state, longitude: action.payload.longitude}
            // state.latitude = {...state, latitude: action.payload.latitude}

            //state.latLong.push({longitude: action.payload.longitude, latitude: action.payload.latitude})

            // console.log("Longitude: ", state.longitude)
            // console.log("Latitude: ", state.latitude)

        },
        setLocation: (state, action) => {
            //state.location = action.payload.location

            state.location.push({
                latitude: action.payload.location.coords.latitude,
                longitude: action.payload.location.coords.longitude,
            })

            console.log("User Location", state.location)
        },
        setError: (state, action) => {
            state.error = true

            //console.log("User Location", state.location)
        },
    }

})

export const getlongitude = state => state.address.longitude
export const getLatitude = state => state.address.latitude
export const getLocation = state => state.address.longitude
export const getError = state => state.address.error
export const {setUserAddress, setLocation, setError} = addressSlice.actions;

export default addressSlice.reducer
