import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeProfilePicModal: false,
};

const modalsSlices = createSlice({
  name: "modals",
  initialState,
  reducers: {
    RsetChangeProfilePicModal: (state, action) => {
      return { ...state, changeProfilePicModal: action.payload };
    },
  },
});

export const { RsetChangeProfilePicModal } = modalsSlices.actions;

export const selectChangeProfilePicModal = (state) =>
  state.modals.changeProfilePicModal;

export default modalsSlices.reducer;
