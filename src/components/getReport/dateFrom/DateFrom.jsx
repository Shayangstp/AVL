import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
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
  handleViewPath,
} from "../../../slices/getReportSlices";
import { convertUnixTimeStampToDate } from "../../common/ConvertUnixStamp";

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
      dispatch(handleViewPath());
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

  const DatePickerInput = (props) => {
    return (
      <input className="form-control" style={{ zIndex: "100" }} {...props} />
    );
  };

  return (
    <Form className="d-flex flex-column flex-md-row">
      <Form.Group className="me-md-2 me-0 mb-3 mb-md-0">
        <Form.Label>از تاریخ</Form.Label>
        <DatePicker
          inputComponent={DatePickerInput}
          placeholder="انتخاب تاریخ"
          format="jYYYY/jMM/jDD"
          // className="bg-primary"
          onChange={(e) => {
            dispatch(RsetGetReportFromDate(e));
          }}
          value={fromDate}
          id="datePicker"
          preSelected="1396/05/15"
        />
      </Form.Group>
      <Form.Group className="">
        <Form.Label>تا تاریخ</Form.Label>
        <DatePicker
          inputComponent={DatePickerInput}
          placeholder="انتخاب تاریخ"
          format="jYYYY/jMM/jDD"
          onChange={(e) => {
            dispatch(RsetGetReportToDate(e));
          }}
          value={toDate}
          id="datePicker"
          preSelected="1396/05/15"
        />
      </Form.Group>
      <Form.Group>
        <Button
          variant="success"
          size="md"
          style={{ marginTop: "30px" }}
          className="ms-2 font12"
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
