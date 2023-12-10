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
import { convertUnixTimeStampToDate } from "../../common/ConvertUnixStamp";

const GetReportDateForm = () => {
  const dispatch = useDispatch();
  const fromDate = useSelector(selectGetReportFromDate);
  const toDate = useSelector(selectGetReportToDate);

  console.log({
    fromDate: convertUnixTimeStampToDate(fromDate),
    toDate: convertUnixTimeStampToDate(toDate),
  });

  const DatePickerInput = (props) => {
    return (
      <input className="form-control" style={{ zIndex: "100" }} {...props} />
    );
  };

  return (
    <Form className="border p-3 bg-light rounded">
      <Form.Group>
        <Form.Label>تاریخ</Form.Label>
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
        <Form.Group className="mt-2">
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
      </Form.Group>
    </Form>
  );
};

export default GetReportDateForm;
