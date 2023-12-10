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
import VehicleTable from "./VehicleTable";
import moment from "moment-jalaali";
import {
  selectShowVehicleList,
  selectGetReportVehicleList,
  RsetGetReportSelectedItems,
  selectGetReportSelectedItems,
} from "../../../slices/getReportSlices";

const VehicleList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const showVehicleList = useSelector(selectShowVehicleList);
  const vehicleList = useSelector(selectGetReportVehicleList);

  const columns = useMemo(() => [
    {
      Header: "انتخاب",
      accessor: "checkBox",
      sort: true,
    },
    {
      Header: "نام راننده",
      accessor: "driverName",
      sort: true,
    },
    {
      Header: "پلاک",
      accessor: "vehicleNumber",
      sort: true,
    },
  ]);

  const handleCheckBox = (i, request) => {
    const handleCheck = (e) => {
      if (e.target.checked) {
        setSelectedItems((prevItems) => [...prevItems, request.deviceIMEI]);
      } else {
        setSelectedItems((prevItems) =>
          prevItems.filter((item) => item !== request)
        );
      }
    };
    return (
      <Form className="d-flex justify-content-center">
        <Form.Check key={i} type="checkbox" id={i} onChange={handleCheck} />
      </Form>
    );
  };

  useEffect(() => {
    dispatch(RsetGetReportSelectedItems(selectedItems));
  }, [selectedItems]);

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        // console.log(requests[i]);
        var tableItem = {
          idx: i + 1,
          driverName: requests[i].driverName,
          vehicleNumber: requests[i].plate,
          checkBox: handleCheckBox(i, requests[i]),
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
            driverName: requests[i].driverName,
            vehicleNumber: requests[i].plate,
            checkBox: handleCheckBox(i, requests[i]),
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
      <Fragment>
        <section className="position-relative">
          <div className="mt-5">
            <div className="position-relative">
              {/* {loading ? <Loading /> : null} */}
              <Fragment>
                {/* {reqsList !== undefined ? ( */}
                <Fragment>
                  <VehicleTable
                    requests={vehicleList}
                    columns={columns}
                    data={data}
                    onSort={handleSort}
                    fetchData={fetchData}
                    loading={load}
                    pageCount={pageCount}
                  />
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

export default VehicleList;
