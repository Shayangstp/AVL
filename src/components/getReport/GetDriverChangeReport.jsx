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
  handleResetFormData,
} from "../../slices/getReportSlices";
import MapHeat from "../map/MapHeat";
import { postDriversChanges } from "../../services/getReportServices";
import {
  convertUnixTimeStampToDate,
  convertUnixTimeStampToDateZz,
} from "../common/ConvertUnixStamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { selectLoading, RsetLoading } from "../../slices/mainSlices";
import Loading from "../common/Loading";
import { RsetFormErrors, selectFormErrors } from "../../slices/mainSlices";

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
  const [showPdf, setShowPdf] = useState(false);

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
  const formErrors = useSelector(selectFormErrors);
  const loading = useSelector(selectLoading);

  const getReport = useSelector(selectGetReportList);
  const showReportList = useSelector(selectShowReportList);

  const groupValueIsValid = groupValue.length !== 0;
  const vehicleValueIsValid = vehicleValue.length !== 0;
  const formIsValid = groupValueIsValid && vehicleValueIsValid;

  const validation = () => {
    let errors = {};
    if (!groupValueIsValid) {
      errors.groupValue = "انتخاب گروه الزامی است!";
    }
    if (!vehicleValueIsValid) {
      errors.vehicleValue = "انتخاب راننده الزامی است!";
    }
    return errors;
  };

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
      dataIndex: ["driver", "name"],
      sorter: (a, b) => {
        if (!a.driver?.name && !b.driver?.name) {
          return 0;
        }

        if (!a.driver?.name) {
          return 1;
        }

        if (!b.driver?.name) {
          return -1;
        }

        return a.driver.name.localeCompare(b.driver.name);
      },
      ...getColumnSearchProps("driver.name", "جستجو..."),
      width: 500,
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
        key: "actionType",
        title: "نوع رویداد",
        dataIndex: "actionType",
        sorter: (a, b) => {
          if (!a.actionType && !b.actionType) {
            return 0;
          }

          if (!a.actionType) {
            return 1;
          }

          if (!b.actionType) {
            return -1;
          }

          return a.actionType.localeCompare(b.actionType);
        },
        ...getColumnSearchProps("actionType", "جستجو..."),
        width: 200,
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
        width: 200,
      },
      {
        key: "fieldName",
        title: "فیلد تغییریافته",
        dataIndex: "fieldName",
        sorter: (a, b) => {
          if (!a.fieldName && !b.fieldName) {
            return 0;
          }

          if (!a.fieldName) {
            return 1;
          }

          if (!b.fieldName) {
            return -1;
          }

          return a.fieldName.localeCompare(b.fieldName);
        },
        ...getColumnSearchProps("fieldName", "جستجو..."),
        width: 200,
        editable: true,
      },
      {
        key: "oldValue",
        title: "مقدار قبلی",
        dataIndex: "oldValue",
        sorter: (a, b) => {
          if (!a.oldValue && !b.oldValue) {
            return 0;
          }

          if (!a.oldValue) {
            return 1;
          }

          if (!b.oldValue) {
            return -1;
          }

          return a.oldValue.localeCompare(b.oldValue);
        },
        ...getColumnSearchProps("oldValue", "جستجو..."),
        width: 200,
        editable: true,
      },
      {
        key: "newValue",
        title: "مقدار جدید",
        dataIndex: "newValue",
        sorter: (a, b) => {
          if (!a.newValue && !b.newValue) {
            return 0;
          }

          if (!a.newValue) {
            return 1;
          }

          if (!b.newValue) {
            return -1;
          }

          return a.newValue.localeCompare(b.newValue);
        },
        ...getColumnSearchProps("newValue", "جستجو..."),
        width: 200,
        editable: true,
      },
      {
        key: "user",
        title: "توسط",
        dataIndex: ["user", "username"],
        sorter: (a, b) => {
          if (!a.user.username && !b.user.username) {
            return 0;
          }

          if (!a.user.username) {
            return 1;
          }

          if (!b.user.username) {
            return -1;
          }

          return a.user.username.localeCompare(b.user.username);
        },
        ...getColumnSearchProps("user.username", "جستجو..."),
        width: 200,
        editable: true,
      },
    ];

    const expandedData = record.changes.map((device) => ({
      ...device,
      key: device.key,
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
    if (formIsValid) {
      const token = localStorage.getItem("token");
      const driversChangesValues = {
        dateFilter: {
          start: fromDate ? convertUnixTimeStampToDateZz(fromDate) : null,
          end: toDate ? convertUnixTimeStampToDateZz(toDate) : null,
        },
        timeFilter: {
          start: getReportFromTime ? getReportFromTime : null,
          end: getReportToTime ? getReportToTime : null,
        },
        speedFilter: {
          min: null,
          max: null,
        },
        groupFilter: [groupValue.value],
        deviceFilter: vehicleValue?.map((item) => {
          return item.value;
        }),
      };
      console.log(driversChangesValues);
      const postDriversChangesRes = await postDriversChanges(
        driversChangesValues,
        token
      );
      console.log(postDriversChangesRes);
      if (postDriversChangesRes.status === 200) {
        dispatch(
          RsetGetReportList(postDriversChangesRes.data.vehiclesChangesData)
        );
        dispatch(RsetShowReportList(true));
        setShowPdf(true);
        dispatch(RsetLoading(false));
        // dispatch(RsetGetReportList(fakeList));
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            groupValue,
            vehicleValue,
          })
        )
      );
      dispatch(RsetLoading(false));
    }
  };

  const handlePDf = async () => {
    const token = localStorage.getItem("token");
    const values = {
      reportData: getReport,
    };
    console.log("hi");
    // const postAlarmsReportPdfRes = await postAlarmsReportPdf(values, token);
    // console.log(postAlarmsReportPdfRes);
    console.log("h2i");
  };

  return (
    <div className="">
      <Row className="mt-2 d-flex justify-content-center">
        <Col md="3">
          <GetReportDevicesAndDrivers />
        </Col>
        <Col md="3">
          <GetReportDateForm />
        </Col>
      </Row>
      {!groupValueIsValid && (
        <p className="mt-3 font12 text-danger">{formErrors.groupValue}</p>
      )}
      {!vehicleValueIsValid && (
        <p className="mt-2 font12 text-danger">{formErrors.vehicleValue}</p>
      )}
      <div className="mt-4 mb-4">
        <hr />
      </div>
      <Row>
        <Col
          md="12"
          className="d-flex justify-content-end align-items-end gap-2"
        >
          <Button
            size="sm"
            variant="dark"
            className="px-4 py-2"
            onClick={() => {
              dispatch(RsetLoading(true));
              handleReport();
            }}
          >
            {!loading ? "جستجو" : <Loading height={"20px"} width={"20px"} />}
          </Button>
          <Button
            size="sm"
            variant="danger"
            className="px-4 py-2"
            onClick={() => {
              dispatch(handleResetFormData());
              dispatch(RsetGetReportList([]));
              dispatch(RsetShowReportList(false));
              setShowPdf(false);
            }}
          >
            انصراف
          </Button>
          {showPdf && getReport.length !== 0 && (
            <Button
              size="sm"
              className="text-dark border-2 border-dark  py-1"
              onClick={handlePDf}
              style={{ background: "#f6bd60" }}
            >
              <FontAwesomeIcon icon={faFilePdf} />
              <span> دانلود PDF</span>
            </Button>
          )}
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
