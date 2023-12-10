import React from "react";
import ViewPathList from "./viewPathList/ViewPathList";
import MapHeat from "../map/MapHeat";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DateFrom from "./dateFrom/DateFrom";
import ViewLastLocationList from "./viewLastLocationList/ViewLastLocationList";

const ViewLastLocation = ({ setPageTitle }) => {
  return (
    <Container fluid className="p-5 my-2">
      <div className="lightGray-bg borderRadius-15 border border-white border-2 shadow p-4">
        <h1 className="fs-5">مشاهده آخرین موقعیت</h1>
        <h6 className="mt-3">
          در این قسمت مشاهده آخرین موقعیت دستگاه ها انجام می شود
        </h6>
        <div className="mt-5">
          <DateFrom />
        </div>
      </div>
      <Row className="d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start">
        <Col
          xs={12}
          md={5}
          className="lightGray-bg borderRadius-15 border border-white border-2 shadow mt-5"
        >
          <ViewPathList />
        </Col>
        <Col
          xs={12}
          md={6}
          className="ms-0 ms-md-5 mt-5 lightGray-bg borderRadius-15 border border-white border-2 shadow p-3"
          style={{ height: "500px" }}
        >
          <MapHeat />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewLastLocation;
