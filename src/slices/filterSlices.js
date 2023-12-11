import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";

const initialState = {
  showFilter: false,
  filterValue: "",
  filterImei: "",
  filterDeviceNumber: "",
  filterDriverName: "",
  filterDriverNumber: "",
  filterVehicleNumber: "",
  filterGroup: "",
  filterCompany: "",
  filterUsage: "",
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
    RsetFilterImei: (state, { payload }) => {
      return { ...state, filterImei: payload };
    },
    RsetFilterDeviceNumber: (state, { payload }) => {
      return { ...state, filterDeviceNumber: payload };
    },
    RsetFilterDriverName: (state, { payload }) => {
      return { ...state, filterDriverName: payload };
    },
    RsetFilterDriverNumber: (state, { payload }) => {
      return { ...state, filterDriverNumber: payload };
    },
    RsetFilterVehicleNumber: (state, { payload }) => {
      return { ...state, filterVehicleNumber: payload };
    },
    RsetFilterGroup: (state, { payload }) => {
      return { ...state, filterGroup: payload };
    },
    RsetFilterCompany: (state, { payload }) => {
      return { ...state, filterCompany: payload };
    },
    RsetFilterUsage: (state, { payload }) => {
      return { ...state, filterUsage: payload };
    },
  },
});

export const {
  RsetShowFilter,
  RsetFilterValue,
  RsetFilterImei,
  RsetFilterDeviceNumber,
  RsetFilterDriverName,
  RsetFilterDriverNumber,
  RsetFilterVehicleNumber,
  RsetFilterGroup,
  RsetFilterCompany,
  RsetFilterUsage,
} = filterSlices.actions;

export const selectShowFilter = (state) => state.filter.showFilter;
export const selectFilterValue = (state) => state.filter.filterValue;
export const selectFilterImei = (state) => state.filter.filterImei;
export const selectFilterDeviceNumber = (state) =>
  state.filter.filterDeviceNumber;
export const selectFilterDriverNumber = (state) =>
  state.filter.filterDriverNumber;
export const selectFilterDriverName = (state) => state.filter.filterDriverName;
export const selectFilterVehicleNumber = (state) =>
  state.filter.filterVehicleNumber;
export const selectFilterGroup = (state) => state.filter.filterVehicleGroup;
export const selectFilterCompany = (state) => state.filter.filterVehicleCompany;
export const selectFilterUsage = (state) => state.filter.filterVehicleUsage;

export default filterSlices.reducer;
