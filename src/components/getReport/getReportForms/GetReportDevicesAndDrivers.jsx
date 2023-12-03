import React from "react";
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
} from "../../../slices/getReportSlices";

const GetReportDevicesAndDrivers = () => {
  //fill the options --> make it here for now
  const dispatch = useDispatch();
  const getReportDriversConditions = useSelector(
    selectGetReportDriversConditions
  );
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
    <Form className="border p-3 bg-light rounded">
      <Form.Group>
        <Form.Label>
          {!getReportDriversConditions ? "دستگاه ها" : "راننده ها"}
        </Form.Label>
        <Form.Group className="mt-2">
          <Form.Label>گروه</Form.Label>
          <Select
            value={getReportGroups}
            name="groups"
            onChange={(e) => {
              dispatch(RsetGetReportGroups(e));
            }}
            placeholder="انتخاب..."
            options={getReportGroupsOptions}
            isSearchable={true}
            isMulti
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>
            {!getReportVehiclesChanges ? "راننده" : "پلاک"}
          </Form.Label>
          <Select
            value={
              !getReportVehiclesChanges
                ? getReportDrivers
                : getReportVehiclesNumber
            }
            name="drivers"
            onChange={(e) => {
              dispatch(RsetGetReportDrivers(e));
            }}
            placeholder="انتخاب..."
            options={
              !getReportVehiclesChanges
                ? getReportDriversOptions
                : getReportVehiclesNumberOptions
            }
            isSearchable={true}
            isMulti
          />
        </Form.Group>
      </Form.Group>
    </Form>
  );
};

export default GetReportDevicesAndDrivers;
