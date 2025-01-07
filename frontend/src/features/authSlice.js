import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
    user : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5001/api/login", {
            username: user.username,
            password: user.password,
        });
        console.log("API Response:", response.data); // Debug log
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Login failed. Please try again.";
        console.error("Login Error:", message); // Debug log
        return thunkAPI.rejectWithValue(message);
    }
});

export const getMe = createAsyncThunk("user/getMe", async ( thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:5001/api/me");
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Login failed. Please try again.";
        console.error("Login Error:", message); // Debug log
        return thunkAPI.rejectWithValue(message);
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
    
       await axios.delete("http://localhost:5001/api/logout");

});

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        reset : (state) => initialState
    },
    extraReducers : (builder) => {
        builder.addCase(LoginUser.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        // get user login
        builder.addCase(getMe.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

    }
})

export const {reset} = authSlice.actions    
export default authSlice.reducer