import { createSlice, current } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState:{
        currentUser: null,
        isFetching:false,
        status: false,
        error: false
    },
    reducers : {
        signInStart : (state,action) => {
            state.currentUser = action.payload;
            state.isFetching = false;
        },
        signInSuccess : (state,action) => {
            state.currentUser = action.payload;
            state.isFetching = false;
            state.status = true;
            state.error = false;
        },
        signInFailure : (state,action) => {
            state.isFetching = false;
            state.currentUser = null;
            state.status = false;
            state.error = false;
        },
        updateUser : (state,action) => {
            state.currentUser = action.payload;
            state.isFetching = false;
            state.status = true;
            state.error = false;
        },
        postStart : (state,action) => {
            state.isFetching = true;
            state.error = null;
        },
        postSuccess : (state,action) => {
            state.isFetching = false;
            state.error = null;
        },
        postError : (state,action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        signOut : (state,action) => {
            state.currentUser = null;
            state.error = null;
            state.isFetching = false;
        }
    }
})

export const {signInStart,signInSuccess,signInFailure,postStart,postSuccess,postError,signOut,updateUser} = userSlice.actions;
export default userSlice.reducer
