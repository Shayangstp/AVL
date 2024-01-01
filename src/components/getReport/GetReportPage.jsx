import React, { useEffect, useState } from "react";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import {
  Input,
  Space,
  Table,
  Collapse,
  Popconfirm,
  Select,
  ConfigProvider,
  Empty,
  Pagination,
} from "antd";
import faIR from "antd/lib/locale/fa_IR";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Reports from "./getReportForms/Reports";
import GetReportDevicesAndDrivers from "./getReportForms/GetReportDevicesAndDrivers";
import GetReportDateForm from "./getReportForms/GetReportDateForm";
import GetReportTime from "./getReportForms/GetReportTime";
import GetReportSpeed from "./getReportForms/GetReportSpeed";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGetReportGroups,
  selectGetReportDrivers,
  selectGetReportVehiclesNumber,
  selectGetReportFromDate,
  selectGetReportToDate,
  selectGetReportFromTime,
  selectGetReportToTime,
  selectGetReportFromSpeed,
  selectGetReportToSpeed,
  selectGetReportAlarms,
  selectGetReportGPSLocations,
  selectGetReportVehiclesChanges,
  selectGetReportDriversConditions,
  RsetGetAlarmsReport,
  selectGetAlarmsReport,
  RsetGetAlarmsReportList,
  selectGetAlarmsReportList,
  selectGetReportGroupValue,
  selectGetReportVehicleValue,
  RsetGetReportVehiclesLocations,
  selectGetReportVehiclesLocations,
} from "../../slices/getReportSlices";
import MapHeat from "../map/MapHeat";
import { postAlarmsReport } from "../../services/getReportServices";
import GetVehicleLocationReport from "./GetVehicleLocationReport";
import GetAlarmReport from "./GetAlarmReport";
import GetGpsReport from "./GetGpsReport";
import GetVehicleChangeReport from "./GetVehicleChangeReport";
import GetDriverChangeReport from "./GetDriverChangeReport";

const fakeList = [
  {
    _id: "5992786811dc0505f290f86b",
    alarms: [
      {
        date: "2021-11-06T07:10:22.000Z",
        type: "Out of Zone",
        desc: "vehicle location [35.1204183,50.3808883] is out of permissible zone",
      },
    ],
    driver: { name: "جعفر هنرمند", phoneNumber: "09127559751" },
  },
];

const GetReportPage = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState();
  const [showList, setShowList] = useState(false);
  //table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getReportGroups = useSelector(selectGetReportGroups);
  const getReportDrivers = useSelector(selectGetReportDrivers);
  const getReportVehiclesNumber = useSelector(selectGetReportVehiclesNumber);
  const fromDate = useSelector(selectGetReportFromDate);
  const toDate = useSelector(selectGetReportToDate);
  const getReportFromTime = useSelector(selectGetReportFromTime);
  const getReportToTime = useSelector(selectGetReportToTime);
  const getReportFromSpeed = useSelector(selectGetReportFromSpeed);
  const getReportToSpeed = useSelector(selectGetReportToSpeed);
  const groupValue = useSelector(selectGetReportGroupValue);
  const vehicleValue = useSelector(selectGetReportVehicleValue);
  const getReportVehiclesLocations = useSelector(
    selectGetReportVehiclesLocations
  );

  const getReportAlarms = useSelector(selectGetReportAlarms);
  const getReportGPSLocations = useSelector(selectGetReportGPSLocations);
  const getReportVehiclesChanges = useSelector(selectGetReportVehiclesChanges);
  const getReportDriversConditions = useSelector(
    selectGetReportDriversConditions
  );

  return (
    <div className="p-4">
      <div className="deviceHeader borderRadius-top p-3">
        <h1>گزارش‌گیری از وسایل نقلیه</h1>
        <p className="mt-3 font12 text-dark">
          در این قسمت می‌توانید از موقعیت دستگاه‌ها یا هشدارها گزارش دریافت
          کنید.
        </p>
      </div>
      <Row>
        <Col>
          <Reports />
        </Col>
      </Row>
      <div>{getReportAlarms && <GetAlarmReport />}</div>
      <div>{getReportVehiclesLocations && <GetVehicleLocationReport />}</div>
      <div>{getReportGPSLocations && <GetGpsReport />}</div>
      <div>{getReportVehiclesChanges && <GetVehicleChangeReport />}</div>
      <div>{getReportDriversConditions && <GetDriverChangeReport />}</div>
    </div>
  );
};

export default GetReportPage;
