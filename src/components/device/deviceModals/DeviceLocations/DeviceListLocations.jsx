//fake data been make

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
  selectCurrentDevice,
} from "../../../../slices/deviceSlices";
import DeviceTableLocations from "./DeviceTableLocations";

const DeviceListLocations = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  //handleCheckboxPlay
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);

  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);
  const deviceLocList = useSelector(selectDeviceLocList);
  const deviceCordinate = useSelector(selectDeviceCordinate);
  const currentDevice = useSelector(selectCurrentDevice);
  useEffect(() => {
    if (deviceLocList.length === 0) dispatch(handleDeviceLocList());
  }, [deviceLocList]);

  //fake data

  const dataList = [
    {
      date: "date",
      hour: "hour",
      address: "address",
      speed: "speed",
      lat: 35.7219,
      lng: 51.3347,
    },
    {
      date: "date",
      hour: "hour",
      address: "address",
      speed: "speed",
      lat: 35.7219,
      lng: 51.3347,
    },

    {
      date: "date",
      hour: "hour",
      address: "address",
      speed: "speed",
      lat: 51,
      lng: 32,
    },
    {
      date: "date",
      hour: "hour",
      address: "address",
      speed: "speed",
      lat: 51,
      lng: 32,
    },
  ];

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

  //the location showed from api
  const handleCordinates = (request) => {
    console.log(request.lng);
    const cordinateArr = [];
    cordinateArr.push(request.lat);
    cordinateArr.push(request.lng);

    dispatch(RsetDeviceCordinate(cordinateArr));
  };

  const handleCheckboxChange = (i) => {
    setCurrentIndex(i);
  };


  const handleCheckBox = (request, i) => {
    return (
      <Form.Check
        key={i}
        type="checkbox"
        id={request[i] && request[i]._id}
        value={request[i] && request[i].deviceName}
        checked={i === currentIndex}
        onChange={() => {
          handleCheckboxChange(i);
          console.log(i, currentIndex);

        }}
        className="me-3"
      />
    );
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    setCurrentIndex(currentIndex);
  };

  useEffect(() => {
    if (isPlaying) {
      const timeoutId = setTimeout(() => {
        if (currentIndex < checkboxes - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, isPlaying]);

  const getCheckBoxData = (index) => {
    if (index >= 0 && index < checkboxes.length) {
      // const label = checkboxes[index].label;
      setCurrentIndex(index);
      // console.log(label);
    }
  };

  useEffect(() => {
    getCheckBoxData(currentIndex);
  }, [currentIndex]);

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    setCheckboxes(requests.length);
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          idx: i + 1,
          checkBox: handleCheckBox(requests[i], i),
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
            checkBox: handleCheckBox(requests, i),
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
                  <Form.Group>
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (currentIndex !== 0) {
                          setCurrentIndex((prev) => prev - 1);
                        } else {
                          setCurrentIndex(checkboxes.length - 1);
                        }
                      }}
                    >
                      backward
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handlePlayClick}
                      disabled={isPlaying}
                    >
                      Play
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentIndex(0);
                      }}
                    >
                      Pause
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (currentIndex <= checkboxes.length - 2) {
                          setCurrentIndex((prev) => prev + 1);
                        } else {
                          setCurrentIndex(0);
                        }
                      }}
                    >
                      forward
                    </Button>
                  </Form.Group>
                  {/* this should be fix  */}
                  {/* {deviceLocList.length !== 0 ? ( */}
                  {dataList.length !== 0 ? (
                    <DeviceTableLocations
                      requests={deviceLocList}
                      // requests={dataList}
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
