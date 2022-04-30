import { createSlice } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
    name: 'selected',
    initialState: {
        selectedProduct: "",
        selectedCategory: "",
        existingUser: false
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload.selectedProduct
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload.selectedCategory
        },
        checkUser: (state, action) => {
            state.existingUser =  action.payload.check
        },
    }

});


export const getProduct = state => state.selected.selectedProduct
export const getCategory = state => state.selected.selectedCategory
export const getExistingUser = state => state.selected.existingUser

export const { setSelectedProduct, setSelectedCategory, checkUser } = selectedSlice.actions;

export default selectedSlice.reducer