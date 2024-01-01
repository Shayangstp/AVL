import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";
import {
  getGroupList,
  postReportLastLocation,
} from "../services/reportServices";
import { RsetFormErrors } from "./mainSlices";

const initialState = {
  getReportFromDate: null,
  getReportToDate: null,
  currentCategoryReport: "",
  getReportVehiclesLocations: false,
  getReportAlarms: false,
  getReportGPSLocations: false,
  getReportVehiclesChanges: false,
  getReportDriversConditions: false,

  getReportGroupsOptions: [],
  getReportDrivers: "",
  getReportDriversOptions: [],
  getReportVehiclesNumber: "",
  getReportVehiclesNumberOptions: [],
  getReportFromTime: 0,
  getReportToTime: 0,
  getReportFromSpeed: 0,
  getReportToSpeed: 0,
  getReportGroupList: [],
  getReportVehicleList: [],
  getReportSelectedItems: [],
  getReportViewPathCordinates: [],
  getReportGroupValue: "",
  getReportVehicleValue: "",

  //
  getReportList: [],
  showReportList: false,
};

export const handleGroupList = createAsyncThunk(
  "getReport/handleGroupList",
  async (obj, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const getGroupListRes = await getGroupList(token);
      console.log(getGroupListRes);
      dispatch(
        RsetGetReportGroupList(
          getGroupListRes.data.populateUser.map((group) => {
            return group;
          })
        )
      );

      const vehicleList = getGroupListRes.data.populateUser.map((group) => {
        return group.devices;
      });

      dispatch(RsetGetReportVehicleList(vehicleList.flat()));
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleViewPath = createAsyncThunk(
  "getReport/handleViewPath",
  async (obj, { dispatch, getState }) => {
    const { getReportFromDate, getReportToDate, getReportSelectedItems } =
      getState().getReport;
    try {
      const token = localStorage.getItem("token");
      const values = {
        bTime: String(getReportFromDate),
        eTime: String(getReportToDate),
        devices: getReportSelectedItems,
      };
      console.log(values);
      const postReportLastLocationRes = await postReportLastLocation(
        values,
        token
      );
      console.log(postReportLastLocationRes);
      if (postReportLastLocationRes.data.code === 200) {
        dispatch(
          RsetGetReportViewPathCordinates(
            postReportLastLocationRes.data.location
          )
        );
      }
      console.log(postReportLastLocationRes);
    } catch (ex) {
      console.log(ex);
    }
  }
);
export const handleResetFormData = createAsyncThunk(
  "getReport/handleResetFormData",
  async (obj, { dispatch, getState }) => {
    dispatch(RsetGetReportFromDate(null));
    dispatch(RsetGetReportToDate(null));
    dispatch(RsetGetReportVehicleValue(""));
    dispatch(RsetGetReportVehiclesNumber(""));
    dispatch(RsetGetReportGroupValue(""));
    dispatch(RsetGetReportFromSpeed(""));
    dispatch(RsetGetReportToSpeed(""));
    dispatch(RsetGetReportFromTime(""));
    dispatch(RsetGetReportToTime(""));
    dispatch(RsetFormErrors(""));
  }
);

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
    RsetGetReportGroupList: (state, { payload }) => {
      return { ...state, getReportGroupList: payload };
    },
    RsetGetReportVehicleList: (state, { payload }) => {
      return { ...state, getReportVehicleList: payload };
    },
    RsetGetReportSelectedItems: (state, { payload }) => {
      return { ...state, getReportSelectedItems: payload };
    },
    RsetGetReportViewPathCordinates: (state, { payload }) => {
      return { ...state, getReportViewPathCordinates: payload };
    },
    RsetGetReportGroupValue: (state, { payload }) => {
      return { ...state, getReportGroupValue: payload };
    },
    RsetGetReportVehicleValue: (state, { payload }) => {
      return { ...state, getReportVehicleValue: payload };
    },
    //
    RsetGetReportList: (state, { payload }) => {
      return { ...state, getReportList: payload };
    },
    RsetShowReportList: (state, { payload }) => {
      return { ...state, showReportList: payload };
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
  RsetGetReportGroupList,
  RsetGetReportVehicleList,
  RsetGetReportSelectedItems,
  RsetGetReportViewPathCordinates,
  RsetGetReportGroupValue,
  RsetGetReportVehicleValue,
  //
  RsetGetReportList,
  RsetShowReportList,
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
export const selectGetReportGroupList = (state) =>
  state.getReport.getReportGroupList;
export const selectGetReportVehicleList = (state) =>
  state.getReport.getReportVehicleList;
export const selectGetReportSelectedItems = (state) =>
  state.getReport.getReportSelectedItems;
export const selectGetReportViewPathCordinates = (state) =>
  state.getReport.getReportViewPathCordinates;
export const selectGetReportGroupValue = (state) =>
  state.getReport.getReportGroupValue;
export const selectGetReportVehicleValue = (state) =>
  state.getReport.getReportVehicleValue;
//
export const selectGetReportList = (state) => state.getReport.getReportList;
export const selectShowReportList = (state) => state.getReport.showReportList;

export default getReportSlices.reducer;
