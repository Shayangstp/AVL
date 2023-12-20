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
  };

  return (
    <Form>
      <Form.Group className="border p-3 bg-light rounded d-flex flex-column">
        <div className="mt-2">نوع گزارش</div>
        <div className="d-flex gap-5 m-3">
          <Form.Check
            type="radio"
            name="reports"
            value="موقعیت ماشین ها"
            label="موقعیت ماشین ها"
            className=""
            checked={selectedOption === "موقعیت ماشین ها"}
            onChange={(e) => {
              handleOptionChange(e);
            }}
          />
          <Form.Check
            type="radio"
            name="reports"
            value="هشدارها"
            label="هشدارها"
            checked={selectedOption === "هشدارها"}
            onChange={(e) => {
              handleOptionChange(e);
            }}
          />
          <Form.Check
            type="radio"
            name="reports"
            value="موقعیت GPS ها"
            label="موقعیت GPS ها"
            checked={selectedOption === "موقعیت GPS ها"}
            onChange={(e) => {
              handleOptionChange(e);
            }}
          />
          <Form.Check
            type="radio"
            name="reports"
            value="تغییرات ماشین ها"
            label="تغییرات ماشین ها"
            checked={selectedOption === "تغییرات ماشین ها"}
            onChange={(e) => {
              handleOptionChange(e);
            }}
          />
          <Form.Check
            type="radio"
            name="reports"
            value="وضعیت راننده ها"
            label="وضعیت راننده ها"
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
