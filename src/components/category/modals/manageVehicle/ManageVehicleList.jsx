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
import {
  RsetCategoryCurrentRequest,
  selectCategoryCurrentRequest,
  selectCategoryManageVehicleList,
} from "../../../../slices/categorySlices";
import { deleteVehicleManage } from "../../../../services/categoryServices";

import ManageVehicleTable from "./ManageVehicleTable";
import { errorMessage, successMessage } from "../../../../utils/msg";
import { RsetCurrnetCategoryReport } from "../../../../slices/getReportSlices";
import { RsetCategoryManageVehicleModal } from "../../../../slices/modalSlices";

// const dataList = [
//   {
//     deviceImei: "Imei",
//     driverName: "shayan",
//     driverNumber: "09353835262",
//     vehicleNumber: "12121212",
//     deviceNumber: "0000",
//     vehicleType: "کامیون",
//     vehicleCompany: "faw",
//   },
//   {
//     deviceImei: "Imei",
//     driverName: "shayan",
//     driverNumber: "09353835262",
//     vehicleNumber: "12121212",
//     deviceNumber: "0000",
//     vehicleType: "کامیون",
//     vehicleCompany: "faw",
//   },
//   {
//     deviceImei: "Imei",
//     driverName: "shayan",
//     driverNumber: "09353835262",
//     vehicleNumber: "12121212",
//     deviceNumber: "0000",
//     vehicleType: "کامیون",
//     vehicleCompany: "faw",
//   },
// ];

const ManageVehicleList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  const categoryManageVehicleList = useSelector(
    selectCategoryManageVehicleList
  );

  const categoryCurrentRequest = useSelector(selectCategoryCurrentRequest);
  console.log(categoryCurrentRequest._id);
  const dataList = categoryCurrentRequest.devices;

  const columns = useMemo(() => [
    {
      Header: "IMEI دستگاه",
      accessor: "deviceImei",
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
      Header: "شماره تلفن سیم کارت",
      accessor: "deviceNumber",
      sort: true,
    },
    {
      Header: "مدل",
      accessor: "vehicleType",
      sort: true,
    },
    {
      Header: "شرکت سازنده",
      accessor: "vehicleCompany",
      sort: true,
    },
    {
      Header: "عملیات",
      accessor: "operations",
      sort: true,
    },
  ]);

  const operation = (vehicleId, groupId) => {
    return (
      <div className="d-flex justify-content-center flex-wrap">
        <Button
          title="حذف"
          className="btn btn-danger d-flex align-items-center me-2 mb-2 mb-md-0"
          size="sm"
          active
          onClick={async () => {
            //handle delete here
            const token = localStorage.getItem("token");
            const deleteVehicleManageRes = await deleteVehicleManage(
              vehicleId,
              groupId,
              token
            );
            console.log(deleteVehicleManageRes);
            if (deleteVehicleManageRes.data.code === 200) {
              dispatch(RsetCategoryManageVehicleModal(false));
              successMessage("حذف با موفقیت انجام شد !");
              dispatch(RsetCategoryCurrentRequest(""));
            } else {
              errorMessage("خطا");
            }
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
        // const devices = requests.flatMap((obj) =>
        //   obj.devices.map((item) => item)
        // );
        var tableItem = {
          deviceImei: requests[i]?.deviceIMEI,
          driverName: requests[i]?.driverName,
          driverNumber: requests[i]?.driverPhoneNumber,
          vehicleNumber: requests[i]?.plate,
          deviceNumber: requests[i]?.simNumber,
          vehicleType: requests[i]?.model.name,
          vehicleCompany: requests[i]?.model.name,
          operations: operation(requests[i]?._id, categoryCurrentRequest._id),
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
          // const devices = requests.flatMap((obj) =>
          //   obj.devices.map((item) => item)
          // );
          var tableItem = {
            deviceImei: requests[i]?.deviceIMEI,
            driverName: requests[i]?.driverName,
            driverNumber: requests[i]?.driverPhoneNumber,
            vehicleNumber: requests[i]?.plate,
            deviceNumber: requests[i]?.simNumber,
            vehicleType: requests[i]?.model.name,
            vehicleCompany: requests[i]?.model.name,
            operations: operation(requests[i]?._id, categoryCurrentRequest._id),
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
                  <ManageVehicleTable
                    // requests={categoryList}
                    requests={dataList}
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

export default ManageVehicleList;
