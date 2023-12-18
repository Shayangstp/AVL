import React, { useEffect } from "react";
import MapHeat from "../map/MapHeat";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
} from "react-advance-jalaali-datepicker";
import Select from "react-select";
import { convertUnixTimeStampToDate } from "../common/ConvertUnixStamp";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetGetReportFromDate,
  RsetGetReportToDate,
  selectGetReportFromDate,
  selectGetReportToDate,
  handleViewPath,
  selectGetReportSelectedItems,
  selectGetReportGroupList,
  handleGroupList,
  RsetGetReportGroupValue,
  selectGetReportGroupValue,
  RsetGetReportVehicleValue,
  selectGetReportVehicleValue,
} from "../../slices/getReportSlices";
import { RsetFormErrors, selectFormErrors } from "../../slices/mainSlices";

const ViewPath = () => {
  const dispatch = useDispatch();
  const fromDate = useSelector(selectGetReportFromDate);
  const toDate = useSelector(selectGetReportToDate);
  const selectedItems = useSelector(selectGetReportSelectedItems);
  const formErrors = useSelector(selectFormErrors);
  const groupList = useSelector(selectGetReportGroupList);
  const groupValue = useSelector(selectGetReportGroupValue);
  const vehicleValue = useSelector(selectGetReportVehicleValue);

  console.log(groupList);

  const groupListOptions = groupList.map((item, idx) => {
    return { label: item?.name, value: idx };
  });

  const vehicleList = groupList.find((item, idx) => {
    return groupValue.label === undefined
      ? false
      : item.name === groupValue.label;
  });

  const vehicleListOptions = vehicleList?.devices.map((item, idx) => {
    return {
      label:
        "نام راننده: " + item.driverName + " , " + "شماره پلاک : " + item.plate,
      value: item.deviceIMEI,
    };
  });

  console.log(vehicleListOptions);

  const fromDateIsValid = fromDate !== null;
  const toDateIsValid = toDate !== null;
  const selectedItemsIsValid = selectedItems.length > 0;
  const formIsValid = fromDateIsValid && toDateIsValid && selectedItemsIsValid;

  useEffect(() => {
    dispatch(handleGroupList());
  }, []);

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
      // dispatch(handleViewPath());
      const token = localStorage.getItem("token");
      const values = {
        bTime: String(fromDate),
        eTime: String(toDate),
      };
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

  // report should be fix in data
  console.log(vehicleValue);

  return (
    <Container fluid className="p-5 my-2">
      <div className="lightGray-bg borderRadius-15 border border-white border-2 shadow p-4">
        <h1 className="fs-5">مشاهده مسیر</h1>
        <h6 className="mt-3">در این قسمت مشاهده مسیر دستگاه ها انجام می شود</h6>
        <div className="mt-5">
          <Form className="d-flex flex-column flex-md-row">
            <Form.Group as={Col} md="2" className="me-md-2 me-0 mb-3 mb-md-0">
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
            <Form.Group as={Col} md="2" className="me-md-2 me-0">
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
            <Form.Group as={Col} md="3" className="me-md-2 me-0">
              <Form.Label>نام دسته</Form.Label>
              <Select
                // className={`${!deviceTypeIsValid ? formErrors.deviceType : ""}`}
                value={groupValue}
                name="deviceType"
                onChange={(e) => {
                  console.log(e);
                  dispatch(RsetGetReportGroupValue(e));
                }}
                placeholder="انتخاب..."
                options={groupListOptions}
                isSearchable={true}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" className="">
              <Form.Label>انتخاب وسیله نقلیه</Form.Label>
              <Select
                // className={`${!deviceTypeIsValid ? formErrors.deviceType : ""}`}
                value={vehicleValue}
                name="deviceType"
                onChange={(e) => {
                  dispatch(RsetGetReportVehicleValue(e));
                }}
                placeholder="انتخاب..."
                options={vehicleListOptions}
                isSearchable={true}
                isMulti
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
          className="ms-0 ms-md-5 mt-5 lightGray-bg borderRadius-15 border border-white border-2 shadow p-3"
          style={{ height: "500px" }}
        >
          <MapHeat />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewPath;
