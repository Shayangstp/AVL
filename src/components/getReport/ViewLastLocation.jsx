import React from "react";
import ViewLastLocationList from "./viewLastLocationList/ViewLastLocationList";
import MapHeat from "../map/MapHeat";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
} from "react-advance-jalaali-datepicker";
import { convertUnixTimeStampToDate } from "../common/ConvertUnixStamp";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetGetReportFromDate,
  RsetGetReportToDate,
  selectGetReportFromDate,
  selectGetReportToDate,
  handleViewPath,
  selectGetReportSelectedItems,
} from "../../slices/getReportSlices";
import { RsetFormErrors, selectFormErrors } from "../../slices/mainSlices";

const ViewLastLocation = () => {
  const dispatch = useDispatch();
  const fromDate = useSelector(selectGetReportFromDate);
  const toDate = useSelector(selectGetReportToDate);
  const selectedItems = useSelector(selectGetReportSelectedItems);
  const formErrors = useSelector(selectFormErrors);

  const fromDateIsValid = fromDate !== null;
  const toDateIsValid = toDate !== null;
  const selectedItemsIsValid = selectedItems.length > 0;
  const formIsValid = fromDateIsValid && toDateIsValid && selectedItemsIsValid;

  const validation = () => {
    let errors = {};
    const borderValidation = "border border-danger";
    if (!fromDateIsValid) {
      errors.fromDate = borderValidation;
    }
    if (!toDateIsValid) {
      errors.toDate = borderValidation;
    }
    if (!selectedItemsIsValid) {
      errors.selectedItems = "از داخل لیست وسیله نقلیه مورد نظر را انتخاب کنید";
    }
    return errors;
  };

  const handleDateSearch = (e) => {
    if (formIsValid) {
      //change this
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
      <input
        className={`form-control ${
          !fromDateIsValid && !toDateIsValid ? formErrors.fromDate : ""
        }`}
        style={{ zIndex: "100" }}
        {...props}
      />
    );
  };
  return (
    <Container fluid className="p-5 my-2">
      <div className="lightGray-bg borderRadius-15 border border-white border-2 shadow p-4">
        <h1 className="fs-5">مشاهده اخرین موقعیت</h1>
        <h6 className="mt-3">
          در این قسمت مشاهده آخرین موقعیت دستگاه ها انجام می شود
        </h6>
        <div className="mt-5">
          <Form className="d-flex flex-column flex-md-row">
            <Form.Group className="me-md-2 me-0 mb-3 mb-md-0">
              <Form.Label>از تاریخ</Form.Label>
              <DatePicker
                inputComponent={DatePickerInput}
                placeholder="...انتخاب"
                format="jYYYY/jMM/jDD"
                className=""
                onChange={(e) => {
                  dispatch(RsetGetReportFromDate(e));
                }}
                value={fromDate}
                id="datePicker"
              />
            </Form.Group>
            <Form.Group className="">
              <Form.Label>تا تاریخ</Form.Label>
              <DatePicker
                inputComponent={DatePickerInput}
                placeholder="...انتخاب"
                format="jYYYY/jMM/jDD"
                onChange={(e) => {
                  dispatch(RsetGetReportToDate(e));
                }}
                value={toDate}
                id="datePicker"
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
          {!formIsValid && (
            <p className="text-danger mt-3 font10">
              {formErrors.selectedItems}
            </p>
          )}
        </div>
      </div>
      <Row className="d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start">
        <Col
          xs={12}
          md={5}
          className="lightGray-bg borderRadius-15 border border-white border-2 shadow mt-5"
        >
          <ViewLastLocationList />
        </Col>
        <Col
          xs={12}
          md={6}
          className="ms-0 ms-md-5 mt-5 lightGray-bg borderRadius-15 border border-white border-2 shadow p-3"
          style={{ height: "500px" }}
        >
          <MapHeat />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewLastLocation;
