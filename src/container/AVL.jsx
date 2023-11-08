import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Home from "../components/Home";
import AddUserForm from "../components/userManagement/AddUserForm";
import MainLayout from "../components/layout/MainLayout";
import AddDevice from "../components/device/AddDevice";
import AddVehicle from "../components/device/AddVehicle";

const AVL = () => {
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
        </Routes>
      </MainLayout>
    </Fragment>
  );
};

export default AVL;
