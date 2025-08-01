import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../API";

const SLICE_NAME = "parkOfficer";

const getParkOfficers = createAsyncThunk(
  `${SLICE_NAME}/getParkOfficers`,
  async (param, thunkAPI) => {
    try {
      const {
        data: { data: parkOfficers },
      } = await API.getParkOfficers();

      return parkOfficers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/deleteParkOfficer`,
  async (parkOfficerId,thunkAPI) =>{
    try {
      await API.deleteParkOfficer(parkOfficerId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const dismissParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/dismissParkOfficer`,
  async (parkOfficerId,thunkAPI) =>{
    try {
      await API.dismissParkOfficer(parkOfficerId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const createParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/createParkOfficer`,
  async(body,thunkAPI) =>{
    try {
      await API.createParkOfficer(body)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const updateParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/updateParkOfficer`,
  async ({parkOfficerId,updatedData},thunkAPI) =>{
    try {
      await API.updateParkOfficer(parkOfficerId,updatedData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const initialState = {
  parkOfficers: [],
  isLoading: false,
  error: null,
};

const parkOfficerSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getParkOfficers.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(getParkOfficers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.parkOfficers = action.payload;
    });
    builder.addCase(getParkOfficers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteParkOfficer.pending,(state,action)=>{
      state.isLoading = true;
      state.error = null;
    })

    builder.addCase(deleteParkOfficer.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.error = null;
    })

    builder.addCase(deleteParkOfficer.rejected,(state,action)=>{
      state.isLoading = false;
      state.error = action.payload;
    })

    builder.addCase(dismissParkOfficer.pending,(state,action)=>{
      state.isLoading = true;
      state.error = null;
    })

    builder.addCase(dismissParkOfficer.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.error = null;
    })

    builder.addCase(dismissParkOfficer.rejected,(state,action)=>{
      state.isLoading = false;
      state.error = action.payload;
    })

    builder.addCase(createParkOfficer.pending,(state,action)=>{
      state.isLoading = true;
      state.error = null;
    })

    builder.addCase(createParkOfficer.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.error = null;
    })

    builder.addCase(createParkOfficer.rejected,(state,action)=>{
      state.isLoading = false;
      state.error = action.payload;
    })

    builder.addCase(updateParkOfficer.pending,(state,action)=>{
      state.isLoading = true;
      state.error = null;
    })

    builder.addCase(updateParkOfficer.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.error = null;
    })

    builder.addCase(updateParkOfficer.rejected,(state,action)=>{
      state.isLoading = false;
      state.error = action.payload;
    })
  },
});

const { reducer } = parkOfficerSlice;

export { getParkOfficers,deleteParkOfficer,dismissParkOfficer,createParkOfficer,updateParkOfficer };

export default reducer;
