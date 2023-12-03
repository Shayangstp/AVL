import React from "react";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker2";
import {
  RsetGetReportFromDate,
  RsetGetReportToDate,
  selectGetReportFromDate,
  selectGetReportToDate,
} from "../../../slices/getReportSlices";

const GetReportDateForm = () => {
  const dispatch = useDispatch();
  const fromDate = useSelector(selectGetReportFromDate);
  const toDate = useSelector(selectGetReportToDate);

  return (
    <Form className="border p-3 bg-light rounded">
      <Form.Group>
        <Form.Label>تاریخ</Form.Label>
        <Form.Group className="mt-2">
          <Form.Label>از</Form.Label>
          <DatePicker
            timePicker={false}
            className={`form-control`}
            showTodayButton={false}
            isGregorian={false}
            value={fromDate}
            onChange={async (value) => {
              dispatch(RsetGetReportFromDate(value));
            }}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>تا</Form.Label>
          <DatePicker
            timePicker={false}
            className={`form-control`}
            showTodayButton={false}
            isGregorian={false}
            value={toDate}
            onChange={async (value) => {
              dispatch(RsetGetReportToDate(value));
            }}
          />
        </Form.Group>
      </Form.Group>
    </Form>
  );
};

export default GetReportDateForm;
