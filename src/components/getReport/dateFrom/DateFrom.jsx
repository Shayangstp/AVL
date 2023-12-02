import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import DatePicker from "react-datepicker2";
import {
  RsetGetReportFromDate,
  RsetGetReportToDate,
  selectGetReportFromDate,
  selectGetReportToDate,
} from "../../../slices/getReportSlices";

const DateFrom = () => {
  const dispatch = useDispatch();
  const fromDate = useSelector(selectGetReportFromDate);
  const toDate = useSelector(selectGetReportToDate);
  const formErrors = useSelector(selectFormErrors);

  const fromDateIsValid = fromDate !== null;
  const toDateIsValid = toDate !== null;
  const formIsValid = fromDateIsValid && toDateIsValid;

  const validation = () => {
    let errors = {};
    const borderValidation = "border border-danger";
    if (!fromDateIsValid) {
      errors.fromDate = borderValidation;
    }
    if (!toDateIsValid) {
      errors.toDate = borderValidation;
    }
    return errors;
  };
  const handleDateSearch = (e) => {
    if (formIsValid) {
      console.log({
        fromDate,
        toDate,
      });
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            fromDate,
            toDate,
          })
        )
      );
    }
  };
  return (
    <Form className="d-flex">
      <Form.Group className="me-2">
        <Form.Label>از تاریخ</Form.Label>
        <DatePicker
          timePicker={false}
          className={`form-control ${
            !fromDateIsValid ? formErrors.fromDate : ""
          }`}
          showTodayButton={false}
          isGregorian={false}
          value={fromDate}
          onChange={async (value) => {
            dispatch(RsetGetReportFromDate(value));
          }}
        />
      </Form.Group>
      <Form.Group className="">
        <Form.Label>تا تاریخ</Form.Label>
        <DatePicker
          timePicker={false}
          className={`form-control ${!toDateIsValid ? formErrors.toDate : ""}`}
          showTodayButton={false}
          isGregorian={false}
          value={toDate}
          onChange={async (value) => {
            dispatch(RsetGetReportToDate(value));
          }}
        />
      </Form.Group>
      <Form.Group>
        <Button
          variant="success"
          size="sm"
          className="mt-4 ms-2 font12"
          onClick={(e) => {
            handleDateSearch(e);
          }}
        >
          جستوجو
        </Button>
      </Form.Group>
    </Form>
  );
};

export default DateFrom;
