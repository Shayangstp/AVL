//fake data been made
//the handle data been disabled

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

const DeviceList = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  useEffect(() => {
    setPageTitle("لیست دستگاه ها");
  }, [setPageTitle]);

  const deviceList = useSelector(selectDeviceList);
  const deviceEditModal = useSelector(selectDeviceEditModal);
  const currentDevice = useSelector(selectCurrentDevice);
  const deviceAdjusmentModal = useSelector(selectDeviceAdjusmentModal);
  const deviceLocationsModal = useSelector(selectDeviceLocationsModal);

  useEffect(() => {
    dispatch(handleDeviceList());
  }, [currentDevice]);

  const columns = useMemo(() => [
    {
      Header: "ردیف",
      accessor: "idx",
      sort: true,
    },
    {
      Header: "IMEI دستگاه",
      accessor: "imei",
      sort: true,
    },
    {
      Header: "شماره تلفن سیم کارت",
      accessor: "deviceNumber",
      sort: true,
    },
    {
      Header: "نام راننده",
      accessor: "driverName",
      sort: true,
    },
    {
      Header: "تلفن راننده",
      accessor: "driverNumber",
      sort: true,
    },
    {
      Header: "پلاک",
      accessor: "vehicleNumber",
      sort: true,
    },
    {
      Header: "دسته",
      accessor: "vehicleCategory",
      sort: false,
    },
    {
      Header: "مدل",
      accessor: "vehicleType",
      sort: false,
    },
    {
      Header: "شرکت سازنده",
      accessor: "vehicleCompany",
      sort: false,
    },
    {
      Header: "کاربری",
      accessor: "vehicleUsage",
      sort: false,
    },
    {
      Header: "مسافت طی شده در ماه جاری",
      accessor: "distance",
      sort: false,
    },
    {
      Header: "میزان تقریبی سوخت در ماه جاری",
      accessor: "gasUsage",
      sort: false,
    },
    {
      Header: "عملیات",
      accessor: "opration",
      sort: false,
    },
  ]);

  const operation = (request) => {
    return (
      <div className="d-flex justify-content-center">
        <div>
          <Button
            title="ویرایش"
            className="btn btn-success d-flex align-items-center mb-2 mb-md-1 me-2"
            size="sm"
            active
            onClick={() => {
              dispatch(RsetDeviceEditModal(true));
              dispatch(RsetCurrentDevice(request));
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </div>
        <div>
          <Button
            title="تنظیمات"
            className="btn btn-danger d-flex align-items-center mb-2 mb-md-1 me-2"
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
            className="btn btn-info d-flex align-items-center  mb-2 mb-md-1"
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

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          idx: i,
          imei: requests[i].deviceIMEI,
          deviceNumber: requests[i].simNumber,
          driverName: requests[i].driverName,
          driverNumber: requests[i].driverPhoneNumber,
          vehicleNumber: requests[i].plate,
          // vehicleType: requests[i].model.name,
          // vehicleCategory: requests[i].model.name,
          // vehicleType: requests[i].model.name,
          // vehicleCompany: requests[i].model.name,
          vehicleUsage: requests[i].usage,
          gasUsage: requests[i].fuel,
          distance: requests[i].maxPMDistance,
          opration: operation(requests[i]),
        };
        tableItems.push(tableItem);
      }
    }
    const fetchId = ++fetchIdRef.current;
    setload(true);
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex;
      const endRow = startRow + pageSize;
      setData(tableItems.slice(startRow, endRow));
      setPageCount(Math.ceil(tableItems.length / pageSize));
      setload(false);
    }
  }, []);
  const handleSort = useCallback(
    ({ sortBy, pageIndex, pageSize, requests }) => {
      var tableItems = [];
      if (requests.length !== 0) {
        for (var i = 0; i < requests.length; i++) {
          var tableItem = {
            imei: requests[i].deviceIMEI,
            idx: i,
            deviceNumber: requests[i].simNumber,
            driverName: requests[i].driverName,
            driverNumber: requests[i].driverPhoneNumber,
            vehicleNumber: requests[i].plate,
            // vehicleCategory: requests[i].model.name,
            // vehicleType: requests[i].model.name,
            // vehicleCompany: requests[i].model.name,
            vehicleUsage: requests[i].usage,
            gasUsage: requests[i].fuel,
            distance: requests[i].maxPMDistance,

            opration: operation(requests[i]),
          };
          tableItems.push(tableItem);
        }
      }
      const sortId = ++sortIdRef.current;
      setload(true);
      if (sortId === sortIdRef.current) {
        let sorted = tableItems.slice();
        sorted.sort((a, b) => {
          for (let i = 0; i < sortBy.length; ++i) {
            if (a[sortBy[i].id] > b[sortBy[i].id])
              return sortBy[i].desc ? -1 : 1;
            if (a[sortBy[i].id] < b[sortBy[i].id])
              return sortBy[i].desc ? 1 : -1;
          }
          return 0;
        });
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(sorted.slice(startRow, endRow));
        setload(false);
      }
    },
    []
  );

  return (
    <Container fluid className="py-3">
      {/* {menuPermission ? */}
      <Fragment>
        {showFilter ? <DeviceFilter /> : null}
        <section className="position-relative">
          <div className="lightGray-bg p-4 borderRadius-15 border border-white border-2 shadow mt-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Button
                  size="sm"
                  variant="warning"
                  className="mb-2 ms-2 font12"
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                >
                  <FontAwesomeIcon icon={faFilter} className="me-2" />
                  فیلتر
                </Button>
              </div>
              <Button
                size="sm"
                variant="primary"
                className="mb-2 font12"
                onClick={async () => {}}
              >
                <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
                به روزرسانی
              </Button>
            </div>
            <div className="position-relative">
              <Fragment>
                <Fragment>
                  <DeviceTable
                    requests={deviceList}
                    columns={columns}
                    data={data}
                    onSort={handleSort}
                    fetchData={fetchData}
                    loading={load}
                    pageCount={pageCount}
                  />
                  {deviceEditModal && <DeviceEditeModal />}
                  {deviceAdjusmentModal && <DeviceAdjustmentModal />}
                  {deviceLocationsModal && <DeviceLocationsModal />}
                </Fragment>
              </Fragment>
            </div>
          </div>
        </section>
      </Fragment>
    </Container>
  );
};

export default DeviceList;
