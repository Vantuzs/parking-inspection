import { configureStore } from "@reduxjs/toolkit";
import parkOfficerReducer from "./slices/parkOfficerSlice";
import protocolReducer from './slices/protocolSlice'

const store = configureStore({
  reducer: {
    parkOfficers: parkOfficerReducer,
    protocols: protocolReducer

  },
});

export default store;
