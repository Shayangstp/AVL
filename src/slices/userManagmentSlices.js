import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";
import { getUsersList } from "../services/userServices";
import { RsetUser } from "./mainSlices";
import { postAddUser } from "../services/userServices";
import { RsetFormErrors } from "./mainSlices";
import {
  postAddPhoneNumber,
  getAllUserPhoneNumbers,
} from "../services/userServices";

const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  gmail: "",
  password: "",
  passwordConfirmation: "",
  gender: "",
  userLists: [],
  currentUser: "",
  userRoles: [],
  userPhoneNumberList: [],
};

export const handleUserLists = createAsyncThunk(
  "userManagment/handleUserLists",
  async (obj, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const getUsersListRes = await getUsersList(token);
      console.log(getUsersListRes);
      if (getUsersListRes.status === 200) {
        dispatch(RsetUserLists(getUsersListRes.data.allUser));
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);
export const handleAllUserPhoneNumberList = createAsyncThunk(
  "userManagment/handleAllUserPhoneNumberList",
  async (obj, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const getAllUserPhoneNumbersRes = await getAllUserPhoneNumbers(token);
      console.log(getAllUserPhoneNumbersRes);
      if (getAllUserPhoneNumbersRes.status === 200) {
        dispatch(
          RsetUserPhoneNumberList(getAllUserPhoneNumbersRes.data.Allusers)
        );
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleAddUser = createAsyncThunk(
  "userManagment/handleAddUser",
  async (e, { dispatch, getState }) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const {
      userName,
      firstName,
      lastName,
      phoneNumber,
      gmail,
      password,
      gender,
    } = getState().userManagment;

    const values = {
      username: userName,
      firstname: firstName,
      lastname: lastName,
      mobileNumber: phoneNumber,
      email: gmail,
      password: password,
      gender: gender,
    };
    console.log(values);
    try {
      const postAddUserRes = await postAddUser(values, token);
      console.log(postAddUserRes);
      if (postAddUserRes.status === 200) {
        successMessage("کاربر با موفقیت اضافه شد");
        dispatch(handleResetAddUser());
      } else {
        errorMessage("خطا");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleResetAddUser = createAsyncThunk(
  "userManagment/handleResetAddUser",
  async (obj, { dispatch, getState }) => {
    dispatch(RsetUserName(""));
    dispatch(RsetFirstName(""));
    dispatch(RsetLastName(""));
    dispatch(RsetPhoneNumber(""));
    dispatch(RsetGmail(""));
    dispatch(RsetPassword(""));
    dispatch(RsetPasswordConfirmation(""));
    dispatch(RsetFormErrors(""));
    dispatch(RsetGender(""));
  }
);

export const handleAddPhoneNumber = createAsyncThunk(
  "userManagment/handleAddPhoneNumber",
  async (e, { dispatch, getState }) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const { firstName, lastName, phoneNumber, gmail } =
      getState().userManagment;

    const values = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: gmail,
    };
    try {
      const postAddPhoneNumberRes = await postAddPhoneNumber(values, token);
      if (postAddPhoneNumberRes.data.code === 201) {
        dispatch(handleResetAddPhoneNumber());
        successMessage("کاربر با موفقیت اضافه شد");
      } else if (postAddPhoneNumberRes.data.code === "422") {
        errorMessage("این شماره قبلا ثبت شده است!");
      } else {
        errorMessage("خطا");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleResetAddPhoneNumber = createAsyncThunk(
  "userManagment/handleResetAddPhoneNumber",
  async (obj, { dispatch, getState }) => {
    dispatch(RsetFirstName(""));
    dispatch(RsetLastName(""));
    dispatch(RsetPhoneNumber(""));
    dispatch(RsetGmail(""));
    dispatch(RsetFormErrors(""));
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
    RsetUserRoles: (state, { payload }) => {
      return { ...state, userRoles: payload };
    },
    RsetUserPhoneNumberList: (state, { payload }) => {
      return { ...state, userPhoneNumberList: payload };
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
  RsetUserRoles,
  RsetUserPhoneNumberList,
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
export const selectUserRoles = (state) => state.userManagment.userRoles;
export const selectUserPhoneNumberList = (state) =>
  state.userManagment.userPhoneNumberList;

export default userManagmentSlices.reducer;
