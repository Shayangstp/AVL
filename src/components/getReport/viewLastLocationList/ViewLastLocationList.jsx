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
import ViewLastLocationTable from "./ViewLastLocationTable";
import moment from "moment-jalaali";
import VehicleList from "../vehicleList/VehicleList";
import {
  RsetShowVehicleList,
  selectShowVehicleList,
  selectGetReportGroupList,
} from "../../../slices/getReportSlices";
import { handleGroupList } from "../../../slices/getReportSlices";

const ViewLastLocationList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  const showVehicleList = useSelector(selectShowVehicleList);
  const groupList = useSelector(selectGetReportGroupList);

  useEffect(() => {
    dispatch(handleGroupList());
  }, []);

  const columns = useMemo(() => [
    {
      Header: "نام دسته",
      accessor: "groupName",
      sort: true,
    },
  ]);

  const handleVehicleList = useCallback(
    (request) => {
      return (
        <p className="d-flex align-items-center justify-content-between">
          <div className="font10">{request}</div>
          <Button
            variant="primary"
            size="sm"
            className="font10 ms-2"
            onClick={() => {
              dispatch(RsetShowVehicleList(!showVehicleList));
            }}
          >
            انتخاب وسیله نقلیه
          </Button>
        </p>
      );
    },
    [showVehicleList]
  );

  const fetchData = useCallback(
    ({ pageSize, pageIndex, requests }) => {
      var tableItems = [];
      if (requests.length !== 0) {
        for (var i = 0; i < requests.length; i++) {
          var tableItem = {
            idx: i + 1,
            groupName: handleVehicleList(requests[i].name),
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
    },
    [showVehicleList]
  );
  const handleSort = useCallback(
    ({ sortBy, pageIndex, pageSize, requests }) => {
      var tableItems = [];
      if (requests.length !== 0) {
        for (var i = 0; i < requests.length; i++) {
          var tableItem = {
            idx: i + 1,
            groupName: handleVehicleList(requests[i].name),
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
    [showVehicleList]
  );

  return (
    <Container fluid className="py-4">
      <Fragment>
        <section className="position-relative">
          <div className="mt-5">
            <div className="position-relative">
              {/* {loading ? <Loading /> : null} */}
              <Fragment>
                {/* {reqsList !== undefined ? ( */}
                <Fragment>
                  <ViewLastLocationTable
                    requests={groupList}
                    // requests={dataList}
                    columns={columns}
                    data={data}
                    onSort={handleSort}
                    fetchData={fetchData}
                    loading={load}
                    pageCount={pageCount}
                  />
                </Fragment>
              </Fragment>
            </div>
          </div>
        </section>
      </Fragment>
    </Container>
  );
};

export default ViewLastLocationList;
