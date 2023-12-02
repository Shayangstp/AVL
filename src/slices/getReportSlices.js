import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";

const initialState = {
  getReportFromDate: null,
  getReportToDate: null,
  currentCategoryReport: "",
  showVehicleList: false,
};

const getReportSlices = createSlice({
  name: "getReport",
  initialState,
  reducers: {
    RsetGetReportFromDate: (state, { payload }) => {
      return { ...state, getReportFromDate: payload };
    },
    RsetGetReportToDate: (state, { payload }) => {
      return { ...state, getReportToDate: payload };
    },
    RsetCurrentCategoryReport: (state, { payload }) => {
      return { ...state, currentCategoryReport: payload };
    },
    RsetShowVehicleList: (state, { payload }) => {
      return { ...state, showVehicleList: payload };
    },
  },
});

export const {
  RsetGetReportFromDate,
  RsetGetReportToDate,
  RsetCurrnetCategoryReport,
  RsetShowVehicleList,
} = getReportSlices.actions;

export const selectGetReportFromDate = (state) =>
  state.getReport.getReportFromDate;
export const selectGetReportToDate = (state) => state.getReport.getReportToDate;
export const selectCurrentCategoryReport = (state) =>
  state.getReport.currentCategoryReport;
export const selectShowVehicleList = (state) => state.getReport.showVehicleList;

export default getReportSlices.reducer;
