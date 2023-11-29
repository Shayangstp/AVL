import React from "react";
import { Container } from "react-bootstrap";
import ViewPathList from "./viewPathList/ViewPathList";
import Map from "../map/Map";
const viewPath = ({ setPageTitle }) => {
  return (
    <Container fluid className="py-5">
      <h1 className="fs-5">مشاهده آخرین مسیر</h1>
      <div className="d-flex">
        <div className="w-25">
          <ViewPathList setPageTitle={setPageTitle} />
        </div>
        <div  className="w-100">
          <Map />
        </div>
      </div>
    </Container>
  );
};

export default viewPath;
