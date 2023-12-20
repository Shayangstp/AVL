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
  RsetGetReportList,
  selectGetReportList,
  selectGetReportGroupValue,
  selectGetReportVehicleValue,
  RsetShowReportList,
  selectShowReportList,
} from "../../slices/getReportSlices";
import MapHeat from "../map/MapHeat";
import { postAlarmsReport } from "../../services/getReportServices";

const fakeList = [
  {
    _id: "جعفر هنرمند",
    vehicles: [
      {
        plate: "14122",
        date: "2022-11-13T05:46:49.532Z",
        type: "KAMIOON",
        group: "کاوه سیلیس",
      },
      {
        plate: "18658",
        date: "2023-07-05T06:00:45.828Z",
        type: "KAMIOON",
        group: "کاوه سیلیس",
      },
    ],
    currentVehicle: {
      _id: "5992786811dc0505f290f86b",
      simNumber: "09363023698",
      deviceIMEI: "357454074845130",
      status: true,
      createDate: "Tue Aug 15 2017 04:28:24 GMT+0000 (UTC)",
      creator: "5774e37f0939adcc010d4e73",
      vehicleName: "Scania G400",
      plate: "93812",
      type: "KAMIOON",
      driverName: "جعفر هنرمند",
      driverPhoneNumber: "09127559751",
      GPSSettings: {
        sos: "09128995907",
        interval: "10",
        APN: "mtnirancell",
      },
      regionAlarm: {
        sendEmail: true,
        sendSMS: true,
        _id: "5e26e81d91cfca572aa5f55c",
      },
      pmAlarm: {
        sendEmail: true,
        sendSMS: true,
        _id: "5e26e7c391cfca572aa5f4a9",
      },
      speedAlarm: {
        sendSMS: true,
        sendEmail: true,
        _id: "633d2a984882e73b5291f5d4",
        rcvSMSNumbers: "09138786510",
        smsReceivers: [],
      },
      trackerModel: "FMXXXX",
      pmCheckPoints: [],
      maxPMDistance: "50000",
      maxSpeed: "100",
      gpsData: [],
      __v: 24088,
      gpsDataCount: 170421,
      lastLocation: "6582be2151915f62f5abc18c",
      zoneStatus: "IN",
      vehicleStatus: "657bd65ab0145d4c63697160",
      currentMonthDistance: 8101.33,
      model: "64d090e418c0a53063969b96",
      fuel: 41,
      usage: "کمپرسی",
      groups: "کاوه سیلیس",
    },
  },
];

const GetAlarmReport = () => {
  const dispatch = useDispatch();
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

  const getReportAlarms = useSelector(selectGetReportAlarms);
  const getReportGPSLocations = useSelector(selectGetReportGPSLocations);
  const getReportVehiclesChanges = useSelector(selectGetReportVehiclesChanges);
  const getReportDriversConditions = useSelector(
    selectGetReportDriversConditions
  );
  const getReport = useSelector(selectGetReportList);
  const showReportList = useSelector(selectShowReportList);

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space className="d-flex justify-content-between">
          <Button
            variant="primary"
            className="font10"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="sm"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            variant="success "
            className="font10"
            size="sm"
            onClick={() => {
              clearFilters();
              setSearchText("");
              handleSearch(selectedKeys, confirm, "");
              close();
            }}
            style={{ width: 80 }}
          >
            حذف فیلتر
          </Button>
          <Button
            className="font10"
            variant="secondary"
            size="sm"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      const columnValue = record[dataIndex] ? record[dataIndex].toString() : "";
      return columnValue.toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          const input = document.querySelector(
            ".ant-table-filter-dropdown input"
          );
          if (input) {
            input.focus();
          }
        }, 0);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ fontWeight: "bold" }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const columns = [
    {
      key: "idx",
      title: "ردیف",
      dataIndex: "",
      render: (text, record, index) => index + 1,
      titleStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      width: 10,
    },
    {
      key: "name",
      title: "نام راننده",
      dataIndex: "_id",
      sorter: (a, b) => {
        if (!a._id && !b._id) {
          return 0;
        }

        if (!a._id) {
          return 1;
        }

        if (!b._id) {
          return -1;
        }

        return a._id.localeCompare(b._id);
      },
      ...getColumnSearchProps("_id", "جستجو..."),
      width: 100,
    },
    {
      key: "currentVehicle",
      title: "زمان",
      render: () => "درحال حاظر",
      width: 100,
    },
    {
      key: "plate",
      title: "پلاک",
      dataIndex: ["currentVehicle", "plate"],
      sorter: (a, b) => {
        if (!a.currentVehicle.plate && !b.currentVehicle.plate) {
          return 0;
        }

        if (!a.currentVehicle.plate) {
          return 1;
        }

        if (!b.currentVehicle.plate) {
          return -1;
        }

        return a.currentVehicle.plate.localeCompare(b.currentVehicle.plate);
      },
      ...getColumnSearchProps("currentVehicle.plate", "جستجو..."),
      width: 100,
    },
    {
      key: "groups",
      title: "گروه",
      dataIndex: ["currentVehicle", "groups"],
      sorter: (a, b) => {
        if (!a.currentVehicle.groups && !b.currentVehicle.groups) {
          return 0;
        }

        if (!a.currentVehicle.groups) {
          return 1;
        }

        if (!b.currentVehicle.groups) {
          return -1;
        }

        return a.currentVehicle.groups.localeCompare(b.currentVehicle.groups);
      },
      ...getColumnSearchProps("currentVehicle.groups", "جستجو..."),
      width: 100,
    },
  ];

  const expandedRowRender = (record) => {
    const expandedColumns = [
      {
        key: "idx",
        title: "ردیف",
        dataIndex: "",
        render: (text, record, index) => index + 1,
        titleStyle: {
          fontSize: "10px",
          fontWeight: "bold",
        },
        width: 10,
      },
      {
        key: "date",
        title: "تاریخ",
        dataIndex: "date",
        sorter: (a, b) => {
          if (!a.date && !b.date) {
            return 0;
          }

          if (!a.date) {
            return 1;
          }

          if (!b.date) {
            return -1;
          }

          return a.date.localeCompare(b.date);
        },
        ...getColumnSearchProps("date", "جستجو..."),
        width: 100,
      },
      {
        key: "plate",
        title: "پلاک",
        dataIndex: "plate",
        sorter: (a, b) => {
          if (!a.plate && !b.plate) {
            return 0;
          }

          if (!a.plate) {
            return 1;
          }

          if (!b.plate) {
            return -1;
          }

          return a.plate.localeCompare(b.plate);
        },
        ...getColumnSearchProps("plate", "جستجو..."),
        width: 100,
      },
      {
        key: "group",
        title: "گروه",
        dataIndex: "group",
        sorter: (a, b) => {
          if (!a.group && !b.group) {
            return 0;
          }

          if (!a.group) {
            return 1;
          }

          if (!b.group) {
            return -1;
          }

          return a.group.localeCompare(b.group);
        },
        ...getColumnSearchProps("group", "جستجو..."),
        width: 200,
        editable: true,
      },
    ];

    const expandedData = record.vehicles.map((vehicles) => ({
      ...vehicles,
      key: vehicles.key,
    }));

    return (
      <div className="mt-4">
        <Table
          className="itemList"
          columns={expandedColumns}
          dataSource={expandedData}
          pagination={paginationConfigItemList}
          scroll={{ x: "max-content" }}
          size="small"
        />
      </div>
    );
  };

  const paginationConfigList = {
    position: ["bottomCenter"],
    showTotal: (total) => (
      <span className="font12">مجموع راننده ها : {total}</span>
    ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
  };
  const paginationConfigItemList = {
    position: ["bottomCenter"],
    showTotal: (total) => (
      <span className="font12">مجموعه هشدار ها: {total}</span>
    ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
  };

  const handleReport = async () => {
    if (getReportDriversConditions) {
      const token = localStorage.getItem("token");
      // const alarmsValues = {
      //   dateFilter: {
      //     start: fromDate ? fromDate : null,
      //     end: toDate ? toDate : null,
      //   },
      //   timeFilter: {
      //     start: getReportFromTime ? getReportFromTime : null,
      //     end: getReportToTime ? getReportToTime : null,
      //   },
      //   speedFilter: {
      //     min: null,
      //     max: null,
      //   },
      //   groupFilter: [groupValue.value],
      //   deviceFilter: vehicleValue?.map((item) => {
      //     return item.value;
      //   }),
      // };
      // console.log(alarmsValues);
      // const postAlaramsReportRes = await postAlarmsReport(alarmsValues, token);
      // console.log(postAlaramsReportRes);
      // if (postAlaramsReportRes.data.code === "200") {
      // dispatch(
      //   RsetGetReport(postAlaramsReportRes.data.vehiclesAlarmData)
      // );
      dispatch(RsetShowReportList(true));
      dispatch(RsetGetReportList(fakeList));

      // }
    }
  };

  return (
    <div className="">
      <Row className="mt-2">
        <Col md="3">
          <GetReportDevicesAndDrivers />
        </Col>
        <Col md="3">
          <GetReportDateForm />
        </Col>
        <Col md="3" className="d-flex align-items-end">
          <Button size="sm" onClick={handleReport}>
            جستوجو
          </Button>
        </Col>
      </Row>
      <div>
        {showReportList && (
          <div className="position-relative table-responsive mt-4">
            <ConfigProvider locale={faIR}>
              <Table
                locale={{
                  emptyText: <Empty description="اطلاعات موجود نیست!" />,
                }}
                className="list"
                bordered
                dataSource={getReport}
                columns={columns}
                pagination={paginationConfigList}
                scroll={{ x: "max-content" }}
                size="middle"
                expandable={{ expandedRowRender }}
              />
            </ConfigProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAlarmReport;
