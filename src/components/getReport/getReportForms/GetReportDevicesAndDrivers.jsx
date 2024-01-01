import React, { useEffect } from "react";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGetReportDriversConditions,
  selectGetReportVehiclesChanges,
  //
  RsetGetReportGroups,
  selectGetReportGroups,
  RsetGetReportGroupsOptions,
  selectGetReportGroupsOptions,
  RsetGetReportDrivers,
  selectGetReportDrivers,
  RsetGetReportDriversOptions,
  selectGetReportDriversOptions,
  RsetGetReportVehiclesNumber,
  selectGetReportVehiclesNumber,
  RsetGetReportVehiclesNumberOptions,
  selectGetReportVehiclesNumberOptions,
  handleGroupList,
  selectGetReportGroupList,
  selectGetReportGroupValue,
  selectGetReportVehicleValue,
  RsetGetReportGroupValue,
  RsetGetReportVehicleValue,
} from "../../../slices/getReportSlices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { selectFormErrors } from "../../../slices/mainSlices";

const GetReportDevicesAndDrivers = () => {
  //fill the options --> make it here for now
  const dispatch = useDispatch();
  const getReportDriversConditions = useSelector(
    selectGetReportDriversConditions
  );
  const groupList = useSelector(selectGetReportGroupList);
  const groupValue = useSelector(selectGetReportGroupValue);
  const vehicleValue = useSelector(selectGetReportVehicleValue);
  const FormErrors = useSelector(selectFormErrors);

  useEffect(() => {
    dispatch(handleGroupList());
  }, []);

  const groupListOptions = groupList.map((item, idx) => {
    return { label: item?.name, value: item?._id };
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
  const platesListOptions = vehicleList?.devices.map((item, idx) => {
    return {
      label: item.plate,
      value: item.deviceIMEI,
    };
  });

  useEffect(() => {
    dispatch(RsetGetReportVehicleValue(""));
  }, [groupValue]);

  const getReportVehiclesChanges = useSelector(selectGetReportVehiclesChanges);
  const getReportGroups = useSelector(selectGetReportGroups);
  const getReportDrivers = useSelector(selectGetReportDrivers);
  const getReportGroupsOptions = useSelector(selectGetReportGroupsOptions);
  const getReportDriversOptions = useSelector(selectGetReportDriversOptions);
  const getReportVehiclesNumber = useSelector(selectGetReportVehiclesNumber);
  const getReportVehiclesNumberOptions = useSelector(
    selectGetReportVehiclesNumberOptions
  );

  return (
    <Form className="bg-light borderRadius-15 shadow">
      <Form.Group>
        <div className="deviceHeader p-3 borderRadius-top">
          <span className="me-2">
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          {!getReportDriversConditions ? "دستگاه ها" : "راننده ها"}
        </div>
        <div className="p-3 borderRadius-15">
          <Form.Group className="mt-2 ">
            <Form.Label>گروه</Form.Label>
            <Select
              value={groupValue}
              name="groups"
              onChange={(e) => {
                dispatch(RsetGetReportGroupValue(e));
              }}
              placeholder="انتخاب..."
              options={groupListOptions}
              isSearchable={true}
              // isMulti
            />
          </Form.Group>
          <Form.Group className="mt-2 mb-3">
            <Form.Label>
              {!getReportVehiclesChanges ? "راننده" : "پلاک"}
            </Form.Label>
            {!getReportVehiclesChanges ? (
              <Select
                value={vehicleValue}
                name="drivers"
                onChange={(e) => {
                  dispatch(RsetGetReportVehicleValue(e));
                }}
                placeholder="انتخاب..."
                options={vehicleListOptions}
                isSearchable={true}
                isMulti
              />
            ) : (
              <Select
                value={getReportVehiclesNumber}
                name="drivers"
                onChange={(e) => {
                  dispatch(RsetGetReportVehiclesNumber(e));
                }}
                placeholder="انتخاب..."
                options={platesListOptions}
                isSearchable={true}
                isMulti
              />
            )}
          </Form.Group>
        </div>
      </Form.Group>
    </Form>
  );
};

export default GetReportDevicesAndDrivers;
