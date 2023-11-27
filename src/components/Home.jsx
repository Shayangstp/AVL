import React from "react";
import { Container } from "react-bootstrap";
import DashboardMap from "./map/DashboardMap";

const Home = () => {
  return (
    <div fluid className="bg-primary h-100">
      {/* <div className="h-100 p-5"> */}
      <DashboardMap />
      {/* </div> */}
    </div>
  );
};

export default Home;
