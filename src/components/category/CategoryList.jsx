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
  faBan,
  faClockRotateLeft,
  faFilter,
  faPen,
  faPlus,
  faCar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import {
  handleCategoryList,
  selectCategorylist,
  RsetCategoryCurrentRequest,
} from "../../slices/categorySlices";
import CategoryTable from "./CategoryTable";
import {
  RsetCategoryEditModal,
  selectCategoryEditModal,
  RsetCategoryAddVehicleModal,
  selectCategoryAddVehicleModal,
  RsetCategoryCommonUserModal,
  selectCategoryCommonUserModal,
  RsetCategoryManageVehicleModal,
  selectCategoryManageVehicleModal,
  RsetCategoryAddModal,
  selectCategoryAddModal,
} from "../../slices/modalSlices";
import CategoryEditModal from "./modals/CategoryEditModal";
import CategoryAddVehicleModal from "./modals/CategoryAddVehicleModal";
import CategoryCommonUserModal from "./modals/CategoryCommonUserModal";
import CategoryManageVehicleModal from "./modals/CategoryManageVehicleModal";
import CategoryAddModal from "./modals/CategoryAddModal";

const dataList = [
  {
    groupName: "کاوه سلیس",
    description: "ساوه",
    vehicleNumber: "129",
    color: {
      label: "زرد",
      value: "#f5e642",
    },
  },
  {
    groupName: "کاوه سودا",
    description: "مراغه",
    vehicleNumber: "105",
    color: {
      label: "قرمز",
      value: "#ff0f0f",
    },
  },

  {
    groupName: "فلوت کاویان",
    description: "مشهد",
    vehicleNumber: "34",
    color: {
      label: "آبی روشن",
      value: "#38deff",
    },
  },
  {
    groupName: "متانول کاوه",
    description: "دیر",
    vehicleNumber: "5",
    color: {
      label: "آبی روشن",
      value: "#1d4ff2",
    },
  },
];

const CategoryList = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  const categoryList = useSelector(selectCategorylist);
  const categoryEditModal = useSelector(selectCategoryEditModal);
  const categoryAddVehicleModal = useSelector(selectCategoryAddVehicleModal);
  const categoryCommonUsermodal = useSelector(selectCategoryCommonUserModal);
  const categoryManageVehicleModal = useSelector(
    selectCategoryManageVehicleModal
  );
  const categoryAddModal = useSelector(selectCategoryAddModal);

  useEffect(() => {
    dispatch(handleCategoryList());
  }, []);

  useEffect(() => {
    setPageTitle("لیست درخواست نرم افزار");
  }, [setPageTitle]);

  const columns = useMemo(() => [
    {
      Header: "شماره",
      accessor: "idx",
      sort: true,
    },
    {
      Header: "نام گروه",
      accessor: "groupName",
      sort: true,
    },
    {
      Header: "توضیحات",
      accessor: "description",
      sort: true,
    },
    {
      Header: "تعداد وسیله نقلیه",
      accessor: "vehicleNumber",
      sort: true,
    },
    {
      Header: "عملیات",
      accessor: "oprations",
      sort: true,
    },
  ]);

  const operation = (request) => {
    // if (localStorage.getItem("token")) {
    return (
      <div className="d-flex justify-content-between flex-wrap">
        <Button
          title="ویرایش"
          className="btn btn-primary d-flex align-items-center me-2 mb-2 mb-md-0"
          size="sm"
          active
          onClick={() => {
            dispatch(RsetCategoryEditModal(true));
            dispatch(RsetCategoryCurrentRequest(request));
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button
          title="افزودن وسیله نقلیه"
          className="btn btn-success d-flex align-items-center me-2 mb-2 mb-md-0"
          size="sm"
          active
          onClick={() => {
            dispatch(RsetCategoryAddVehicleModal(true));
            dispatch(RsetCategoryCurrentRequest(request));
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button
          title="مدیریت وسیله نقلیه"
          className="btn btn-danger d-flex align-items-center mb-2 mb-md-0"
          size="sm"
          active
          onClick={() => {
            dispatch(RsetCategoryManageVehicleModal(true));
          }}
        >
          <FontAwesomeIcon icon={faCar} />
        </Button>
        <Button
          title="کاربر های مشابه"
          className="btn btn-info d-flex align-items-center mb-2 mb-md-0"
          size="sm"
          active
          onClick={() => {
            dispatch(RsetCategoryCommonUserModal(true));
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </Button>
      </div>
    );
    // } else {
    // }
  };

  const handleBackgroundColor = (i, color) => {
    return (
      <div className="d-flex justify-content-center rounded-circle">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            background: `${color && color}`,
            width: "30px",
            height: "30px",
          }}
        >
          {i + 1}
        </div>
      </div>
    );
  };

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          idx: handleBackgroundColor(i, requests[i].color),
          groupName: requests[i].name,
          description: requests[i].desc,
          vehicleNumber: requests[i].devices.length,
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
      let colors = requests.map((request) => {
        return request.color.value;
      });
      if (requests.length !== 0) {
        for (var i = 0; i < requests.length; i++) {
          var tableItem = {
            idx: handleBackgroundColor(i, requests[i].color),
            groupName: requests[i].name,
            description: requests[i].desc,
            vehicleNumber: requests[i].devices.length,
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
      {/* {menuPermission ? */}
      <Fragment>
        {/* {showFilter ? <SoftwareReqFilter /> : null} */}
        <section className="position-relative">
          <div
            // className="lightGray2-bg p-4 borderRadius border border-white border-2 shadow "
            className="mt-5"
          >
            <div className="d-flex align-items-center justify-content-between">
              <Button
                size="sm"
                variant="success"
                className="mb-2 px-4"
                onClick={() => {
                  dispatch(RsetCategoryAddModal(true));
                }}
              >
                + افزودن
              </Button>
            </div>
            <div className="position-relative">
              {/* {loading ? <Loading /> : null} */}
              <Fragment>
                {/* {reqsList !== undefined ? ( */}
                <Fragment>
                  <CategoryTable
                    requests={categoryList}
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
        {categoryEditModal && <CategoryEditModal />}
        {categoryAddVehicleModal && <CategoryAddVehicleModal />}
        {categoryCommonUsermodal && <CategoryCommonUserModal />}
        {categoryManageVehicleModal && <CategoryManageVehicleModal />}
        {categoryAddModal && <CategoryAddModal />}
      </Fragment>
    </Container>
  );
};

export default CategoryList;
