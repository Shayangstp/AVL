import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";

const initialState = {
  userName: "",
  firstname: "",
  lastName: "",
  phoneNumber: "",
  gmail: "",
  password: "",
  passwordConfirmation: "",
  gender: "female",
};

const userManagmentSlices = createSlice({
  name: "userManagment",
  initialState,
  reducers: {
    RsetUserName: (state, { payload }) => {
      return { ...state, userName: payload };
    },
    RsetFirstName: (state, { payload }) => {
      return { ...state, firstName: payload };
    },
    RsetLastName: (state, { payload }) => {
      return { ...state, lastName: payload };
    },
    RsetPhoneNumber: (state, { payload }) => {
      return { ...state, phoneNumber: payload };
    },
    RsetGmail: (state, { payload }) => {
      return { ...state, gmail: payload };
    },
    RsetPassword: (state, { payload }) => {
      return { ...state, password: payload };
    },
    RsetPasswordConfirmation: (state, { payload }) => {
      return { ...state, passwordConfirmation: payload };
    },
    RsetGender: (state, { payload }) => {
      return { ...state, gender: payload };
    },
  },
});

export const {
  RsetUserName,
  RsetFirstName,
  RsetLastName,
  RsetPhoneNumber,
  RsetGmail,
  RsetPassword,
  RsetPasswordConfirmation,
  RsetGender,
} = userManagmentSlices.actions;

export const selectUserName = (state) => state.userManagment.userName;
export const selectFirstName = (state) => state.userManagment.firstName;
export const selectLastName = (state) => state.userManagment.lastName;
export const selectPhoneNumber = (state) => state.userManagment.phoneNumber;
export const selectGamil = (state) => state.userManagment.gmail;
export const selectPassword = (state) => state.userManagment.password;
export const selectPasswordConfirmation = (state) =>
  state.userManagment.passwordConfirmation;
export const selectGender = (state) => state.userManagment.gender;

export default userManagmentSlices.reducer;
