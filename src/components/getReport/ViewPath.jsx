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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections, faMap, faUser } from "@fortawesome/free-solid-svg-icons";

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
    <Container fluid className="p-3">
      <div className="d-flex flex-md-row flex-column gap-2">
        <Col md="3" className=" borderRadius-15 shadow bg-white">
          <div className="deviceHeader p-3 borderRadius-top">
            <span className="me-2">
              <FontAwesomeIcon icon={faDirections} />
            </span>
            مشاهده مسیر
          </div>
          <div className="p-3 ">
            <p className="mt-3 font12">
              در این قسمت مشاهده مسیر دستگاه ها انجام می شود .
            </p>

            <Form className="mt-5 d-flex flex-column gap-3">
              <Form.Group as={Col} className="">
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
              <Form.Group as={Col} className="mt-2">
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
              <Form.Group as={Col} className="mb-3 mb-md-0 mt-2">
                <Form.Label>از تاریخ</Form.Label>
                <DatePicker
                  inputComponent={DatePickerInput}
                  placeholder="...انتخاب"
                  format="jYYYY/jMM/jDD"
                  onChange={(e) => {
                    dispatch(RsetGetReportFromDate(e));
                  }}
                  value={fromDate}
                  id="datePicker"
                />
              </Form.Group>
              <Form.Group as={Col} className="mt-2">
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
              <Form.Group className="d-flex justify-content-end mt-2">
                <Button
                  variant="dark"
                  size="md"
                  style={{ marginTop: "30px" }}
                  className="ms-2 font12"
                  onClick={(e) => {
                    handleDateSearch(e);
                  }}
                >
                  جستجو
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  style={{ marginTop: "30px" }}
                  className="ms-2 font12"
                  onClick={(e) => {
                    handleDateSearch(e);
                  }}
                >
                  انصراف
                </Button>
              </Form.Group>
            </Form>
            {!formIsValid && (
              <p className="text-danger mt-3 font10">
                {formErrors.selectedItems}
              </p>
            )}
          </div>
        </Col>
        <Col className="borderRadius-15  shadow" style={{ height: "500px" }}>
          <div className="deviceHeader p-3 borderRadius-top">
            <span className="me-2">
              <FontAwesomeIcon icon={faMap} />
            </span>
            نقشه مسیر
          </div>
          <div className="w-100" style={{ height: "88vh" }}>
            <MapHeat height={"80%"} width={"100%"} />
          </div>
        </Col>
      </div>
    </Container>
  );
};

export default ViewPath;
