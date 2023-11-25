import React, { Fragment, useState } from "react";
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
import GetReport from "../components/getReport/GetReport";
import AddPhoneNumbers from "../components/userManagement/AddPhoneNumbers";
import PhoneNumberList from "../components/userManagement/PhoneNumberList";

const AVL = () => {
  const [pageTitle, setPageTitle] = useState("");

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <MainLayout>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* devices */}
          <Route path="/addDevice" element={<AddDevice />} />
          <Route
            path="/deviceList"
            element={<DeviceList setPageTitle={setPageTitle} />}
          />
          <Route path="/addVehicle" element={<AddVehicle />} />
          {/* category */}
          <Route
            path="/categoryList"
            element={<CategoryList setPageTitle={setPageTitle} />}
          />
          {/* report */}
          <Route path="/getReport" element={<GetReport />} />
          <Route path="/ViewPath" element={<ViewPath />} />♂
          <Route path="/viewLastLocation" element={<ViewLastLocation />} />
          {/* user */}
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/addPhoneNumber" element={<AddPhoneNumbers />} />
          <Route path="/viewPhoneNumbers" element={<PhoneNumberList />} />
          <Route
            path="/userList"
            element={<UserList setPageTitle={setPageTitle} />}
          />
        </Routes>
      </MainLayout>
    </Fragment>
  );
};

export default AVL;
