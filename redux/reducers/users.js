import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: []
    },
    reducers: {
        getUsersData: (state, action) => {
            // Checks if the user data has already been pulled
            const checkUser = state.user.find(users => users.name === action.payload.details.name)

            // if the user data has not been pulled or has been updated 
            if(!checkUser){
                state.user.push({
                    id: action.payload.details.id,
                    name: action.payload.details.name,
                    phone: action.payload.details.phone,
                    email: action.payload.details.email,
                    address: action.payload.details.address
                })
            }
            
        },
        // getUsersData: (state, action) => {
        //     console.log("users \n",action.payload.details)

        //     //const checkUser = state.user.find(users => users.name === action.payload.details.name)
        //     //console.log(checkUser)


        //     state.user.push({
        //         id: action.payload.details.id,
        //         name: action.payload.details.name,
        //         phone: action.payload.details.phone,
        //         email: action.payload.details.email
        //     })
        //     // state.user.push({
        //     //     id: "test",
        //     //     name: "test",
        //     //     phone: "test",
        //     //     email: "test"
        //     // })

        //     // if(!checkUser){
        //     //     state.user.push({
        //     //         id: action.payload.id,
        //     //         name: action.payload.name,
        //     //         phone: action.payload.phone,
        //     //         email: action.payload.email
        //     //     })
        //     // }
            
        //},
        clearUserData: (state, action) => {
            state.user = []
        }
    }

});


export const getUser = state => state.user.user

export const {getUsersData, clearUserData} = userSlice.actions;

export default userSlice.reducer