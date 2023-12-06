import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import DashboardMap from "./map/DashboardMap";
import { useDispatch, useSelector } from "react-redux";
import { handleAllGpsesList } from "../slices/mainSlices";


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAllGpsesList());
  }, []);

  return (
    <div fluid className="bg-primary h-100">
      {/* <div className="h-100 p-5"> */}
      <DashboardMap />
      {/* </div> */}
    </div>
  );
};

export default Home;
