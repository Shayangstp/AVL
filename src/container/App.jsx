import React, { useEffect } from "react";
import { BrowserRouter, useFetcher, useSearchParams } from "react-router-dom";
import AVL from "./AVL";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { handleUserData } from "../slices/authSlices";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleUserData());
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer rtl />
      <AVL />
    </BrowserRouter>
  );
};

export default App;
