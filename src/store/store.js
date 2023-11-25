import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainSlices from "../slices/mainSlices";
import authSlices from "../slices/authSlices";
import modalSlices from "../slices/modalSlices";
import deviceSlices from "../slices/deviceSlices";
import categorySlices from "../slices/categorySlices";
import userManagmentSlices from "../slices/userManagmentSlices";
import filterSlices from "../slices/filterSlices";

const rootReducer = {
  main: mainSlices,
  auth: authSlices,
  modals: modalSlices,
  device: deviceSlices,
  category: categorySlices,
  userManagment: userManagmentSlices,
  filter: filterSlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
