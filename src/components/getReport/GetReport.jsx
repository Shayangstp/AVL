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
  selectGetReportAlarms,
  selectGetReportGPSLocations,
  selectGetReportVehiclesChanges,
  selectGetReportDriversConditions,
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

  const getReportAlarms = useSelector(selectGetReportAlarms);
  const getReportGPSLocations = useSelector(selectGetReportGPSLocations);
  const getReportVehiclesChanges = useSelector(selectGetReportVehiclesChanges);
  const getReportDriversConditions = useSelector(
    selectGetReportDriversConditions
  );

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
      <div className="lightGray-bg borderRadius-15 border border-white border-2 shadow-sm p-4">
        <h1>گزارش‌گیری از وسایل نقلیه</h1>
        <p className="mt-3 font12 text-secondary">
          در این قسمت می‌توانید از موقعیت دستگاه‌ها یا هشدارها گزارش دریافت
          کنید.
        </p>
      </div>
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
        {!getReportGPSLocations &&
          !getReportVehiclesChanges &&
          !getReportDriversConditions && (
            <Col md="3">
              <GetReportTime />
            </Col>
          )}
        {!getReportAlarms &&
          !getReportGPSLocations &&
          !getReportVehiclesChanges &&
          !getReportDriversConditions && (
            <Col md="3" className="mt-2">
              <GetReportSpeed />
            </Col>
          )}

        <Col md="3" className="d-flex align-items-end">
          <Button onClick={handleReport}>جستوجو</Button>
        </Col>
      </Row>
      <Row
        className="mx-auto mt-5 lightGray-bg borderRadius-15 border border-white border-2 shadow p-3"
        style={{ height: "500px", width: "100%" }}
      >
        <MapHeat />
      </Row>
    </div>
  );
};

export default GetReport;
