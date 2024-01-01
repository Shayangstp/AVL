import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RsetLoading, RsetUser } from "./mainSlices";
import { errorMessage, successMessage } from "../utils/msg";
import { postUserAuth, postForgetPassword } from "../services/loginServices";

const initialState = {
  username: "",
  password: "",
  showLogin: true,
  forgetPassUsername: "",
  forgetPassUsernameIsValid: false,
  loggedIn: false,
};

//parse the token
const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (e, { dispatch, getState }) => {
    e.preventDefault();
    const { username } = getState().auth;
    const { password } = getState().auth;
    dispatch(RsetLoading(true));
    try {
      const userAuthValues = {
        username,
        password,
      };
      console.log(userAuthValues);
      const userAuthRes = await postUserAuth(userAuthValues);
      console.log(userAuthRes);
      if (userAuthRes.data.result && userAuthRes.data.result.code === 415) {
        const userInfo = parseJwt(userAuthRes.data.result.authorization);
        console.log(userInfo);
        localStorage.setItem("token", userAuthRes.data.result.authorization);
        dispatch(RsetUser(userInfo));
        dispatch(RsetLoading(false));
        dispatch(RsetLoggedIn(true));
        successMessage("با موفقیت وارد شدید!");
      } else {
        dispatch(RsetLoading(false));
        errorMessage("نام کاربری یا رمز عبور اشتباه است!");
      }
    } catch (ex) {
      console.log(ex);
      dispatch(RsetLoading(false));
    }
  }
);

export const handleUserData = createAsyncThunk(
  "auth/handleUserData",
  async (event, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const userData = parseJwt(token);
      dispatch(RsetUser(userData));
    } catch (ex) {
      console.log(ex);
    }
  }
);

export const handleForgetPassword = createAsyncThunk(
  "auth/handleForgetPassword",
  async (e, { dispatch, getState }) => {
    const { forgetPassUsername } = getState().auth;
    dispatch(RsetLoading(true));
    try {
      const postForgetPasswordRes = await postForgetPassword({
        username: forgetPassUsername,
      });
      console.log(postForgetPasswordRes);
      if (postForgetPasswordRes.data.code === 415) {
        dispatch(RsetForgetPassUsername(""));
        dispatch(RsetForgetPassUsernameIsValid(true));
        successMessage("برای بازیابی رمز لطفا ایمیل خود را چک کنید");
        dispatch(RsetLoading(false));
      } else {
        errorMessage("نام کاربری اشتباه است!");
        dispatch(RsetLoading(false));
      }
    } catch (ex) {
      console.log(ex);
      dispatch(RsetLoading(false));
    }
  }
);

export const handleLogout = createAsyncThunk(
  "auth/handleLogout",
  async (obj, { dispatch, getState }) => {
    const { avatar } = getState().main;
    try {
      dispatch(RsetLoggedIn(false));
      localStorage.removeItem("token");
    } catch (ex) {
      console.log(ex);
    }
  }
);

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RsetUsername: (state, action) => {
      return { ...state, username: action.payload };
    },
    RsetPassword: (state, action) => {
      return { ...state, password: action.payload };
    },
    RsetPassword: (state, action) => {
      return { ...state, password: action.payload };
    },
    RsetShowLogin: (state, action) => {
      return { ...state, showLogin: action.payload };
    },
    RsetForgetPassUsername: (state, action) => {
      return { ...state, forgetPassUsername: action.payload };
    },
    RsetForgetPassUsernameIsValid: (state, action) => {
      return { ...state, forgetPassUsernameIsValid: action.payload };
    },
    RsetLoggedIn: (state, action) => {
      return { ...state, loggedIn: action.payload };
    },
  },
});

export const {
  RsetUsername,
  RsetPassword,
  RsetShowLogin,
  RsetForgetPassUsername,
  RsetForgetPassUsernameIsValid,
  RsetLoggedIn,
} = authSlices.actions;

export const selectUsername = (state) => state.auth.username;
export const selectPassword = (state) => state.auth.password;
export const selectShowLogin = (state) => state.auth.showLogin;
export const selectForgetPassUsername = (state) =>
  state.auth.forgetPassUsername;
export const selectForgetPassUsernameIsValid = (state) =>
  state.auth.forgetPassUsernameIsValid;
export const selectLoggedIn = (state) => state.auth.loggedIn;

export default authSlices.reducer;
