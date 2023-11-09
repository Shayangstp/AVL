import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker2";
import Select from "react-select";

import { NumericFormat } from "react-number-format";
import {
  RsetDeviceImeiFilter,
  RsetDeviceNumberFilter,
  RsetDriverNameFilter,
  RsetDriverNumberFilter,
  RsetVehicleNumberFilter,
  RsetDeviceCategoryFilter,
  RsetVehicleCompanyFilter,
  RsetVehicleUsingFilter,
  selectDeviceImeiFilter,
  selectDeviceNumberFilter,
  selectDriverNameFilter,
  selectDriverNumberFilter,
  selectVehicleNumberFilter,
  selectDeviceCategoryFilter,
  selectVehicleCompanyFilter,
  selectVehicleUsingFilter,
} from "../../slices/deviceSlices";

const DeviceFilter = () => {
  const dispatch = useDispatch();
  const deviceImeiFilter = useSelector(selectDeviceImeiFilter);
  const deviceNumberFilter = useSelector(selectDeviceNumberFilter);
  const driverNameFilter = useSelector(selectDriverNameFilter);
  const driverNumberFilter = useSelector(selectDriverNumberFilter);
  const vehicleNumberFilter = useSelector(selectVehicleNumberFilter);
  const deviceCategoryFilter = useSelector(selectDeviceCategoryFilter);
  const vehicleCompanyFilter = useSelector(selectVehicleCompanyFilter);
  const vehicleUsingFilter = useSelector(selectVehicleUsingFilter);

  // useEffect(() => {
  //   dispatch(handleAllStatuses(6));
  // }, []);

  // useEffect(() => {
  //   if (user.Location !== undefined) {
  //     dispatch(handleDepartments());
  //   }
  // }, [user]);

  return (
    <div
      // className="d-flex flex-column  mb-5 lightGray2-bg p-3 borderRadius m-auto shadow border border-white border-2"
    >
      <Row className="align-items-center py-2">
        <Form.Group className="d-flex align-items-center mb-3">
          <Form.Switch
            type="checkbox"
            name="realFilter"
            // value={realFilter}
            // checked={realFilter}
            onChange={() => {
              // dispatch(RsetRealFilter(!realFilter));
            }}
          />
          <Form.Label className="font12 mb-0"> فیلتر لحظه ای </Form.Label>
        </Form.Group>
        <Form.Group as={Col} md="2" xxl="2" className="mb-4 mb-xxl-0">
          <Form.Label htmlFor="serial">IMEI دستگاه</Form.Label>
          <NumericFormat
            dir="ltr"
            id="deviceImei"
            type="text"
            maxLength={6}
            className="form-control"
            value={deviceImeiFilter}
            onChange={async (e) => {
              // dispatch(RsetSerialFilter(e.target.value));
              // const handleFilterGroup = await dispatch(handleTabs());
              // if (realFilter === true) {
              //   if (activeTab !== "") {
              //     const filterValues = {
              //       applicantId: localStorage.getItem("id"),
              //       serial: e.target.value.length === 6 ? e.target.value : "",
              //       memberId: userFilter.value,
              //       status: statusFilter.value,
              //       fromDate:
              //         fromDateFilter !== null
              //           ? fromDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       toDate:
              //         toDateFilter !== null
              //           ? toDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       type: 6,
              //       mDep: depFilter.value,
              //       group: handleFilterGroup.payload,
              //     };
              //     dispatch(handleReqsList(filterValues));
              //   }
              // }
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md="2" xxl="2" className="mb-4 mb-xxl-0">
          <Form.Label htmlFor="reqPer">شماره تلفن سیمکارت</Form.Label>
          <NumericFormat
            dir="ltr"
            id="deviceNumberFilter"
            type="text"
            maxLength={6}
            className="form-control"
            value={deviceNumberFilter}
            onChange={async (e) => {
              // dispatch(RsetSerialFilter(e.target.value));
              // const handleFilterGroup = await dispatch(handleTabs());
              // if (realFilter === true) {
              //   if (activeTab !== "") {
              //     const filterValues = {
              //       applicantId: localStorage.getItem("id"),
              //       serial: e.target.value.length === 6 ? e.target.value : "",
              //       memberId: userFilter.value,
              //       status: statusFilter.value,
              //       fromDate:
              //         fromDateFilter !== null
              //           ? fromDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       toDate:
              //         toDateFilter !== null
              //           ? toDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       type: 6,
              //       mDep: depFilter.value,
              //       group: handleFilterGroup.payload,
              //     };
              //     dispatch(handleReqsList(filterValues));
              //   }
              // }
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md="2" xxl="2" className="mb-4 mb-xxl-0">
          <Form.Label htmlFor="reqCon">نام راننده</Form.Label>
          <Form.Control
            type="text"
            name="driverNameFilter"
            value={driverNameFilter}
            onChange={async (e) => {
              // const handleFilterGroup = await dispatch(handleTabs());
              // dispatch(RsetStatusFilter(e));
              // if (realFilter === true) {
              //   if (activeTab !== "") {
              //     const filterValues = {
              //       applicantId: localStorage.getItem("id"),
              //       serial: serialFilter,
              //       memberId: userFilter.value,
              //       status: e.value,
              //       fromDate:
              //         fromDateFilter !== null
              //           ? fromDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       toDate:
              //         toDateFilter !== null
              //           ? toDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       type: 6,
              //       mDep: depFilter.value,
              //       group: handleFilterGroup.payload,
              //     };
              //     dispatch(handleReqsList(filterValues));
              //   }
              // }
            }}
            // options={statusOptions}
          />
        </Form.Group>
        <Form.Group as={Col} md="2" xxl="2" className="mb-4 mb-xl-0">
          <Form.Label>تلفن راننده</Form.Label>
          <NumericFormat
            id="driverNameFilter"
            value={driverNameFilter}
            onChange={async (value) => {
              // const handleFilterGroup = await dispatch(handleTabs());
              // dispatch(RsetFromDateFilter(value));
              // if (realFilter === true) {
              //   if (activeTab !== "") {
              //     const filterValues = {
              //       applicantId: localStorage.getItem("id"),
              //       serial: serialFilter,
              //       memberId: userFilter.value,
              //       status: statusFilter.value,
              //       fromDate:
              //         value !== null ? value.format("YYYY/MM/DD") : "null",
              //       toDate:
              //         toDateFilter !== null
              //           ? toDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       type: 6,
              //       mDep: depFilter.value,
              //       group: handleFilterGroup.payload,
              //     };
              //     dispatch(handleReqsList(filterValues));
              //   }
              // }
            }}
            className="form-control"
          />
        </Form.Group>
        <Form.Group as={Col} md="2" xxl="2" className="mb-4 mb-xl-0">
          <Form.Label>پلاک</Form.Label>
          <NumericFormat
            id="vehicleNumberFilter"
            value={vehicleNumberFilter}
            onChange={async (value) => {
              // const handleFilterGroup = await dispatch(handleTabs());
              // dispatch(RsetToDateFilter(value));
              // if (realFilter === true) {
              //   if (activeTab !== "") {
              //     const filterValues = {
              //       applicantId: localStorage.getItem("id"),
              //       serial: serialFilter,
              //       memberId: userFilter.value,
              //       status: statusFilter.value,
              //       fromDate:
              //         fromDateFilter !== null
              //           ? fromDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       toDate:
              //         value !== null ? value.format("YYYY/MM/DD") : "null",
              //       type: 6,
              //       mDep: depFilter.value,
              //       group: handleFilterGroup.payload,
              //     };
              //     dispatch(handleReqsList(filterValues));
              //   }
              // }
            }}
            className="form-control overflow-auto"
            inputReadOnly
          />
        </Form.Group>
        <Form.Group as={Col} md="2" xxl="2" className="mb-4 mb-xl-0">
          {/* ask */}
          <Form.Label>دسته ها</Form.Label>
          <Form.Control
            id="deviceCategoryFilter"
            value={deviceCategoryFilter}
            onChange={async (value) => {
              // const handleFilterGroup = await dispatch(handleTabs());
              // dispatch(RsetToDateFilter(value));
              // if (realFilter === true) {
              //   if (activeTab !== "") {
              //     const filterValues = {
              //       applicantId: localStorage.getItem("id"),
              //       serial: serialFilter,
              //       memberId: userFilter.value,
              //       status: statusFilter.value,
              //       fromDate:
              //         fromDateFilter !== null
              //           ? fromDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       toDate:
              //         value !== null ? value.format("YYYY/MM/DD") : "null",
              //       type: 6,
              //       mDep: depFilter.value,
              //       group: handleFilterGroup.payload,
              //     };
              //     dispatch(handleReqsList(filterValues));
              //   }
              // }
            }}
            className="form-control overflow-auto"
            inputReadOnly
          />
        </Form.Group>
        <Form.Group as={Col} md="2" xxl="2" className="mb-4 mb-xl-0">
          <Form.Label>شرکت سازنده</Form.Label>
          <Form.Control
            id="vehicleCompanyFilter"
            value={vehicleCompanyFilter}
            onChange={async (value) => {
              // const handleFilterGroup = await dispatch(handleTabs());
              // dispatch(RsetToDateFilter(value));
              // if (realFilter === true) {
              //   if (activeTab !== "") {
              //     const filterValues = {
              //       applicantId: localStorage.getItem("id"),
              //       serial: serialFilter,
              //       memberId: userFilter.value,
              //       status: statusFilter.value,
              //       fromDate:
              //         fromDateFilter !== null
              //           ? fromDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       toDate:
              //         value !== null ? value.format("YYYY/MM/DD") : "null",
              //       type: 6,
              //       mDep: depFilter.value,
              //       group: handleFilterGroup.payload,
              //     };
              //     dispatch(handleReqsList(filterValues));
              //   }
              // }
            }}
            className="form-control overflow-auto"
            inputReadOnly
          />
        </Form.Group>
        <Form.Group as={Col} md="2" xxl="2" className="mb-4 mb-xl-0">
          <Form.Label>کاربری</Form.Label>
          <Form.Control
            id="vehicleUsingFilter"
            value={vehicleUsingFilter}
            onChange={async (value) => {
              // const handleFilterGroup = await dispatch(handleTabs());
              // dispatch(RsetToDateFilter(value));
              // if (realFilter === true) {
              //   if (activeTab !== "") {
              //     const filterValues = {
              //       applicantId: localStorage.getItem("id"),
              //       serial: serialFilter,
              //       memberId: userFilter.value,
              //       status: statusFilter.value,
              //       fromDate:
              //         fromDateFilter !== null
              //           ? fromDateFilter.format("YYYY/MM/DD")
              //           : "null",
              //       toDate:
              //         value !== null ? value.format("YYYY/MM/DD") : "null",
              //       type: 6,
              //       mDep: depFilter.value,
              //       group: handleFilterGroup.payload,
              //     };
              //     dispatch(handleReqsList(filterValues));
              //   }
              // }
            }}
            className="form-control overflow-auto"
            inputReadOnly
          />
        </Form.Group>
      </Row>
      <Row>
        <Col md="4" lg="3" xl="3" className="mt-4 ms-auto">
          <div className="d-flex justify-content-end">
            <Button
              variant="success"
              className="mb-1  font10"
              size="lg"
              onClick={async () => {
                // const handleFilterGroup = await dispatch(handleTabs());
                // console.log(handleFilterGroup);
                // if (activeTab !== "") {
                //   const filterValues = {
                //     applicantId: localStorage.getItem("id"),
                //     serial: serialFilter !== "" ? serialFilter : serialFilter,
                //     memberId: userFilter !== "" ? userFilter.value : userFilter,
                //     status:
                //       statusFilter !== "" ? statusFilter.value : statusFilter,
                //     fromDate:
                //       fromDateFilter !== null
                //         ? fromDateFilter.format("YYYY/MM/DD")
                //         : "null",
                //     toDate:
                //       toDateFilter !== null
                //         ? toDateFilter.format("YYYY/MM/DD")
                //         : "null",
                //     type: 6,
                //     mDep: depFilter ? depFilter.value : "",
                //     group: handleFilterGroup.payload,
                //   };
                //   dispatch(handleReqsList(filterValues));
                //   console.log(filterValues);
                // }
              }}
            >
              اعمال فیلتر
            </Button>
            <Button
              variant="secondary"
              type="reset"
              className="mb-1 ms-2 font10"
              size="lg"
              onClick={async () => {
                // dispatch(handleSoftwareFilterReset());
                // const handleFilterGroup = await dispatch(handleTabs());
                // if (activeTab !== "") {
                //   const filterValues = {
                //     applicantId: localStorage.getItem("id"),
                //     serial: "",
                //     memberId: "",
                //     status: "",
                //     fromDate: "null",
                //     toDate: "null",
                //     type: 6,
                //     mDep: "",
                //     group: handleFilterGroup.payload,
                //   };
                //   dispatch(handleReqsList(filterValues));
                // }
              }}
            >
              لغو فیلتر
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DeviceFilter;
