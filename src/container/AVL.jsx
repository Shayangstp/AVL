import React, { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Home from "../components/Home";
import AddUserForm from "../components/userManagement/AddUserForm";
import MainLayout from "../components/layout/MainLayout";
import AddDevice from "../components/device/AddDevice";
import AddVehicle from "../components/device/AddVehicle";
import DeviceList from "../components/device/DeviceList";

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
          <Route path="/addUser" element={<AddUserForm />} />
          <Route path="/addDevice" element={<AddDevice />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route
            path="/deviceList"
            element={<DeviceList setPageTitle={setPageTitle} />}
          />
        </Routes>
      </MainLayout>
    </Fragment>
  );
};

export default AVL;
