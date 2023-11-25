import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import { Container, Row, Col, Button, Tabs, Tab, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  faArrowsRotate,
  faCheck,
  faBan,
  faClockRotateLeft,
  faEye,
  faFilter,
  faStamp,
  faPen,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import PhoneNumberTable from "./PhoneNumberTable";
import {
  RsetFilterValue,
  selectFilterValue,
  RsetShowFilter,
  selectShowFilter,
} from "../../slices/filterSlices";

//fill this with api
const dataList = [
  {
    firstName: "shayan",
    lastName: "goli",
    phoneNumber: "09121234567",
    email: "g.shayan5529@gmail.com",
  },
  {
    firstName: "shayan1",
    lastName: "goli1",
    phoneNumber: "09121234567",
    email: "g.shayan5529@gmail.com1",
  },
  {
    firstName: "shayan2",
    lastName: "goli2",
    phoneNumber: "09121234567",
    email: "g.shayan5529@gmail.com2",
  },
];

const PhoneNumberList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  const filterValue = useSelector(selectFilterValue);
  const showFilter = useSelector(selectShowFilter);

  //filter data
  const handleFilterChange = (event) => {
    dispatch(RsetFilterValue(event.target.value));
  };

  const filteredData = filterValue
    ? dataList.filter((item) => {
        return (
          item.firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.lastName.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.phoneNumber.includes(filterValue) ||
          item.email.toLowerCase().includes(filterValue.toLowerCase())
        );
      })
    : dataList;

  const columns = useMemo(() => [
    {
      Header: "نام",
      accessor: "firstName",
      sort: true,
    },
    {
      Header: "نام خانوادگی",
      accessor: "lastName",
      sort: true,
    },
    {
      Header: "شماره تلفن",
      accessor: "phoneNumber",
      sort: true,
    },
    {
      Header: "پست الکترونیکی",
      accessor: "email",
      sort: true,
    },
  ]);

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];

    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          firstName: requests[i].firstName,
          lastName: requests[i].lastName,
          phoneNumber: requests[i].phoneNumber,
          email: requests[i].email,
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
            firstName: requests[i].firstName,
            lastName: requests[i].lastName,
            phoneNumber: requests[i].phoneNumber,
            email: requests[i].email,
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
          <div className="mt-3">
            {showFilter && (
              <Form.Group as={Col} md="5">
                <Form.Control
                  type="text"
                  value={filterValue}
                  onChange={handleFilterChange}
                  placeholder="جستوجو..."
                  className="font12 mb-3"
                />
              </Form.Group>
            )}
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Button
                size="sm"
                variant="warning"
                className="mb-2 ms-2 font12 mt-1"
                onClick={() => {
                  dispatch(RsetShowFilter(!showFilter));
                }}
              >
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                فیلتر
              </Button>

              <Button
                size="sm"
                variant="primary"
                className="mb-2 font12"
                onClick={() => {
                  dispatch(RsetFilterValue(""));
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
                  <PhoneNumberTable
                    // requests={userLists}
                    requests={filteredData}
                    // notVisited={notVisited}
                    columns={columns}
                    data={data}
                    onSort={handleSort}
                    fetchData={fetchData}
                    loading={load}
                    pageCount={pageCount}
                    // handleNotVisited={handleNotVisited}
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

export default PhoneNumberList;
