import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";

const initialState = {
  getReportFromDate: null,
  getReportToDate: null,
  currentCategoryReport: "",
  showVehicleList: false,
  getReportVehiclesLocations: false,
  getReportAlarms: false,
  getReportGPSLocations: false,
  getReportVehiclesChanges: false,
  getReportDriversConditions: false,
  getReportGroups: "",
  getReportGroupsOptions: [],
  getReportDrivers: "",
  getReportDriversOptions: [],
  getReportVehiclesNumber: "",
  getReportVehiclesNumberOptions: [],
  getReportFromTime: 0,
  getReportToTime: 0,
  getReportFromSpeed: 0,
  getReportToSpeed: 0,
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
    RsetGetReportVehiclesLocations: (state, { payload }) => {
      return { ...state, getReportVehiclesLocations: payload };
    },
    RsetGetReportAlarms: (state, { payload }) => {
      return { ...state, getReportAlarms: payload };
    },
    RsetGetReportGPSLocations: (state, { payload }) => {
      return { ...state, getReportGPSLocations: payload };
    },
    RsetGetReportVehiclesChanges: (state, { payload }) => {
      return { ...state, getReportVehiclesChanges: payload };
    },
    RsetGetReportDriversConditions: (state, { payload }) => {
      return { ...state, getReportDriversConditions: payload };
    },
    RsetGetReportGroups: (state, { payload }) => {
      return { ...state, getReportGroups: payload };
    },
    RsetGetReportGroupsOptions: (state, { payload }) => {
      return { ...state, getReportGroupsOptions: payload };
    },
    RsetGetReportDrivers: (state, { payload }) => {
      return { ...state, getReportDrivers: payload };
    },
    RsetGetReportDriversOptions: (state, { payload }) => {
      return { ...state, getReportDriversOptions: payload };
    },
    RsetGetReportVehiclesNumber: (state, { payload }) => {
      return { ...state, getReportVehiclesNumber: payload };
    },
    RsetGetReportVehiclesNumberOptions: (state, { payload }) => {
      return { ...state, getReportVehiclesNumberOptions: payload };
    },
    RsetGetReportFromTime: (state, { payload }) => {
      return { ...state, getReportFromTime: payload };
    },
    RsetGetReportToTime: (state, { payload }) => {
      return { ...state, getReportToTime: payload };
    },
    RsetGetReportFromSpeed: (state, { payload }) => {
      return { ...state, getReportFromSpeed: payload };
    },
    RsetGetReportToSpeed: (state, { payload }) => {
      return { ...state, getReportToSpeed: payload };
    },
  },
});

export const {
  RsetGetReportFromDate,
  RsetGetReportToDate,
  RsetCurrnetCategoryReport,
  RsetShowVehicleList,
  RsetGetReportVehiclesLocations,
  RsetGetReportAlarms,
  RsetGetReportGPSLocations,
  RsetGetReportVehiclesChanges,
  RsetGetReportDriversConditions,
  RsetGetReportGroups,
  RsetGetReportGroupsOptions,
  RsetGetReportDrivers,
  RsetGetReportDriversOptions,
  RsetGetReportVehiclesNumber,
  RsetGetReportVehiclesNumberOptions,
  RsetGetReportFromTime,
  RsetGetReportToTime,
  RsetGetReportFromSpeed,
  RsetGetReportToSpeed,
} = getReportSlices.actions;

export const selectGetReportFromDate = (state) =>
  state.getReport.getReportFromDate;
export const selectGetReportToDate = (state) => state.getReport.getReportToDate;
export const selectCurrentCategoryReport = (state) =>
  state.getReport.currentCategoryReport;
export const selectShowVehicleList = (state) => state.getReport.showVehicleList;
export const selectGetReportVehiclesLocations = (state) =>
  state.getReport.getReportVehiclesLocations;
export const selectGetReportAlarms = (state) => state.getReport.getReportAlarms;
export const selectGetReportGPSLocations = (state) =>
  state.getReport.getReportGPSLocations;
export const selectGetReportVehiclesChanges = (state) =>
  state.getReport.getReportVehiclesChanges;
export const selectGetReportDriversConditions = (state) =>
  state.getReport.getReportDriversConditions;
export const selectGetReportGroups = (state) => state.getReport.getReportGroups;
export const selectGetReportGroupsOptions = (state) =>
  state.getReport.getReportGroupsOptions;
export const selectGetReportDrivers = (state) =>
  state.getReport.getReportDrivers;
export const selectGetReportDriversOptions = (state) =>
  state.getReport.getReportDriversOptions;
export const selectGetReportVehiclesNumber = (state) =>
  state.getReport.getReportVehiclesNumber;
export const selectGetReportVehiclesNumberOptions = (state) =>
  state.getReport.getReportVehiclesNumberOptions;
export const selectGetReportFromTime = (state) =>
  state.getReport.getReportFromTime;
export const selectGetReportToTime = (state) => state.getReport.getReportToTime;
export const selectGetReportFromSpeed = (state) =>
  state.getReport.getReportFromSpeed;
export const selectGetReportToSpeed = (state) =>
  state.getReport.getReportToSpeed;

export default getReportSlices.reducer;
