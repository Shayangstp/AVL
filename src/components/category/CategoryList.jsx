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
} from "../../slices/modalSlices";
import CategoryEditModal from "./modals/CategoryEditModal";
import CategoryAddVehicleModal from "./modals/CategoryAddVehicleModal";
import CategoryCommonUserModal from "./modals/CategoryCommonUserModal";
import CategoryManageVehicleModal from "./modals/CategoryManageVehicleModal";

const dataList = [
  {
    groupName: "کاوه سلیس",
    description: "ساوه",
    vehicleNumber: "129",
    color: "زرد",
  },
  {
    groupName: "کاوه سودا",
    description: "مراغه",
    vehicleNumber: "105",
    color: "قرمز",
  },

  {
    groupName: "فلوت کاویان",
    description: "مشهد",
    vehicleNumber: "34",
    color: "آبی روشن",
  },
  {
    groupName: "متانول کاوه",
    description: "دیر",
    vehicleNumber: "5",
    color: "آبی تیره",
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
    // if (localStorage.getItem("token")) {
    return (
      <div className="d-flex justify-content-between flex-wrap">
        <Button
          title="ویرایش"
          className="btn btn-primary d-flex align-items-center me-2 mb-2 mb-md-0"
          size="sm"
          active
          onClick={() => {
            console.log("hi");
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

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];
    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        var tableItem = {
          idx: i + 1,
          groupName: requests[i].groupName,
          description: requests[i].description,
          vehicleNumber: requests[i].vehicleNumber,
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
            groupName: requests[i].groupName,
            description: requests[i].description,
            vehicleNumber: requests[i].vehicleNumber,
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
                onClick={() => {
                  // const handleFilterGroup = await dispatch(handleTabs());
                  // if (activeTab !== "") {
                  // const filterValues = {
                  //   applicantId: localStorage.getItem("id"),
                  //   serial: "",
                  //   memberId: "",
                  //   mDep: "",
                  //   status: "",
                  //   fromDate: "null",
                  //   toDate: "null",
                  //   type: 6,
                  //   // group: handleFilterGroup.payload,
                  // };
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
                  <CategoryTable
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
      </Fragment>
    </Container>
  );
};

export default CategoryList;
