import React, { useEffect } from "react";
import { BrowserRouter, useFetcher, useSearchParams } from "react-router-dom";
import AVL from "./AVL";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleUserData } from "../slices/authSlices";
import { selectUser } from "../slices/mainSlices";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(handleUserData());
  }, []);
  console.log(user);

  return (
    <BrowserRouter>
      <ToastContainer rtl />
      <AVL />
    </BrowserRouter>
  );
};

export default App;
