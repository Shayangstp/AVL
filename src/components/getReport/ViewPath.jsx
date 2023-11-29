import React from "react";
import ViewPathList from "./viewPathList/ViewPathList";
import Map from "../map/Map";
import DatePicker from "react-datepicker2";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const viewPath = ({ setPageTitle }) => {
  return (
    <Container fluid className="py-5 w-100">
      <h1 className="fs-5">مشاهده آخرین مسیر</h1>
      <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
        <Form className="d-flex ">
          <Form.Group className="me-2">
            <Form.Label>از تاریخ</Form.Label>
            <DatePicker className="form-control" />
          </Form.Group>
          <Form.Group>
            <Form.Label>تا تاریخ</Form.Label>
            <DatePicker className="form-control" />
          </Form.Group>
          <Form.Group>
            <Button variant="success" className="mt-4 ms-2" onClick={(e) => {}}>
              ثبت درخواست
            </Button>
          </Form.Group>
        </Form>
        <div className="d-flex">
          <div className="w-25">
            <ViewPathList setPageTitle={setPageTitle} />
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

export default viewPath;
