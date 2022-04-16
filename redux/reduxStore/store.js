import { configureStore, createStore } from "@reduxjs/toolkit";
//import address from "../reducers/address";

import basketReducer from "../reducers/basket";
import addressReducer from "../reducers/address";
import userReducer from "../reducers/users";

export default store =  configureStore({
    reducer: {
        basket: basketReducer,
        address: addressReducer,
        user: userReducer
    }
});