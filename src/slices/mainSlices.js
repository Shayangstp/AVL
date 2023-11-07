import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";

const initialState = {
  formErrors: {},
  user: {},
  loading: false,
  avatar: false,
  uploadFile: "",
};

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
  },
});

export const { RsetFormErrors, RsetUser, RsetLoading, RsetUploadFile } =
  mainSlices.actions;

export const selectFormErrors = (state) => state.main.formErrors;
export const selectUser = (state) => state.main.user;
export const selectLoading = (state) => state.main.loading;
export const selectAvatar = (state) => state.main.avatar;
export const selectUploadFile = (state) => state.main.uploadFile;

export default mainSlices.reducer;
