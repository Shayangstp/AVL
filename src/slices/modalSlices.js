import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeProfilePicModal: false,
  deviceEditModal: false,
  deviceAdjusmentModal: false,
  deviceLocationsModal: false,
  //user
  userManagmentEditModal: false,
  userManagmentRoleModal: false,
  userManagmentChangePasswordModal: false,
};

const modalsSlices = createSlice({
  name: "modals",
  initialState,
  reducers: {
    RsetChangeProfilePicModal: (state, action) => {
      return { ...state, changeProfilePicModal: action.payload };
    },
    RsetDeviceEditModal: (state, action) => {
      return { ...state, deviceEditModal: action.payload };
    },
    RsetDeviceAdjusmentModal: (state, action) => {
      return { ...state, deviceAdjusmentModal: action.payload };
    },
    RsetDeviceLocationsModal: (state, action) => {
      return { ...state, deviceLocationsModal: action.payload };
    },
    //user
    RsetUserManagmentEditModal: (state, action) => {
      return { ...state, userManagmentEditModal: action.payload };
    },
    RsetUserManagmentRoleModal: (state, action) => {
      return { ...state, userManagmentRoleModal: action.payload };
    },
    RsetUserManagmentChangePasswordModal: (state, action) => {
      return { ...state, userManagmentChangePasswordModal: action.payload };
    },
  },
});

export const {
  RsetChangeProfilePicModal,
  RsetDeviceEditModal,
  RsetDeviceAdjusmentModal,
  RsetDeviceLocationsModal,
  //user
  RsetUserManagmentEditModal,
  RsetUserManagmentRoleModal,
  RsetUserManagmentChangePasswordModal,
} = modalsSlices.actions;

export const selectChangeProfilePicModal = (state) =>
  state.modals.changeProfilePicModal;
export const selectDeviceEditModal = (state) => state.modals.deviceEditModal;
export const selectDeviceAdjusmentModal = (state) =>
  state.modals.deviceAdjusmentModal;
export const selectDeviceLocationsModal = (state) =>
  state.modals.deviceLocationsModal;
//user
export const selectUserManagmentEditModal = (state) =>
  state.modals.userManagmentEditModal;
export const selectUserManagmentRoleModal = (state) =>
  state.modals.userManagmentRoleModal;
export const selectUserManagmentChangePasswordModal = (state) =>
  state.modals.userManagmentChangePasswordModal;

export default modalsSlices.reducer;
