import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeProfilePicModal: false,
  deviceEditModal: false,
  deviceAdjusmentModal: false,
  deviceLocationsModal: false,
  deviceAddModelModal: false,
  //user
  userManagmentEditModal: false,
  userManagmentRoleModal: false,
  userManagmentChangePasswordModal: false,
  //category
  categoryEditModal: false,
  categoryAddVehicleModal: false,
  categoryManageVehicleModal: false,
  categoryCommonUserModal: false,
  categoryAddModal: false,
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
    RsetDeviceAddModelModal: (state, action) => {
      return { ...state, deviceAddModelModal: action.payload };
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
    //category
    RsetCategoryEditModal: (state, action) => {
      return { ...state, categoryEditModal: action.payload };
    },
    RsetCategoryAddVehicleModal: (state, action) => {
      return { ...state, categoryAddVehicleModal: action.payload };
    },
    RsetCategoryManageVehicleModal: (state, action) => {
      return { ...state, categoryManageVehicleModal: action.payload };
    },
    RsetCategoryCommonUserModal: (state, action) => {
      return { ...state, categoryCommonUserModal: action.payload };
    },
    RsetCategoryAddModal: (state, action) => {
      return { ...state, categoryAddModal: action.payload };
    },
  },
});

export const {
  RsetChangeProfilePicModal,
  RsetDeviceEditModal,
  RsetDeviceAdjusmentModal,
  RsetDeviceLocationsModal,
  RsetDeviceAddModelModal,
  //user
  RsetUserManagmentEditModal,
  RsetUserManagmentRoleModal,
  RsetUserManagmentChangePasswordModal,
  //category
  RsetCategoryEditModal,
  RsetCategoryAddVehicleModal,
  RsetCategoryManageVehicleModal,
  RsetCategoryCommonUserModal,
  RsetCategoryAddModal,
} = modalsSlices.actions;

export const selectChangeProfilePicModal = (state) =>
  state.modals.changeProfilePicModal;
export const selectDeviceEditModal = (state) => state.modals.deviceEditModal;
export const selectDeviceAdjusmentModal = (state) =>
  state.modals.deviceAdjusmentModal;
export const selectDeviceLocationsModal = (state) =>
  state.modals.deviceLocationsModal;
export const selectDeviceAddModelModal = (state) =>
  state.modals.deviceAddModelModal;
//user
export const selectUserManagmentEditModal = (state) =>
  state.modals.userManagmentEditModal;
export const selectUserManagmentRoleModal = (state) =>
  state.modals.userManagmentRoleModal;
export const selectUserManagmentChangePasswordModal = (state) =>
  state.modals.userManagmentChangePasswordModal;
//category
export const selectCategoryEditModal = (state) =>
  state.modals.categoryEditModal;
export const selectCategoryAddVehicleModal = (state) =>
  state.modals.categoryAddVehicleModal;
export const selectCategoryManageVehicleModal = (state) =>
  state.modals.categoryManageVehicleModal;
export const selectCategoryCommonUserModal = (state) =>
  state.modals.categoryCommonUserModal;
export const selectCategoryAddModal = (state) => state.modals.categoryAddModal;

export default modalsSlices.reducer;
