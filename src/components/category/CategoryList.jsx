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
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment-jalaali";
import { Redirect, Link } from "react-router-dom";
import DeviceFilter from "./DeviceFilter";

const CategoryList = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  useEffect(() => {
    setPageTitle("لیست درخواست نرم افزار");
  }, [setPageTitle]);

  const columns = useMemo(() => [
    {
      Header: "سریال درخواست",
      accessor: "reqSerial",
      sort: true,
    },
    {
      Header: "تاریخ ثبت درخواست",
      accessor: "reqDate",
      sort: true,
    },
    {
      Header: "درخواست کننده",
      accessor: "reqUser",
      sort: true,
    },
    {
      Header: "واحد درخواست کننده",
      accessor: "reqCompany",
      sort: true,
    },
    {
      Header: "وضعیت درخواست",
      accessor: "reqStatus",
      sort: true,
    },
    {
      Header: "عملیات",
      accessor: "reqOperation",
      sort: false,
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
        {/* {xssFilters.inHTMLData(request.serial)} */}
      </a>
    );
  };

  const userInfo = (request) => {
    return (
      <div
        className="text-dark cursorPointer"
        title="مشاهده اطلاعات کاربر "
        onClick={() => {
          // dispatch(handleUserInformation(request.userId));
          // dispatch(selectUserImage({ userId: request.userId, status: 1 }));
        }}
      >
        {/* {xssFilters.inHTMLData(request.fullName)} */}
      </div>
    );
  };
  const operation = (request) => {
    if (
      request.lastToPersons !== null &&
      request.lastToPersons
        .split(",")
        .some((person) => person === localStorage.getItem("id"))
    ) {
      return (
        <div className="d-flex justify-content-between flex-wrap">
          <Button
            title="تایید"
            className="btn btn-success d-flex align-items-center me-2 mb-2 mb-md-0"
            size="sm"
            active
            onClick={() => {
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
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button
            title="ابطال"
            className="btn btn-danger d-flex align-items-center me-2 mb-2 mb-md-0"
            size="sm"
            active
            onClick={() => {
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
            <FontAwesomeIcon icon={faBan} />
          </Button>
          <Button
            title="تاریخچه"
            className="btn btn-info d-flex align-items-center mb-2 mb-md-0"
            size="sm"
            active
            onClick={() => {
              dispatch();
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
            <FontAwesomeIcon icon={faClockRotateLeft} />
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

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          reqSerial: link(requests[i]),
          reqDate: moment
            .utc(requests[i].createdDate, "YYYY/MM/DD")
            .locale("fa")
            .format("jYYYY/jMM/jDD"),
          reqUser: userInfo(requests[i]),
          reqCompany: requests[i].deptName,
          reqStatus: requests[i].statusName,
          reqOperation: operation(requests[i]),
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
            reqSerial: link(requests[i]),
            reqDate: moment
              .utc(requests[i].createdDate, "YYYY/MM/DD")
              .locale("fa")
              .format("jYYYY/jMM/jDD"),
            reqUser: userInfo(requests[i]),
            reqCompany: requests[i].deptName,
            reqStatus: requests[i].statusName,
            reqOperation: operation(requests[i]),
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
    <Container fluid className="py-4">
      {/* {menuPermission ? */}
      <Fragment>
        {/* {showFilter ? <SoftwareReqFilter /> : null} */}
        <DeviceFilter />
        <section className="position-relative">
          <div
            // className="lightGray2-bg p-4 borderRadius border border-white border-2 shadow "
            className="mt-5"
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Link to="/SoftwareReqRegistration">
                  {/* <Button size="sm" variant="success" className="mb-2 font12">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    افزودن درخواست جدید
                  </Button> */}
                </Link>
                <Button
                  size="sm"
                  variant="warning"
                  className="mb-2 ms-2 font12"
                  onClick={() => {
                    // dispatch(RsetShowFilter(!showFilter));
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
                onClick={async () => {
                  // const handleFilterGroup = await dispatch(handleTabs());
                  // if (activeTab !== "") {
                  const filterValues = {
                    applicantId: localStorage.getItem("id"),
                    serial: "",
                    memberId: "",
                    mDep: "",
                    status: "",
                    fromDate: "null",
                    toDate: "null",
                    type: 6,
                    // group: handleFilterGroup.payload,
                  };
                  // dispatch(handleReqsList(filterValues));
                  // }
                }}
              >
                <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
                به روزرسانی
              </Button>
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
                  {/* <SoftwareReqItem
                    requests={reqsList}
                    // notVisited={notVisited}
                    columns={columns}
                    data={data}
                    onSort={handleSort}
                    fetchData={fetchData}
                    loading={load}
                    pageCount={pageCount}
                    // handleNotVisited={handleNotVisited}
                  /> */}
                  {/* {userInfoModal && <UserInfoModal />} */}
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

export default CategoryList;
