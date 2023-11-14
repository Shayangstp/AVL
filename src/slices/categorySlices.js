import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessage, successMessage } from "../utils/msg";
import { getCategoryList } from "../services/categoryServices";

const initialState = {
  categoryList: [],
};

export const handleCategoryList = createAsyncThunk(
  "category/handleCategoryList",
  async (obj, { dispatch, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const getCategoryListRes = await getCategoryList(token);
      console.log(getCategoryListRes);
      if (getCategoryListRes.data.code === 200) {
        dispatch(RsetCategoryList(getCategoryListRes.data.populateUser));
      } else {
        console.log("error");
      }
    } catch (ex) {
      console.log(ex);
    }
  }
);

const categorySlices = createSlice({
  name: "category",
  initialState,
  reducers: {
    RsetCategoryList: (state, { payload }) => {
      return { ...state, categoryList: payload };
    },
  },
});

export const { RsetCategoryList } = categorySlices.actions;

export const selectCategorylist = (state) => state.category.categoryList;

export default categorySlices.reducer;
