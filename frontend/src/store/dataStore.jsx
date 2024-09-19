// creating the store
import { combineSlices, configureStore, createSlice } from "@reduxjs/toolkit";

const tableDataSlice = createSlice({
  name: "tableData",
  initialState: [],
  reducers: {
    addData: (state, action) => {
      console.log("addData");
      console.log(action.payload);
      return [...state, { ...action.payload }];
    },
    viewData: (state, action) => {
      return state;
    },
  },
});
const tabldDataStore = configureStore({
  reducer: {
    tableData: tableDataSlice.reducer,
  },
});
// export const tableDataActions = tabldDataStore.actions;
export const tableDataActions = tableDataSlice.actions;
export default tabldDataStore;
