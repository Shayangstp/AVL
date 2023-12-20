import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Home from "../components/Home";
import AddUser from "../components/userManagement/AddUser";
import MainLayout from "../components/layout/MainLayout";
import AddDevice from "../components/device/AddDevice";
import AddVehicle from "../components/device/AddVehicle";
import DeviceList from "../components/device/DeviceList";
import CategoryList from "../components/category/CategoryList";
import UserList from "../components/userManagement/UserList";
import ViewPath from "../components/getReport/ViewPath";
import ViewLastLocation from "../components/getReport/ViewLastLocation";
import GetReportPage from "../components/getReport/GetReportPage";
import AddPhoneNumbers from "../components/userManagement/AddPhoneNumbers";
import PhoneNumberList from "../components/userManagement/PhoneNumberList";
import Test from "../components/test/Test";
import { Navigate, useNavigate } from "react-router-dom";
import { selectLoggedIn } from "../slices/authSlices";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ErrorPage from "../components/common/ErrorPage";

const AVL = ({ props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const tokenIsValid = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!tokenIsValid) {
      navigate("/", { replace: true });
    }
  }, [tokenIsValid]);

  return (
    <Fragment>
      <Routes>
        {/* <Route path="*" element={<ErrorPage />} /> */}
        <Route
          path="/"
          element={tokenIsValid ? <Navigate to="/home" /> : <Login />}
        />
      </Routes>
      <MainLayout>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* devices */}
          <Route path="/addDevice" element={<AddDevice />} />
          <Route path="/deviceList" element={<DeviceList />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          {/* category */}
          <Route path="/categoryList" element={<CategoryList />} />
          {/* report */}
          <Route path="/getReportPage" element={<GetReportPage />} />
          <Route path="/viewPath" element={<ViewPath />} />
          <Route
            path="/viewLastLocation"
            element={<ViewLastLocation setPageTitle={setPageTitle} />}
          />
          {/* user */}
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/addPhoneNumber" element={<AddPhoneNumbers />} />
          <Route path="/viewPhoneNumbers" element={<PhoneNumberList />} />
          <Route
            path="/userList"
            element={<UserList setPageTitle={setPageTitle} />}
          />
          {/* test */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </MainLayout>
    </Fragment>
  );
};

export default AVL;
