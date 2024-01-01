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
  selectGetReportVehiclesLocations,
  selectShowReportList,
  RsetShowReportList,
} from "../../slices/getReportSlices";
import MapHeat from "../map/MapHeat";
import { postVehicleLocation } from "../../services/getReportServices";
import {
  convertUnixTimeStampToDate,
  convertUnixTimeStampToDateZz,
} from "../common/ConvertUnixStamp";

const fakeList = [
  {
    _id: "5992786811dc0505f290f86b",
    locations: [
      {
        date: "2021-11-06T07:10:22.000Z",
        address: "Markazi Province, Qeshlāq-e-chalablu, Unnamed Road, Iran",
        latitude: 34.984145,
        longitude: 50.302895,
        speed: "8 KM/h",
      },
    ],
    driver: { name: "جعفر هنرمند", phoneNumber: "09127559751" },
  },
];

const GetVehicleLocationReport = () => {
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

  const getReportVehiclesLocations = useSelector(
    selectGetReportVehiclesLocations
  );

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

  const itemColumns = [
    {
      key: "idx",
      title: "ردیف",
      dataIndex: "",
      render: (text, record, index) => index + 1,
      titleStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
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
      key: "type",
      title: "نوع هشدار",
      dataIndex: "type",
      sorter: (a, b) => {
        if (!a.type && !b.type) {
          return 0;
        }

        if (!a.type) {
          return 1;
        }

        if (!b.type) {
          return -1;
        }

        return a.type.localeCompare(b.type);
      },
      ...getColumnSearchProps("type", "جستجو..."),
      width: 200,
    },
    {
      key: "desc",
      title: "توضیحات",
      dataIndex: "desc",
      sorter: (a, b) => {
        if (!a.desc && !b.desc) {
          return 0;
        }

        if (!a.desc) {
          return 1;
        }

        if (!b.desc) {
          return -1;
        }

        return a.desc.localeCompare(b.desc);
      },
      ...getColumnSearchProps("desc", "جستجو..."),
      width: 200,
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
        width: 200,
      },
      {
        key: "latitude",
        title: "موقعیت جغرافیای",
        dataIndex: "latitude",
        sorter: (a, b) => {
          if (!a.latitude && !b.latitude) {
            return 0;
          }

          if (!a.latitude) {
            return 1;
          }

          if (!b.latitude) {
            return -1;
          }

          return a.latitude.localeCompare(b.latitude);
        },
        ...getColumnSearchProps("latitude", "جستجو..."),
        width: 200,
        render: (text, record) => {
          const latitude = record.latitude;
          const longitude = record.longitude;
          return latitude && longitude ? `${latitude}, ${longitude}` : "";
        },
      },
      {
        key: "speed",
        title: "توضیحات",
        dataIndex: "speed",
        sorter: (a, b) => {
          if (!a.desc && !b.desc) {
            return 0;
          }

          if (!a.desc) {
            return 1;
          }

          if (!b.desc) {
            return -1;
          }

          return a.desc.localeCompare(b.desc);
        },
        ...getColumnSearchProps("desc", "جستجو..."),
        width: 200,
        editable: true,
      },
      {
        key: "address",
        title: "آدرس",
        dataIndex: "address",
        sorter: (a, b) => {
          if (!a.address && !b.address) {
            return 0;
          }

          if (!a.address) {
            return 1;
          }

          if (!b.address) {
            return -1;
          }

          return a.address.localeCompare(b.address);
        },
        ...getColumnSearchProps("address", "جستجو..."),
        width: 200,
        editable: true,
      },
    ];

    const expandedData = record.locations.map((device) => ({
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
    if (getReportVehiclesLocations) {
      const token = localStorage.getItem("token");
      const alarmsValues = {
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
      console.log(alarmsValues);
      const postVehicleLocationRes = await postVehicleLocation(
        alarmsValues,
        token
      );
      console.log(postVehicleLocationRes);
      if (postVehicleLocationRes.status === 200) {
        dispatch(RsetGetReportList(postVehicleLocationRes.data));
      }
      dispatch(RsetShowReportList(true));
      // dispatch(RsetGetReportList(fakeList));

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
        <Col md="3">
          <GetReportTime />
        </Col>
        <Col md="3">
          <GetReportSpeed />
        </Col>
        <Col md="3" className="d-flex align-items-end mt-2">
          <Button size="sm" onClick={handleReport}>
            جستجو
          </Button>
        </Col>
      </Row>
      <div className="">
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

export default GetVehicleLocationReport;
