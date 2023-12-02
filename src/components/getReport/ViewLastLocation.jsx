import React from "react";
import ViewPathList from "./viewPathList/ViewPathList";
import Map from "../map/Map";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DateFrom from "./dateFrom/DateFrom";
import ViewLastLocationList from "./viewLastLocationList/ViewLastLocationList";

const ViewLastLocation = ({ setPageTitle }) => {
  return (
    <Container fluid className="py-5 w-100">
      <h1 className="fs-5">مشاهده آخرین موقعیت</h1>
      <h6 className="mt-3">
        در این قسمت مشاهده آخرین موقعیت دستگاه ها انجام می شود
      </h6>
      <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
        <DateFrom />
        <div className="d-flex">
          <div className="w-50">
            <ViewLastLocationList setPageTitle={setPageTitle} />
          </div>
          <div
            className="mt-5 ms-5"
            style={{ height: "500px", width: "500px" }}
          >
            <Map />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ViewLastLocation;
