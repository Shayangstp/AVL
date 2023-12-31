import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";
import { getAllGpses } from "../services/dashboardServices";
import { getCommonUser } from "../services/userServices";
import { RsetCategoryCommonUserOptions } from "./categorySlices";

const initialState = {
  formErrors: {},
  user: {},
  loading: false,
  avatar: false,
  uploadFile: "",
  allGpses: [],
  //
  // unit: "",
  unitsOption: [],
  // typesOption: [],
  smallNav: false,
};

export const handleAllGpsesList = createAsyncThunk(
  "main/handleAllGpsesList",
  async (obj, { dispatch, getState }) => {
    // const { allGpeses } = getState().main;
    const token = localStorage.getItem("token");

    try {
      const allGpesesRes = await getAllGpses(token);
      // const allCordinates = allGpesesRes.data.lastLocation.map((device) => {
      //   return [device.lat, device.lng];
      // });
      console.log(allGpesesRes);
      dispatch(RsetAllGpses(allGpesesRes.data));
    } catch (ex) {
      console.log(ex);
    }
  }
);
export const handleCommonUserList = createAsyncThunk(
  "main/handleCommonUserList",
  async (obj, { dispatch, getState }) => {
    // const { allGpeses } = getState().main;
    const token = localStorage.getItem("token");

    try {
      const getCommonUserRes = await getCommonUser(token);
      console.log(getCommonUserRes);
      // if()
      dispatch(RsetCategoryCommonUserOptions(getCommonUserRes.data.allUser))
    } catch (ex) {
      console.log(ex);
    }
  }
);

const mainSlices = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetFormErrors: (state, { payload }) => {
      return { ...state, formErrors: payload };
    },
    RsetUser: (state, { payload }) => {
      return { ...state, user: payload };
    },
    RsetLoading: (state, { payload }) => {
      return { ...state, loading: payload };
    },
    RsetAvatar: (state, { payload }) => {
      return { ...state, avatar: payload };
    },
    RsetUploadFile: (state, { payload }) => {
      return { ...state, uploadFile: payload };
    },
    RsetUploadFile: (state, { payload }) => {
      return { ...state, uploadFile: payload };
    },
    RsetAllGpses: (state, { payload }) => {
      return { ...state, allGpses: payload };
    },
    //
    RsetUnitsOption: (state, { payload }) => {
      return { ...state, unitsOption: payload };
    },
    RsetSmallNav: (state, { payload }) => {
      return { ...state, smallNav: payload };
    },
  },
});

export const {
  RsetFormErrors,
  RsetUser,
  RsetLoading,
  RsetUploadFile,
  RsetAllGpses,
  RsetUnitsOption,
  RsetSmallNav,
  RsetCommonUserOptions,
} = mainSlices.actions;

export const selectFormErrors = (state) => state.main.formErrors;
export const selectUser = (state) => state.main.user;
export const selectLoading = (state) => state.main.loading;
export const selectAvatar = (state) => state.main.avatar;
export const selectUploadFile = (state) => state.main.uploadFile;
export const selectAllGpses = (state) => state.main.allGpses;
export const selectUnitsOption = (state) => state.main.unitsOption;
export const selectSmallNav = (state) => state.main.smallNav;

export default mainSlices.reducer;
