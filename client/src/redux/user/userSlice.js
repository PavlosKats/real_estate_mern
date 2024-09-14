import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error:null,
    loading:false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess:(state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure:(state, action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) =>{
            state.loading = true;
        },
        updateUserSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        signOutUser: (state) =>{
            state.currentUser = null; //clear user data
            state.loading = false; // reset loading state
            state.error = null;// reset error state
        },
        deleteUser: (state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        }
    }
})

export const {signInStart, signInSuccess, signInFailure,updateUserFailure,updateUserStart, updateUserSuccess, signOutUser, deleteUser} = userSlice.actions;

export default userSlice.reducer;