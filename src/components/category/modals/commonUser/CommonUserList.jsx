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
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CommonUserTable from "./CommonUserTable";
import Select from "react-select";
import {
  RsetVehicleType,
  selectVehicleType,
  selectVehicleTypeOptions,
} from "../../../../slices/deviceSlices";
import {
  RsetFormErrors,
  selectFormErrors,
} from "../../../../slices/mainSlices";

const dataList = [
  {
    userName: "shayan",
    firstName: "shayan",
    lastName: "goli",
    vehicleType: "",
  },
  {
    userName: "shayan",
    firstName: "shayan",
    lastName: "goli",
    vehicleType: "",
  },

  {
    userName: "shayan",
    firstName: "shayan",
    lastName: "goli",
    vehicleType: "",
  },
  {
    userName: "shayan",
    firstName: "shayan",
    lastName: "goli",
    vehicleType: "",
  },
];

const CommonUserList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);
  const vehicleType = useSelector(selectVehicleType);
  const vehicleTypeOptions = useSelector(selectVehicleTypeOptions);
  const formErrors = useSelector(selectFormErrors);

  const vehicleTypeIsValid = vehicleType.length !== 0;

  const validation = () => {
    let errors = {};
    if (!vehicleTypeIsValid) {
      errors.vehicleType = "مدل وسیله نقلیه را انتخاب کنید";
    }
    return errors;
  };

  const columns = useMemo(() => [
    {
      Header: "شماره",
      accessor: "idx",
      sort: true,
    },
    {
      Header: "نام کاربری",
      accessor: "userName",
      sort: true,
    },
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
      Header: "مدل وسیله نقلیه",
      accessor: "addVehicle",
      sort: true,
    },
    {
      Header: "عملیات",
      accessor: "oprations",
      sort: true,
    },
  ]);

  const handleAddVehicle = (request) => {
    return (
      <Form className="d-flex">
        <Form.Group as={Col} md="8" className="text-dark cursorPointer">
          <Select
            value={vehicleType}
            name="vehicleType"
            onChange={(e) => {
              dispatch(RsetVehicleType(e));
            }}
            placeholder="انتخاب..."
            options={vehicleTypeOptions}
            isSearchable={true}
          />
        </Form.Group>
        <Form.Group as={Col} md="2" className="ms-2">
          <Button
            variant="primary"
            className="font10 mt-1"
            onClick={(e) => {
              e.preventDefault();
              if (vehicleTypeIsValid) {
                console.log(vehicleType);
              } else {
                dispatch(
                  RsetFormErrors(
                    validation({
                      vehicleType,
                    })
                  )
                );
              }
            }}
          >
            افزودن
          </Button>
        </Form.Group>
      </Form>
    );
  };
  const operation = (request) => {
    return (
      <div className="d-flex justify-content-center flex-wrap">
        <Button
          title="حذف"
          className="btn btn-danger d-flex align-items-center me-2 mb-2 mb-md-0 mt-2"
          size="sm"
          active
          onClick={() => {
            //handle delete here
            console.log(request);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    );
  };

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          idx: i + 1,
          userName: requests[i].userName,
          firstName: requests[i].firstName,
          lastName: requests[i].lastName,
          addVehicle: handleAddVehicle(requests[i]),
          oprations: operation(requests[i]),
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
            userName: requests[i].userName,
            firstName: requests[i].firstName,
            lastName: requests[i].lastName,
            addVehicle: handleAddVehicle(requests[i]),
            oprations: operation(requests[i]),
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
          <div className="mt-1">
            <div className="position-relative">
              <Fragment>
                {/* {reqsList !== undefined ? ( */}
                <Fragment>
                  <CommonUserTable
                    // requests={categoryList}
                    requests={dataList}
                    // notVisited={notVisited}
                    columns={columns}
                    data={data}
                    onSort={handleSort}
                    fetchData={fetchData}
                    loading={load}
                    pageCount={pageCount}
                    // handleNotVisited={handleNotVisited}
                  />
                  {!vehicleType && (
                    <p className="text-danger mt-2">{formErrors.vehicleType}</p>
                  )}
                </Fragment>
              </Fragment>
            </div>
          </div>
        </section>
      </Fragment>
    </Container>
  );
};

export default CommonUserList;
