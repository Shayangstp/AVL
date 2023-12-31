import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";
import {
  getCategoryList,
  getVehicleManageList,
  getVehiclesTypeList,
} from "../services/categoryServices";
import { RsetLoading } from "./mainSlices";
import { RsetVehicleTypeOptions } from "./deviceSlices";

const initialState = {
  categoryList: [],
  categoryCurrentRequest: "",
  categoryGroupName: "",
  categoryGroupDescription: "",
  categoryGroupColorOptions: [],
  categoryGroupColor: "",
  categoryUserVehicle: "",
  categoryUserVehicleOptions: [],
  categoryCommonUser: "",
  categoryCommonUserOptions: [],
  categoryName: "",
  categoryManageVehicleList: [],
};

export const handleCategoryList = createAsyncThunk(
  "category/handleCategoryList",
  async (obj, { dispatch, getState }) => {
    dispatch(RsetLoading(true));
    try {
      const token = localStorage.getItem("token");
      const getCategoryListRes = await getCategoryList(token);
      if (getCategoryListRes.data.code === 200) {
        dispatch(RsetCategoryList(getCategoryListRes.data.devicegrp));
        dispatch(RsetLoading(false));
      } else {
        console.log("error");
        dispatch(RsetLoading(false));
      }
    } catch (ex) {
      console.log(ex);
      dispatch(RsetLoading(false));
    }
  }
);
export const handleCategoryManageVehicleList = createAsyncThunk(
  "category/handleCategoryManageVehicleList",
  async (obj, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    try {
      const token = localStorage.getItem("token");
      const getVehicleManageListRes = await getVehicleManageList(token);
      if (getVehicleManageListRes.data.code === 200) {
        dispatch(
          RsetCategoryManageVehicleList(getVehicleManageListRes.data.devicegrp)
        );
      } else {
        console.log("error");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);
export const handleVehicleTypeList = createAsyncThunk(
  "category/handleVehicleTypeList",
  async (obj, { dispatch, getState }) => {
    const token = localStorage.getItem("token");
    try {
      const token = localStorage.getItem("token");
      const getVehiclesTypeListRes = await getVehiclesTypeList(token);
      console.log(getVehiclesTypeListRes);

      if (getVehiclesTypeListRes.data.code == 200) {
        dispatch(
          RsetVehicleTypeOptions(getVehiclesTypeListRes.data.foundedItem)
        );
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

const categorySlices = createSlice({
  name: "category",
  initialState,
  reducers: {
    RsetCategoryList: (state, { payload }) => {
      return { ...state, categoryList: payload };
    },
    RsetCategoryCurrentRequest: (state, { payload }) => {
      return { ...state, categoryCurrentRequest: payload };
    },
    RsetCategoryGroupName: (state, { payload }) => {
      return { ...state, categoryGroupName: payload };
    },
    RsetCategoryGroupDescription: (state, { payload }) => {
      return { ...state, categoryGroupDescription: payload };
    },
    RsetCategoryGroupColorOptions: (state, { payload }) => {
      return { ...state, categoryGroupColorOptions: payload };
    },
    RsetCategoryGroupColor: (state, { payload }) => {
      return { ...state, categoryGroupColor: payload };
    },
    RsetCategoryUserVehicle: (state, { payload }) => {
      return { ...state, categoryUserVehicle: payload };
    },
    RsetCategoryUserVehicleOptions: (state, { payload }) => {
      return { ...state, categoryUserVehicleOptions: payload };
    },
    RsetCategoryCommonUser: (state, { payload }) => {
      return { ...state, categoryCommonUser: payload };
    },
    RsetCategoryCommonUserOptions: (state, { payload }) => {
      return { ...state, categoryCommonUserOptions: payload };
    },
    RsetCategoryName: (state, { payload }) => {
      return { ...state, categoryName: payload };
    },
    RsetCategoryManageVehicleList: (state, { payload }) => {
      return { ...state, categoryManageVehicleList: payload };
    },
  },
});

export const {
  RsetCategoryList,
  RsetCategoryCurrentRequest,
  RsetCategoryGroupName,
  RsetCategoryGroupDescription,
  RsetCategoryGroupColorOptions,
  RsetCategoryGroupColor,
  RsetCategoryUserVehicle,
  RsetCategoryUserVehicleOptions,
  RsetCategoryCommonUser,
  RsetCategoryCommonUserOptions,
  RsetCategoryName,
  RsetCategoryManageVehicleList,
} = categorySlices.actions;

export const selectCategorylist = (state) => state.category.categoryList;
export const selectCategoryCurrentRequest = (state) =>
  state.category.categoryCurrentRequest;
export const selectCategoryGroupName = (state) =>
  state.category.categoryGroupName;
export const selectCategoryGroupDescription = (state) =>
  state.category.categoryGroupDescription;
export const selectCategoryGroupColorOptions = (state) =>
  state.category.categoryGroupColorOptions;
export const selectCategoryGroupColor = (state) =>
  state.category.categoryGroupColor;
export const selectCategoryUserVehicle = (state) =>
  state.category.categoryUserVehicle;
export const selectCategoryUserVehicleOptions = (state) =>
  state.category.categoryUserVehicleOptions;
export const selectCategoryCommonUser = (state) =>
  state.category.categoryCommonUser;
export const selectCategoryCommonUserOptions = (state) =>
  state.category.categoryCommonUserOptions;
export const selectCategoryName = (state) => state.category.categoryName;
export const selectCategoryManageVehicleList = (state) => state.category.f;

export default categorySlices.reducer;
