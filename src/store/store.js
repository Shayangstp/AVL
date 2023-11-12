import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainSlices from "../slices/mainSlices";
import authSlices from "../slices/authSlices";
import modalSlices from "../slices/modalSlices";
import deviceSlices from "../slices/deviceSlices";

const rootReducer = {
  main: mainSlices,
  auth: authSlices,
  modals: modalSlices,
  device: deviceSlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});