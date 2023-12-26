import React from "react";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
} from "react-advance-jalaali-datepicker";
import {
  RsetGetReportFromDate,
  RsetGetReportToDate,
  selectGetReportFromDate,
  selectGetReportToDate,
} from "../../../slices/getReportSlices";
import {
  convertUnixTimeStampToDate,
  convertUnixTimeStampToDateZz,
} from "../../common/ConvertUnixStamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const GetReportDateForm = () => {
  const dispatch = useDispatch();
  const fromDate = useSelector(selectGetReportFromDate);
  const toDate = useSelector(selectGetReportToDate);

  // console.log({
  //   fromDate: convertUnixTimeStampToDateZz(fromDate),
  //   toDate: convertUnixTimeStampToDateZz(toDate),
  // });

  const DatePickerInput = (props) => {
    return (
      <input className="form-control" style={{ zIndex: "100" }} {...props} />
    );
  };

  return (
    <Form className="bg-light borderRadius-bottom shadow">
      <Form.Group>
        <div className="reportHeader p-3" style={{ background: "#eab56f" }}>
          <span className="me-2">
            <FontAwesomeIcon icon={faCalendar} />
          </span>
          تاریخ
        </div>
        <div className="p-3 borderRadius-15">
          <Form.Group className="mt-2">
            <Form.Label>از</Form.Label>
            <DatePicker
              inputComponent={DatePickerInput}
              placeholder="...انتخاب"
              format="jYYYY/jMM/jDD"
              // className="bg-primary"
              onChange={(e) => {
                dispatch(RsetGetReportFromDate(e));
              }}
              value={fromDate}
              id="datePicker"
              // preSelected="1396/05/15"
            />
          </Form.Group>
          <Form.Group className="mt-2 mb-4">
            <Form.Label>تا</Form.Label>
            <DatePicker
              inputComponent={DatePickerInput}
              placeholder="...انتخاب"
              format="jYYYY/jMM/jDD"
              onChange={(e) => {
                dispatch(RsetGetReportToDate(e));
              }}
              value={toDate}
              id="datePicker"
              // preSelected="1396/05/15"
            />
          </Form.Group>
        </div>
      </Form.Group>
    </Form>
  );
};

export default GetReportDateForm;
