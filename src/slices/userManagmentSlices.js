import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";
import { getUsersList } from "../services/userServices";
import { RsetUser } from "./mainSlices";

const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  gmail: "",
  password: "",
  passwordConfirmation: "",
  gender: "Female",
  userLists: [],
  currentUser: "",
};

export const handleUserLists = createAsyncThunk(
  "userManagment/handleUserLists",
  async (obj, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const getUsersListRes = await getUsersList(token);
      if (getUsersListRes.status === 200) {
        dispatch(RsetUserLists(getUsersListRes.data.allUser));
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

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
    RsetUserLists: (state, { payload }) => {
      return { ...state, userLists: payload };
    },
    RsetCurrentUser: (state, { payload }) => {
      return { ...state, currentUser: payload };
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
  RsetUserLists,
  RsetCurrentUser,
} = userManagmentSlices.actions;

export const selectUserName = (state) => state.userManagment.userName;
export const selectFirstName = (state) => state.userManagment.firstName;
export const selectLastName = (state) => state.userManagment.lastName;
export const selectPhoneNumber = (state) => state.userManagment.phoneNumber;
export const selectGmail = (state) => state.userManagment.gmail;
export const selectPassword = (state) => state.userManagment.password;
export const selectPasswordConfirmation = (state) =>
  state.userManagment.passwordConfirmation;
export const selectGender = (state) => state.userManagment.gender;
export const selectUserLists = (state) => state.userManagment.userLists;
export const selectCurrentUser = (state) => state.userManagment.currentUser;

export default userManagmentSlices.reducer;
