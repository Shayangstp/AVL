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
  faClockRotateLeft,
  faEye,
  faFilter,
  faStamp,
  faPen,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import {
  RsetCurrentUser,
  handleUserLists,
  selectUserLists,
  selectCurrentUser,
  RsetUserLists,
} from "../../slices/userManagmentSlices";
import {
  RsetUserManagmentEditModal,
  selectUserManagmentEditModal,
  RsetUserManagmentChangePasswordModal,
  selectUserManagmentChangePasswordModal,
  RsetUserManagmentRoleModal,
  selectUserManagmentRoleModal,
} from "../../slices/modalSlices";
import UserManagmentEditModal from "./modals/UserManagmentEditModal";
import UserManagmentChangePasswordModal from "./modals/UserManagmentChangePasswordModal";
import UserManagmentRoleModal from "./modals/UserManagmentRoleModal";

import UserTable from "./UserTable";
import { getUserLocked, getUserUnLocked } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { successMessage } from "../../utils/msg";

const UserList = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkboxes, setCheckboxes] = useState([]);
  const [data, setData] = useState([]);
  const [load, setload] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const sortIdRef = useRef(0);

  const userLists = useSelector(selectUserLists);
  const userManagmentEditModal = useSelector(selectUserManagmentEditModal);
  const userManagmentChangePasswordModal = useSelector(
    selectUserManagmentChangePasswordModal
  );
  const userManagmentRoleModal = useSelector(selectUserManagmentRoleModal);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    setPageTitle("لیست کاربران");
  }, [setPageTitle]);

  useEffect(() => {
    dispatch(handleUserLists());
  }, [currentUser]);

  console.log(currentUser);
  const columns = useMemo(() => [
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
      Header: "موبایل",
      accessor: "phoneNumber",
      sort: true,
    },
    {
      Header: "ایمیل",
      accessor: "email",
      sort: true,
    },
    {
      Header: "جنسیت",
      accessor: "gender",
      sort: false,
    },
    {
      Header: "رول ها",
      accessor: "roles",
      sort: false,
    },
    {
      Header: "فعال/غیرفعال",
      accessor: "activeDeActive",
      sort: false,
    },
    {
      Header: " عملیات ها",
      accessor: "oprations",
      sort: false,
    },
  ]);

  //handle active or deactive
  const activeDeactive = (request, requests) => {
    const token = localStorage.getItem("token");
    return (
      <Form.Check
        type="switch"
        checked={request.islockedout}
        onChange={async (e) => {
          const reqs = [...requests];
          const index = reqs.findIndex((item) => item._id === request._id);
          const item = { ...reqs[index] };
          item.islockedout = e.target.checked;
          let allReqs = [...reqs];
          allReqs[index] = item;
          dispatch(RsetUserLists(allReqs));
          if (e.target.checked === true) {
            const getUserLockedRes = await getUserLocked(request._id, token);
            if (getUserLockedRes.status === 200) {
              successMessage("کاربر با موفقیت غیر فعال شد");
            }
          } else {
            const getUserUnLockedRes = await getUserUnLocked(
              request._id,
              token
            );
            if (getUserUnLockedRes.status === 200) {
              successMessage("کاربر با موفقیت فعال شد");
            }
          }
        }}
      />
    );
  };

  const operation = (request) => {
    return (
      <div className="d-flex justify-content-center">
        <div>
          <Button
            title="رول ها"
            className="btn btn-secondary d-flex align-items-center mb-2 mb-md-0 me-2"
            size="sm"
            active
            onClick={() => {
              dispatch(RsetUserManagmentRoleModal(true));
              dispatch(RsetCurrentUser(request));
            }}
          >
            <FontAwesomeIcon icon={faStamp} />
          </Button>
        </div>
        <div>
          <Button
            title="ویرایش"
            className="btn btn-warning d-flex align-items-center mb-2 mb-md-0 me-2"
            size="sm"
            active
            onClick={() => {
              dispatch(RsetUserManagmentEditModal(true));
              dispatch(RsetCurrentUser(request));
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </div>
        <div>
          <Button
            title="تغییر رمزعبور"
            className="btn btn-info d-flex align-items-center mb-2 mb-md-0"
            size="sm"
            active
            onClick={() => {
              dispatch(RsetUserManagmentChangePasswordModal(true));
              dispatch(RsetCurrentUser(request));
            }}
          >
            <FontAwesomeIcon icon={faLock} />
          </Button>
        </div>
      </div>
    );
  };

  const fetchData = useCallback(({ pageSize, pageIndex, requests }) => {
    var tableItems = [];

    if (requests.length !== 0) {
      for (var i = 0; i < requests.length; i++) {
        const roles = requests.flatMap((obj) => obj.roles.map((role) => role));
        var tableItem = {
          userName: requests[i].username,
          firstName: requests[i].username,
          lastName: requests[i].username,
          phoneNumber: requests[i].mobileNumber,
          email: requests[i].email,
          gender: requests[i].gender,
          roles: roles[i].rolename,
          activeDeActive: activeDeactive(requests[i], requests),
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
          const roles = requests.flatMap((obj) =>
            obj.roles.map((role) => role)
          );
          var tableItem = {
            userName: requests[i].username,
            firstName: requests[i].username,
            lastName: requests[i].username,
            phoneNumber: requests[i].mobileNumber,
            email: requests[i].email,
            gender: requests[i].gender,
            roles: roles[i].rolename,
            activeDeActive: activeDeactive(requests[i], requests),
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
        {/* {showFilter ? <SoftwareReqFilter /> : null} */}
        <section className="position-relative">
          <div className="lightGray-bg p-4 borderRadius-15 border border-white border-2 shadow ">
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
                onClick={() => {}}
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
                  <UserTable
                    requests={userLists}
                    columns={columns}
                    data={data}
                    onSort={handleSort}
                    fetchData={fetchData}
                    loading={load}
                    pageCount={pageCount}
                  />
                  {userManagmentEditModal && <UserManagmentEditModal />}
                  {userManagmentRoleModal && <UserManagmentRoleModal />}
                  {userManagmentChangePasswordModal && (
                    <UserManagmentChangePasswordModal />
                  )}
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

export default UserList;
