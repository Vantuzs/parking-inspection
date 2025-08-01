import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from '../../API'
import reducer from "./parkOfficerSlice";

const SLICE_NAME = 'users';

const registerUser = createAsyncThunk(
    `${SLICE_NAME}/registerUser`,
    async(userData,thunkAPI)=>{
        try {
            const {data: {data: registeredUser}} = await API.registerUser(userData)

            return registeredUser;
        } catch (error) {
           return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const loginUser = createAsyncThunk(
    `${SLICE_NAME}/loginUser`,
    async(userData,thunkAPI)=>{
        try {
            const {data: {data: user}} = await API.loginUser(userData)

            return user;
        } catch (error) {
           return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const intitialState = {
    user: null,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: SLICE_NAME,
    intitialState,
    extraReducers: (builder)=>{
        builder.addCase(loginUser.pending,(state,action)=>{
            state.error = null;
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.error = null;
            state.isLoading = false;
            state.user = action.payload
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.error = action.payload;
            state.isLoading = false;
        })
        builder.addCase(registerUser.pending,(state,action)=>{
            state.error = null;
            state.isLoading = true;
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.error = null;
            state.isLoading = false;
            state.user = action.payload
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.error = action.payload;
            state.isLoading = false;
        })
    }
})

const { reduser } = userSlice

export {loginUser,registerUser}

export default reducer