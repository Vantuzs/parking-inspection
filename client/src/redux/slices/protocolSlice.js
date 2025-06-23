import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../API";

const SLICE_NAME = "protocol";

const getAllProtocols = createAsyncThunk(
  `${SLICE_NAME}/getAllProtocols`,
  async (param, thunkAPI) => {
    try {
      const {
        data: { data: protocols },
      } = await API.getAllProtocols();

      return protocols;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteProtocolById = createAsyncThunk(
    `${SLICE_NAME}/deleteProtocolById`,
    async({parkOfficerId,protocolId},thunkAPI)=>{
        try {
            await API.deleteProtocol(parkOfficerId,protocolId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const createProtocol = createAsyncThunk(
  `${SLICE_NAME}/createProtocol`,
  async({parkOfficerId,protocolBody},thunkAPI) =>{
    try {
      await API.createProtocol(parkOfficerId,protocolBody);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const getAllProtocolsById = createAsyncThunk(
  `${SLICE_NAME}getAllProtocolsById`,
  async(parkOfficerId,thunkAPI) =>{
    try {
      const {data: {data: protocols}} = await API.getAllProtocolsById(parkOfficerId)
      return protocols
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const updateProtocolById = createAsyncThunk(
  `${SLICE_NAME}/updateProtocolById`,
  async({parkOfficerId,protocolId,protocolBody},thunkAPI)=>{
    try {
      await API.updateProtocolById(parkOfficerId,protocolId,protocolBody)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const addImagesToProtocol = createAsyncThunk(
  `${SLICE_NAME}/addImagesToProtocol`,
  async({protocolId,images},thunkAPI)=>{
    try {
      await API.addProtocolImages(protocolId,images)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const initialState = {
  protocols: [],
  isLoading: false,
  error: null,
};

const protocolSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProtocols.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(getAllProtocols.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.protocols = action.payload;
    });
    builder.addCase(getAllProtocols.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProtocolById.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(deleteProtocolById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteProtocolById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(createProtocol.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(createProtocol.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getAllProtocolsById.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(getAllProtocolsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.protocols = action.payload;
    });
    builder.addCase(getAllProtocolsById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateProtocolById.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(updateProtocolById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updateProtocolById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(addImagesToProtocol.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(addImagesToProtocol.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addImagesToProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = protocolSlice;

export { getAllProtocols,deleteProtocolById,createProtocol,getAllProtocolsById,updateProtocolById,addImagesToProtocol};

export default reducer;
