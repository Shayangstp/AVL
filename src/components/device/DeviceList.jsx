//fake data been made
//the handle data been disabled
import {
  Input,
  Space,
  Table,
  Collapse,
  Form,
  Popconfirm,
  Select,
  ConfigProvider,
  Empty,
  Pagination,
} from "antd";
import faIR from "antd/lib/locale/fa_IR";
import { SearchOutlined } from "@ant-design/icons";
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCheck,
  faBan,
  faClockRotateLeft,
  faEye,
  faFilter,
  faPlus,
  faPen,
  faScrewdriverWrench,
  faLocation,
  faLocationDot,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import moment from "moment-jalaali";
import DeviceFilter from "./DeviceFilter";
import { getDeviceList } from "../../services/deviceServices";
import {
  selectDeviceList,
  RsetCurrentDevice,
  selectCurrentDevice,
  handleDeviceList,
} from "../../slices/deviceSlices";
import {
  RsetDeviceAdjusmentModal,
  RsetDeviceEditModal,
  selectDeviceEditModal,
  selectDeviceAdjusmentModal,
  RsetDeviceLocationsModal,
  selectDeviceLocationsModal,
} from "../../slices/modalSlices";
import { errorMessage } from "../../utils/msg";
import DeviceTable from "./DeviceTable";
import DeviceEditeModal from "./deviceModals/DeviceEditeModal";
import DeviceAdjustmentModal from "./deviceModals/DeviceAdjustmentModal";
import DeviceLocationsModal from "./deviceModals/DeviceLocationsModal";
import { NumericFormat } from "react-number-format";
import { selectUnitsOption } from "../../slices/mainSlices";
import Loading from "../common/Loading";
import { RsetLoading, selectLoading } from "../../slices/mainSlices";

const DeviceList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  //table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const deviceList = useSelector(selectDeviceList);
  const deviceEditModal = useSelector(selectDeviceEditModal);
  const currentDevice = useSelector(selectCurrentDevice);
  const deviceAdjusmentModal = useSelector(selectDeviceAdjusmentModal);
  const deviceLocationsModal = useSelector(selectDeviceLocationsModal);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(handleDeviceList());
  }, [currentDevice]);
  console.log(deviceList);

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
      key: "imei",
      title: "IMEI دستگاه",
      dataIndex: "deviceIMEI",
      sorter: (a, b) => {
        if (!a.deviceIMEI && !b.deviceIMEI) {
          return 0;
        }

        if (!a.deviceIMEI) {
          return 1;
        }

        if (!b.deviceIMEI) {
          return -1;
        }

        return a.deviceIMEI.localeCompare(b.deviceIMEI);
      },
      ...getColumnSearchProps("deviceIMEI", "جستجو..."),
      width: 200,
    },
    {
      key: "deviceNumber",
      title: () => (
        <span style={{ fontSize: "10px" }}>شماره تلفن سیم کارت</span>
      ),
      dataIndex: "simNumber",
      sorter: (a, b) => {
        if (!a.simNumber && !b.simNumber) {
          return 0;
        }

        if (!a.simNumber) {
          return 1;
        }

        if (!b.simNumber) {
          return -1;
        }

        return a.simNumber.localeCompare(b.simNumber);
      },
      ...getColumnSearchProps("simNumber", "جستجو..."),
      width: 2000,
    },
    {
      key: "driverName",
      title: () => <span style={{ fontSize: "12px" }}>نام راننده</span>,
      dataIndex: "driverName",
      sorter: (a, b) => {
        if (!a.driverName && !b.driverName) {
          return 0;
        }

        if (!a.driverName) {
          return 1;
        }

        if (!b.driverName) {
          return -1;
        }

        return a.driverName.localeCompare(b.driverName);
      },
      ...getColumnSearchProps("driverName", "جستجو..."),
      width: 900,
    },
    {
      key: "driverNumber",
      title: () => <span style={{ fontSize: "12px" }}>تلفن راننده</span>,
      dataIndex: "driverPhoneNumber",
      sorter: (a, b) => {
        if (!a.driverPhoneNumber && !b.driverPhoneNumber) {
          return 0;
        }

        if (!a.driverPhoneNumber) {
          return 1;
        }

        if (!b.driverPhoneNumber) {
          return -1;
        }

        return a.driverPhoneNumber.localeCompare(b.driverPhoneNumber);
      },
      ...getColumnSearchProps("driverPhoneNumber", "جستجو..."),
      width: 900,
    },
    {
      key: "vehicleNumber",
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
      width: 300,
    },
    {
      key: "group",
      title: "دسته",
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
      width: 300,
    },
    {
      key: "model",
      title: "مدل",
      dataIndex: "model",
      sorter: (a, b) => {
        if (!a.model && !b.model) {
          return 0;
        }

        if (!a.model) {
          return 1;
        }

        if (!b.model) {
          return -1;
        }

        return a.model?.name.localeCompare(b.model?.name);
      },
      render: (model) => model?.name,
      ...getColumnSearchProps("model", "جستجو..."),
      width: 300,
    },
    {
      key: "company",
      title: () => <span style={{ fontSize: "12px" }}>شرکت سازنده</span>,
      dataIndex: "company",
      sorter: (a, b) => {
        if (!a.company && !b.company) {
          return 0;
        }

        if (!a.company) {
          return 1;
        }

        if (!b.company) {
          return -1;
        }

        return a.company.localeCompare(b.company);
      },
      ...getColumnSearchProps("company", "جستجو..."),
      width: 1200,
    },
    {
      key: "usage",
      title: "کاربری",
      dataIndex: "usage",
      sorter: (a, b) => {
        if (!a.usage && !b.usage) {
          return 0;
        }

        if (!a.usage) {
          return 1;
        }

        if (!b.usage) {
          return -1;
        }

        return a.usage.localeCompare(b.usage);
      },
      ...getColumnSearchProps("usage", "جستجو..."),
      width: 300,
    },
    {
      key: "distance",
      title: () => (
        <span style={{ fontSize: "9px" }}>مسافت طی شده در ماه جاری</span>
      ),
      dataIndex: "maxPMDistance",
      sorter: (a, b) => {
        if (!a.maxPMDistance && !b.maxPMDistance) {
          return 0;
        }

        if (!a.maxPMDistance) {
          return 1;
        }

        if (!b.maxPMDistance) {
          return -1;
        }

        return a.maxPMDistance.localeCompare(b.maxPMDistance);
      },
      ...getColumnSearchProps("maxPMDistance", "جستجو..."),
      width: 2000,
    },
    {
      key: "gasUsage",
      title: () => (
        <span style={{ fontSize: "9px" }}>میزان تقریبی سوخت در ماه جاری</span>
      ),
      dataIndex: "gasUsage",
      sorter: (a, b) => {
        if (!a.gasUsage && !b.gasUsage) {
          return 0;
        }

        if (!a.gasUsage) {
          return 1;
        }

        if (!b.gasUsage) {
          return -1;
        }

        return a.gasUsage.localeCompare(b.gasUsage);
      },
      ...getColumnSearchProps("gasUsage", "جستجو..."),
      width: 2000,
    },
    {
      key: "conditions",
      title: "وضعیت",
      dataIndex: "conditions",
      sorter: (a, b) => {
        if (!a.conditions && !b.conditions) {
          return 0;
        }

        if (!a.conditions) {
          return 1;
        }

        if (!b.conditions) {
          return -1;
        }

        return a.conditions.localeCompare(b.conditions);
      },
      ...getColumnSearchProps("conditions", "Search conditions"),
      width: 300,
    },
    {
      key: "operation",
      title: "عملیات",
      dataIndex: "operation",
      render: (_, record) => <span>{operation(record)}</span>,
      width: 100,
    },
  ];

  const paginationConfig = {
    position: ["bottomCenter"],
    showTotal: (total) => (
      <span className="font12"> مجموع دستگاه ها : {total}</span>
    ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "middle",
  };

  const operation = (request) => {
    return (
      <div className="d-flex justify-content-center">
        <div>
          <Button
            title="ویرایش"
            className="d-flex align-items-center mb-2 mb-md-1 me-2 text-dark"
            size="sm"
            active
            onClick={() => {
              dispatch(RsetDeviceEditModal(true));
              dispatch(RsetCurrentDevice(request));
              console.log(request);
            }}
            style={{ backgroundColor: "#73c088", border: "none" }}
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </div>
        <div>
          <Button
            title="تنظیمات"
            className="btn btn-dark d-flex align-items-center mb-2 mb-md-1 me-2"
            size="sm"
            active
            onClick={() => {
              dispatch(RsetDeviceAdjusmentModal(true));
              dispatch(RsetCurrentDevice(request));
            }}
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} />
          </Button>
        </div>
        <div>
          <Button
            title="مشاهده مکان ها"
            className="btn btn-danger d-flex align-items-center  mb-2 mb-md-1"
            size="sm"
            active
            onClick={() => {
              dispatch(RsetDeviceLocationsModal(true));
              dispatch(RsetCurrentDevice(request));
            }}
          >
            <FontAwesomeIcon icon={faLocationDot} />
          </Button>
        </div>
      </div>
    );
  };

  // handle the condition should be ok

  // const handleVehicleCondition = (request, i) => {
  //   let now = moment();
  //   let date = moment(
  //     request.lastLocation === null ? "null" : moment(request.lastLocation.date)
  //   );

  //   let gpsDate = now.diff(date, "hours");
  //   if (gpsDate === NaN) {
  //     console.log("null");
  //   } else if (gpsDate !== NaN) {
  //     if (0 <= gpsDate && gpsDate <= 24) {
  //       return (
  //         <div className="bg-success text-center text-white rounded-pill px-1">
  //           {now.diff(date, "hours")}
  //         </div>
  //       );
  //     } else if (24 < gpsDate && gpsDate <= 168) {
  //       return (
  //         <div
  //           className="text-center text-black rounded-pill px-1 "
  //           style={{ background: "#fad757" }}
  //         >
  //           {now.diff(date, "hours")}
  //         </div>
  //       );
  //     } else if (168 < gpsDate && gpsDate <= 720) {
  //       return (
  //         <div
  //           className="text-center text-black rounded-pill px-1 "
  //           style={{ background: "#ffbc05" }}
  //         >
  //           {now.diff(date, "hours")}
  //         </div>
  //       );
  //     } else if (720 < gpsDate) {
  //       return (
  //         <div
  //           className="text-center text-black rounded-pill px-1 "
  //           style={{ background: "#ff0505" }}
  //         >
  //           {now.diff(date, "hours")}
  //         </div>
  //       );
  //     }
  //   }
  // };

  const getRowClassName = (record, index) => {
    const colors = ["gray", "white"]; // Define an array of colors
    const colorIndex = index % colors.length; // Calculate the index of the color

    return `custom-row custom-row-${colorIndex}`; // Apply the custom CSS class with the color index
  };

  return (
    <Container fluid className="py-3">
      <Fragment>
        <section className="mt-4">
          <div
            className="d-flex justify-content-start text-white py-3  borderRadius-top"
            style={{ background: "#485550" }}
          >
            <div className="ms-4 mt-1">
              <span className="me-2">
                <FontAwesomeIcon icon={faList} />
              </span>
              لیست دستگاه ها{" "}
            </div>
          </div>
          <div className="">
            {!loading ? (
              <Fragment>
                <div className="position-relative table-responsive">
                  <ConfigProvider locale={faIR}>
                    <Table
                      locale={{
                        emptyText: <Empty description="اطلاعات موجود نیست!" />,
                      }}
                      className="list"
                      bordered
                      dataSource={deviceList}
                      columns={columns}
                      rowClassName={getRowClassName}
                      pagination={paginationConfig}
                      scroll={{ x: "max-content" }}
                      size="middle"
                    />
                  </ConfigProvider>
                </div>
                <div>
                  <div className="d-flex ">
                    <h4 className="font12"> راهنمای رنگ وضعیت :</h4>
                    <div className="d-flex ms-3">
                      <div
                        className="border  cursorPointer bg-success"
                        title="ارسال آخرین اطلاعات برای امروز است"
                        style={{ width: "20px", height: "15px" }}
                      ></div>
                      <div
                        className="border  cursorPointer"
                        title="ارسال آخرین اطلاعات برای 1 تا 7 روز پیش است"
                        style={{
                          width: "20px",
                          height: "15px",
                          background: "yellow",
                        }}
                      ></div>
                      <div
                        className="border  cursorPointer"
                        title="ارسال آخرین اطلاعات برای 7 تا 30 روز پیش است"
                        style={{
                          width: "20px",
                          height: "15px",
                          background: "orange",
                        }}
                      ></div>
                      <div
                        className="border  cursorPointer"
                        title="ارسال آخرین اطلاعات برای  بیشتر از 30 روز پیش است"
                        style={{
                          width: "20px",
                          height: "15px",
                          background: "red",
                        }}
                      ></div>
                      <div
                        className="border  cursorPointer bg-secondary"
                        title=" اطلاعاتی ارسال نشده "
                        style={{
                          width: "20px",
                          height: "15px",
                        }}
                      ></div>
                      <div
                        className="border  cursorPointer bg-dark"
                        title="دستگاه تصادفی است"
                        style={{
                          width: "20px",
                          height: "15px",
                          background: "",
                        }}
                      ></div>
                      <div
                        className="border  cursorPointer"
                        title="دستگاه در تعمیرگاه است"
                        style={{
                          width: "20px",
                          height: "15px",
                          background: "purple",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                {deviceEditModal && <DeviceEditeModal />}
                {deviceAdjusmentModal && <DeviceAdjustmentModal />}
                {deviceLocationsModal && <DeviceLocationsModal />}
              </Fragment>
            ) : (
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "200px" }}
              >
                <Loading height={"60px"} width={"60px"} />
              </div>
            )}
          </div>
        </section>
      </Fragment>
    </Container>
  );
};

export default DeviceList;
