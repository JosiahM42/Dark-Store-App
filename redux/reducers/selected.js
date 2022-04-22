import { createSlice } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
    name: 'selected',
    initialState: {
        selectedProduct: "",
        selectedCategory: ""
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload.selectedProduct
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload.selectedCategory
        }
    }

});


export const getProduct = state => state.selected.selectedProduct
export const getCategory = state => state.selected.selectedCategory

export const {setSelectedProduct, setSelectedCategory} = selectedSlice.actions;

export default selectedSlice.reducer