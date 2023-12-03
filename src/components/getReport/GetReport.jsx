import React from "react";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import Reports from "./getReportForms/Reports";
import GetReportDevicesAndDrivers from "./getReportForms/GetReportDevicesAndDrivers";
import GetReportDateForm from "./getReportForms/GetReportDateForm";
import GetReportTime from "./getReportForms/GetReportTime";
import GetReportSpeed from "./getReportForms/GetReportSpeed";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGetReportGroups,
  selectGetReportDrivers,
  selectGetReportVehiclesNumber,
  selectGetReportFromDate,
  selectGetReportToDate,
  selectGetReportFromTime,
  selectGetReportToTime,
  selectGetReportFromSpeed,
  selectGetReportToSpeed,
} from "../../slices/getReportSlices";
import MapHeat from "../map/MapHeat";

const GetReport = () => {
  const dispatch = useDispatch();
  const getReportGroups = useSelector(selectGetReportGroups);
  const getReportDrivers = useSelector(selectGetReportDrivers);
  const getReportVehiclesNumber = useSelector(selectGetReportVehiclesNumber);
  const fromDate = useSelector(selectGetReportFromDate);
  const toDate = useSelector(selectGetReportToDate);
  const getReportFromTime = useSelector(selectGetReportFromTime);
  const getReportToTime = useSelector(selectGetReportToTime);
  const getReportFromSpeed = useSelector(selectGetReportFromSpeed);
  const getReportToSpeed = useSelector(selectGetReportToSpeed);

  const handleReport = () => {
    console.log({
      getReportGroups,
      getReportDrivers,
      getReportVehiclesNumber,
      fromDate,
      toDate,
      getReportFromTime,
      getReportToTime,
      getReportFromSpeed,
      getReportToSpeed,
    });
  };

  return (
    <div className="p-4">
      <h1>گزارش‌گیری از وسایل نقلیه</h1>
      <p className="mt-2 font12 text-secondary">
        در این قسمت می‌توانید از موقعیت دستگاه‌ها یا هشدارها گزارش دریافت کنید.
      </p>
      <Row className="mt-5">
        <Col md="3">
          <Reports />
        </Col>
        <Col md="3">
          <GetReportDevicesAndDrivers />
        </Col>
        <Col md="3">
          <GetReportDateForm />
        </Col>
        <Col md="3">
          <GetReportTime />
        </Col>
        <Col md="3" className="mt-2">
          <GetReportSpeed />
        </Col>
        <Col md="3" className="d-flex align-items-end">
          <Button onClick={handleReport}>جستوجو</Button>
        </Col>
      </Row>
      <Row style={{ height: "500px", width: "100%" }} className="mt-3">
        <MapHeat />
      </Row>
    </div>
  );
};

export default GetReport;
