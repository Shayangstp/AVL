import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeProfilePicModal: false,
  deviceEditModal: false,
  deviceAdjusmentModal: false,
  deviceLocationsModal: false,
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
  },
});

export const {
  RsetChangeProfilePicModal,
  RsetDeviceEditModal,
  RsetDeviceAdjusmentModal,
  RsetDeviceLocationsModal,
} = modalsSlices.actions;

export const selectChangeProfilePicModal = (state) =>
  state.modals.changeProfilePicModal;
export const selectDeviceEditModal = (state) => state.modals.deviceEditModal;
export const selectDeviceAdjusmentModal = (state) =>
  state.modals.deviceAdjusmentModal;
export const selectDeviceLocationsModal = (state) =>
  state.modals.deviceLocationsModal;

export default modalsSlices.reducer;
