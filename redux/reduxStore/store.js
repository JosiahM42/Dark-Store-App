import { configureStore, createStore } from "@reduxjs/toolkit";

import basketReducer from "../reducers/basket";

export default store =  configureStore({
    reducer: {
        basket: basketReducer
    }
});