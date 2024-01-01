import React, { useEffect, useState } from "react";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetGetReportVehiclesLocations,
  selectGetReportVehiclesLocations,
  RsetGetReportAlarms,
  selectGetReportAlarms,
  RsetGetReportGPSLocations,
  selectGetReportGPSLocations,
  RsetGetReportVehiclesChanges,
  selectGetReportVehiclesChanges,
  RsetGetReportDriversConditions,
  selectGetReportDriversConditions,
  RsetGetReportList,
  RsetShowReportList,
  handleResetFormData,
} from "../../../slices/getReportSlices";
import { RsetFormErrors } from "../../../slices/mainSlices";

const Reports = () => {
  const [selectedOption, setSelectedOption] = useState("موقعیت ماشین ها");
  const dispatch = useDispatch();
  const getReportVehiclesLocations = useSelector(
    selectGetReportVehiclesLocations
  );
  const getReportAlarms = useSelector(selectGetReportAlarms);
  const getReportGPSLocations = useSelector(selectGetReportGPSLocations);
  const getReportVehiclesChanges = useSelector(selectGetReportVehiclesChanges);
  const getReportDriversConditions = useSelector(
    selectGetReportDriversConditions
  );

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    handleResetForm();
    if (selectedOption === "موقعیت ماشین ها") {
      dispatch(RsetGetReportVehiclesLocations(true));
    } else if (selectedOption === "هشدارها") {
      dispatch(RsetGetReportAlarms(true));
    } else if (selectedOption === "موقعیت GPS ها") {
      dispatch(RsetGetReportGPSLocations(true));
    } else if (selectedOption === "تغییرات ماشین ها") {
      dispatch(RsetGetReportVehiclesChanges(true));
    } else if (selectedOption === "وضعیت راننده ها") {
      dispatch(RsetGetReportDriversConditions(true));
    }
  }, [selectedOption]);

  const handleResetForm = () => {
    dispatch(RsetGetReportVehiclesLocations(false));
    dispatch(RsetGetReportAlarms(false));
    dispatch(RsetGetReportGPSLocations(false));
    dispatch(RsetGetReportVehiclesChanges(false));
    dispatch(RsetGetReportDriversConditions(false));
    dispatch(RsetGetReportList(""));
    dispatch(RsetShowReportList(false));
    //reset form
    dispatch(handleResetFormData());
    dispatch(RsetFormErrors(""));
  };

  return (
    <Form>
      <Form.Group className="p-3 d-flex flex-column bg-white borderRadius-bottom">
        <div className="d-flex justify-content-start gap-5 m-3">
          <Form.Check
            type="radio"
            name="locations"
            id="locations"
            value="موقعیت ماشین ها"
            label="موقعیت ماشین ها"
            // className="px-5 py-3 borderRadius-15 shadow"
            // style={{ background: "#EFEFEF" }}
            checked={selectedOption === "موقعیت ماشین ها"}
            onChange={(e) => {
              handleOptionChange(e);
            }}
          />
          <Form.Check
            type="radio"
            name="alarms"
            id="alarms"
            value="هشدارها"
            label="هشدارها"
            // className="px-5 py-3 borderRadius-15 shadow"
            // style={{ background: "#EFEFEF" }}
            checked={selectedOption === "هشدارها"}
            onChange={(e) => {
              handleOptionChange(e);
            }}
          />
          <Form.Check
            type="radio"
            name="gps"
            id="gps"
            value="موقعیت GPS ها"
            label="موقعیت GPS ها"
            // className="px-5 py-3 borderRadius-15 shadow"
            // style={{ background: "#EFEFEF" }}
            checked={selectedOption === "موقعیت GPS ها"}
            onChange={(e) => {
              handleOptionChange(e);
            }}
          />
          <Form.Check
            type="radio"
            name="vehicle"
            id="vehicle"
            value="تغییرات ماشین ها"
            label="تغییرات ماشین ها"
            // className="px-5 py-3 borderRadius-15 shadow"
            // style={{ background: "#EFEFEF" }}
            checked={selectedOption === "تغییرات ماشین ها"}
            onChange={(e) => {
              handleOptionChange(e);
            }}
          />
          <Form.Check
            type="radio"
            name="driver"
            id="driver"
            value="وضعیت راننده ها"
            label="وضعیت راننده ها"
            // className="px-5 py-3 borderRadius-15 shadow"
            // style={{ background: "#EFEFEF" }}
            checked={selectedOption === "وضعیت راننده ها"}
            onChange={(e) => {
              handleOptionChange(e);
            }}
          />
        </div>
      </Form.Group>
    </Form>
  );
};

export default Reports;
