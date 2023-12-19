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
} from "../../slices/getReportSlices";
import { postAlarmsReport } from "../../services/getReportServices";

const GetAlarmReport = () => {
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

  const getReportAlarms = useSelector(selectGetReportAlarms);
  const getReportGPSLocations = useSelector(selectGetReportGPSLocations);
  const getReportVehiclesChanges = useSelector(selectGetReportVehiclesChanges);
  const getReportDriversConditions = useSelector(
    selectGetReportDriversConditions
  );
  const getAlarmsReport = useSelector(selectGetAlarmsReport);
  const getAlarmsReportList = useSelector(selectGetAlarmsReportList);

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

  const paginationConfig = {
    position: ["bottomCenter"],
    showTotal: (total) => (
      <span className="font12">مجموع وسیله ها: {total}</span>
    ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
  };

  const handleReport = async () => {
    console.log({
      getReportGroups,
      getReportDrivers,
      getReportVehiclesNumber,
      fromDate,
      toDate,
      getReportFromTime,
      getReportToTime,
      getReportFromSpeed,
      getReportToSpeed,
    });

    if (getReportAlarms) {
      const token = localStorage.getItem("token");
      const alarmsValues = {
        dateFilter: {
          start: fromDate ? fromDate : null,
          end: toDate ? toDate : null,
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
        deviceFilter: vehicleValue.map((item) => {
          return item.value;
        }),
      };
      console.log(alarmsValues);
      const postAlaramsReportRes = await postAlarmsReport(alarmsValues, token);
      console.log(postAlaramsReportRes);
      if (postAlaramsReportRes.data.code === "200") {
        dispatch(
          RsetGetAlarmsReport(
            postAlaramsReportRes.data.vehiclesAlarmData.map((item) => {
              return item.driver;
            })
          )
        );
        dispatch(
          RsetGetAlarmsReportList(
            postAlaramsReportRes.data.vehiclesAlarmData.map((item) => {
              return item.alarms;
            })
          )
        );
      }
    }
  };

  useEffect(() => {
    getAlarmsReportList && setList(...getAlarmsReportList);
  }, [getAlarmsReportList]);

  console.log(list);

  const handleGetAlarmsReport = (e) => {
    e.preventDefault();
    setShowList((prev) => !prev);
  };

  return (
    <div className="p-4">
      <div className="lightGray-bg borderRadius-15 border border-white border-2 shadow-sm p-4">
        <h1>گزارش‌گیری از وسایل نقلیه</h1>
        <p className="mt-3 font12 text-secondary">
          در این قسمت می‌توانید از موقعیت دستگاه‌ها یا هشدارها گزارش دریافت
          کنید.
        </p>
      </div>
      <Row className="mt-5">
        <Col md="3">
          <Reports />
        </Col>
        <Col md="3">
          <GetReportDevicesAndDrivers />
        </Col>
        <Col md="3">
          <GetReportDateForm />
        </Col>
        {!getReportGPSLocations &&
          !getReportVehiclesChanges &&
          !getReportDriversConditions && (
            <Col md="3">
              <GetReportTime />
            </Col>
          )}
        {!getReportAlarms &&
          !getReportGPSLocations &&
          !getReportVehiclesChanges &&
          !getReportDriversConditions && (
            <Col md="3" className="mt-2">
              <GetReportSpeed />
            </Col>
          )}

        <Col md="3" className="d-flex align-items-end">
          <Button onClick={handleReport}>جستوجو</Button>
        </Col>
      </Row>
      <Row>
        <ul className="mt-5">
          {getAlarmsReport && getAlarmsReport.length !== 0 ? (
            getAlarmsReport.map((item, idx) => (
              <li key={idx}>
                <Button onClick={handleGetAlarmsReport}>{item.name}</Button>
              </li>
            ))
          ) : (
            <p>
              {getAlarmsReport && getAlarmsReport.length === 0
                ? "موردی یافت نشد"
                : null}
            </p>
          )}
        </ul>
      </Row>
      <div>
        {list && showList && list.length !== 0 ? (
          <div className="position-relative table-responsive mt-4">
            {/* <DeviceTable
                  requests={deviceList}
                  columns={columns}
                  data={data}
                  onSort={handleSort}
                  fetchData={fetchData}
                  loading={load}
                  pageCount={pageCount}
                /> */}
            <ConfigProvider
              locale={faIR}
              // theme={{
              //   token: {
              //     colorPrimary: "#00b96b",
              //     colorBgContainer: "#f6ffed",
              //   },
              // }}
            >
              <Table
                locale={{
                  emptyText: <Empty description="اطلاعات موجود نیست!" />,
                }}
                className="list"
                bordered
                dataSource={list}
                columns={columns}
                pagination={paginationConfig}
                scroll={{ x: "max-content" }}
                size="middle"
              />
            </ConfigProvider>
          </div>
        ) : null}
      </div>
      {/* <Row
        className="mx-auto mt-5 lightGray-bg borderRadius-15 border border-white border-2 shadow p-3"
        style={{ height: "500px", width: "100%" }}
      >
        <MapHeat />
      </Row> */}
    </div>
  );
};

export default GetAlarmReport;
