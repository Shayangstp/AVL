import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Tabs, Tab, Form } from "react-bootstrap";
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
import {
  RsetDeviceCordinate,
  handleDeviceLocList,
  selectDeviceLocList,
  selectDeviceCordinate,
} from "../../../../slices/deviceSlices";

import DeviceTableLocations from "./DeviceTableLocations";

const DeviceListLocations = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);
  const deviceLocList = useSelector(selectDeviceLocList);
  const deviceCordinate = useSelector(selectDeviceCordinate);
  useEffect(() => {
    if (deviceLocList.length === 0) dispatch(handleDeviceLocList());
  }, [deviceLocList]);

  // useEffect(() => {
  //   setPageTitle("لیست درخواست نرم افزار");
  // }, [setPageTitle]);

  const columns = useMemo(() => [
    {
      Header: "ردیف",
      accessor: "idx",
      sort: true,
    },
    {
      Header: "#",
      accessor: "checkBox",
      sort: true,
    },
    {
      Header: "تاریخ",
      accessor: "date",
      sort: true,
    },
    {
      Header: "ساعت",
      accessor: "hour",
      sort: true,
    },
    {
      Header: "آدرس",
      accessor: "address",
      sort: true,
    },
    {
      Header: "سرعت",
      accessor: "speed",
      sort: true,
    },
  ]);

  const link = (request) => {
    return (
      <a
        className="text-dark text-decoration-none cursorPointer serialHover"
        title={"مشاهده درخواست " + request.serial}
        onClick={() => {
          // dispatch(
          //   handleCurrentReqInfo({
          //     company: "",
          //     reqId: request.requestId,
          //     reqType: request.typeId,
          //     reqSeen: request.seen,
          //     oprationType: "view",
          //     dep: "",
          //   })
          // );
          // setSeenSerial(request.serial);
        }}
      >
        {request.deviceIMEI}
      </a>
    );
  };

  const handleCordinates = (request) => {
    console.log(request.lng);
    const cordinateArr = [];
    cordinateArr.push(request.lat);
    cordinateArr.push(request.lng);

    dispatch(RsetDeviceCordinate(cordinateArr));
  };

  const handleCheckBox = (request) => {
    return (
      <Form.Check
        type="radio"
        id="cordinate"
        name="cordinate"
        onClick={() => handleCordinates(request)}
      />
    );
  };

  const operation = (request) => {
    if (localStorage.getItem("token")) {
      return (
        <div className="d-flex justify-content-between flex-wrap">
          <Button
            title="ویرایش"
            className="btn btn-success d-flex align-items-center me-2 mb-2 mb-md-0"
            size="sm"
            active
            onClick={() => {
              console.log(request);
              // dispatch(
              //   handleCurrentReqInfo({
              //     company: "",
              //     reqId: request.requestId,
              //     reqType: request.typeId,
              //     reqSeen: request.seen,
              //     oprationType: "accept",
              //     dep: "",
              //   })
              // );
              // setSeenSerial(serialNumber);
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
          <Button
            title="تنظیمات"
            className="btn btn-danger d-flex align-items-center me-2 mb-2 mb-md-0"
            size="sm"
            active
            onClick={() => {
              console.log("hi");
              // dispatch(
              //   handleCurrentReqInfo({
              //     company: "",
              //     reqId: request.requestId,
              //     reqType: request.typeId,
              //     reqSeen: request.seen,
              //     oprationType: "cancel",
              //     dep: "",
              //   })
              // );
              // setSeenSerial(serialNumber);
            }}
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} />
          </Button>
          <Button
            title="مشاهده مکان ها"
            className="btn btn-info d-flex align-items-center mb-2 mb-md-0"
            size="sm"
            active
            onClick={() => {
              // handleCurrentReqInfo({
              //   company: "",
              //   reqId: request.requestId,
              //   reqType: request.typeId,
              //   reqSeen: request.seen,
              //   oprationType: "history",
              //   dep: "",
              // })
              // handleGetCurrentReqComments(
              //   actionCode.reqInfo.serial_number,
              //   actionCode.type
              // );
            }}
          >
            <FontAwesomeIcon icon={faLocationDot} />
          </Button>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-between flex-wrap">
          <Button
            title="مشاهده"
            className="btn btn-warning d-flex me-2 align-items-center mb-2 mb-md-0"
            size="sm"
            active
            onClick={() => {
              // dispatch(
              //   handleCurrentReqInfo({
              //     company: "",
              //     reqId: request.requestId,
              //     reqType: request.typeId,
              //     reqSeen: request.seen,
              //     oprationType: "view",
              //     dep: "",
              //   })
              // );
              // setSeenSerial(serialNumber);
              // dispatch(RsetViewReqModal(true));
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            title="تاریخچه"
            className="btn btn-info d-flex align-items-center mb-2 mb-md-0"
            size="sm"
            active
            onClick={() => {
              // dispatch(
              //   handleCurrentReqInfo({
              //     company: "",
              //     reqId: request.requestId,
              //     reqType: request.typeId,
              //     reqSeen: request.seen,
              //     oprationType: "history",
              //     dep: "",
              //   })
              // );
              // handleGetCurrentReqComments(
              //   actionCode.reqInfo.serial_number,
              //   actionCode.type
              // );
              // dispatch(RsetReqHistoryModal(true));
            }}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} />
          </Button>
        </div>
      );
    }
  };

  const handleCheckBoxAuto = () => {

  }

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          idx: i + 1,
          checkBox: true
            ? handleCheckBox(requests[i])
            : handleCheckBoxAuto(requests[i]),
          date: moment
            .utc(requests[i].date, "YYYY/MM/DD")
            .locale("fa")
            .format("jYYYY/jMM/jDD"),
          hour: moment
            .utc(requests[i].date, "jYYYY-jMM-jDDTHH:mm:ss.SSZ")
            .format("YYYY-MM-DD HH:mm:ss z"),
          address: requests[i].address,
          speed: requests[i].speed,
          // opration: operation(requests[i]),
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
            idx: i + 1,
            checkBox: true
              ? handleCheckBox(requests[i])
              : handleCheckBoxAuto(requests[i]),
            date: moment
              .utc(requests[i].date, "YYYY/MM/DD")
              .locale("fa")
              .format("jYYYY/jMM/jDD"),
            hour: moment.utc(requests[i].date, "HH:mm:ss").format("HH:mm:ss"),
            address: requests[i].address,
            speed: requests[i].speed,
            // opration: operation(requests[i]),
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
    <Container fluid className="">
      {/* {menuPermission ? */}
      <Fragment>
        {/* {showFilter ? <SoftwareReqFilter /> : null} */}
        <section className="position-relative">
          <div
            // className="lightGray2-bg p-4 borderRadius border border-white border-2 shadow "
            className=""
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Link to="/SoftwareReqRegistration">
                  {/* <Button size="sm" variant="success" className="mb-2 font12">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    افزودن درخواست جدید
                  </Button> */}
                </Link>
              </div>
            </div>
            <div className="position-relative">
              {/* {loading ? <Loading /> : null} */}
              <Fragment>
                {/* {reqsList !== undefined ? ( */}
                <Fragment>
                  {/* <Tabs
                    defaultActiveKey={"myReqs"}
                    onSelect={(e) => {
                      dispatch(RsetActiveTab(e));
                    }}
                    className="mt-3"
                  >
                    <Tab eventKey={"myReqs"} title="درخواست های من"></Tab>
                    <Tab
                      eventKey={"inProcessReqs"}
                      title="درخواست های در حال پردازش"
                    ></Tab>
                    <Tab eventKey={"allReqs"} title="کلیه درخواست ها"></Tab>
                  </Tabs> */}
                  {deviceLocList.length !== 0 ? (
                    <DeviceTableLocations
                      requests={deviceLocList}
                      // notVisited={notVisited}
                      columns={columns}
                      data={data}
                      onSort={handleSort}
                      fetchData={fetchData}
                      loading={load}
                      pageCount={pageCount}
                      // handleNotVisited={handleNotVisited}
                    />
                  ) : null}
                </Fragment>
                {/* ) : null} */}
              </Fragment>
            </div>
          </div>
        </section>
        {/* : 
        <Redirect to="/" />
      } */}
      </Fragment>
    </Container>
  );
};

export default DeviceListLocations;
