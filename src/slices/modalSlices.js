import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeProfilePicModal: false,
  //modals
  deviceEditModal: false,
};

const modalsSlices = createSlice({
  name: "modals",
  initialState,
  reducers: {
    RsetChangeProfilePicModal: (state, action) => {
      return { ...state, changeProfilePicModal: action.payload };
    },
    //modals
    RsetDeviceEditModal: (state, action) => {
      return { ...state, deviceEditModal: action.payload };
    },
  },
});

export const {
  RsetChangeProfilePicModal,
  //modals
  RsetDeviceEditModal,
} = modalsSlices.actions;

export const selectChangeProfilePicModal = (state) =>
  state.modals.changeProfilePicModal;
//device modals
export const selectDeviceEditModal = (state) => state.modals.deviceEditModal;

export default modalsSlices.reducer;
