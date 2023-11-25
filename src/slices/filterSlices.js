import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";

const initialState = {
  showFilter: false,
  filterValue: "",
};

const filterSlices = createSlice({
  name: "filter",
  initialState,
  reducers: {
    RsetShowFilter: (state, { payload }) => {
      return { ...state, showFilter: payload };
    },
    RsetFilterValue: (state, { payload }) => {
      return { ...state, filterValue: payload };
    },
  },
});

export const { RsetShowFilter, RsetFilterValue } = filterSlices.actions;

export const selectShowFilter = (state) => state.filter.showFilter;
export const selectFilterValue = (state) => state.filter.filterValue;

export default filterSlices.reducer;
