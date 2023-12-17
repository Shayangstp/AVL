import React, { useState, useEffect, Fragment } from "react";
import { Input, Space, Table, ConfigProvider, Empty } from "antd";
import faIR from "antd/lib/locale/fa_IR";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
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

import { getUserLocked, getUserUnLocked } from "../../services/userServices";
import { successMessage } from "../../utils/msg";

const UserList = () => {
  const dispatch = useDispatch();

  //table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const userLists = useSelector(selectUserLists);
  const userManagmentEditModal = useSelector(selectUserManagmentEditModal);
  const userManagmentChangePasswordModal = useSelector(
    selectUserManagmentChangePasswordModal
  );
  const userManagmentRoleModal = useSelector(selectUserManagmentRoleModal);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(handleUserLists());
  }, [currentUser]);

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space className="d-flex justify-content-between">
          <Button
            variant="primary"
            className="font10"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="sm"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            variant="success "
            className="font10"
            size="sm"
            onClick={() => {
              clearFilters();
              setSearchText("");
              handleSearch(selectedKeys, confirm, "");
              close();
            }}
            style={{ width: 80 }}
          >
            حذف فیلتر
          </Button>
          <Button
            className="font10"
            variant="secondary"
            size="sm"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      const columnValue = record[dataIndex] ? record[dataIndex].toString() : "";
      return columnValue.toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          const input = document.querySelector(
            ".ant-table-filter-dropdown input"
          );
          if (input) {
            input.focus();
          }
        }, 0);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ fontWeight: "bold" }}>{text}</span>
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const columns = [
    {
      key: "idx",
      title: "ردیف",
      dataIndex: "",
      render: (text, record, index) => index + 1,
      titleStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      width: 200,
    },
    {
      key: "username",
      title: "نام کاربری",
      dataIndex: "username",
      sorter: (a, b) => {
        if (!a.username && !b.username) {
          return 0;
        }

        if (!a.username) {
          return 1;
        }

        if (!b.username) {
          return -1;
        }

        return a.username.localeCompare(b.username);
      },
      ...getColumnSearchProps("username", "جستجو..."),
      width: 200,
    },
    {
      key: "username",
      title: "نام",
      dataIndex: "username",
      sorter: (a, b) => {
        if (!a.username && !b.username) {
          return 0;
        }

        if (!a.username) {
          return 1;
        }

        if (!b.username) {
          return -1;
        }

        return a.username.localeCompare(b.username);
      },
      ...getColumnSearchProps("username", "جستجو..."),
      width: 200,
    },
    {
      key: "username",
      title: "نام خانوادگی",
      dataIndex: "username",
      sorter: (a, b) => {
        if (!a.username && !b.username) {
          return 0;
        }

        if (!a.username) {
          return 1;
        }

        if (!b.username) {
          return -1;
        }

        return a.username.localeCompare(b.username);
      },
      ...getColumnSearchProps("username", "جستجو..."),
      width: 200,
    },
    {
      key: "operation",
      title: "فعال / غیرفعال",
      dataIndex: "operation",
      render: (_, record) => <span>{activeDeactive(record)}</span>,
      width: 100,
    },
    {
      key: "operation",
      title: "عملیات",
      dataIndex: "operation",
      render: (_, record) => <span>{operation(record)}</span>,
      width: 100,
    },
  ];

  //handle active or deactive
  const activeDeactive = (request) => {
    const token = localStorage.getItem("token");
    return (
      <Form.Check
        type="switch"
        checked={request.islockedout}
        onChange={async (e) => {
          const reqs = [...userLists];
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

  const paginationConfig = {
    position: ["bottomCenter"],
    showTotal: (total) => (
      <span className="font12">مجموع کاربران : {total}</span>
    ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
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

  return (
    <Container fluid className="py-4">
      <Fragment>
        <section className="position-relative">
          <div className="lightGray-bg p-4 borderRadius-15 border border-white border-2 shadow ">
            <div className="d-flex align-items-center justify-content-between"></div>
            <div className="position-relative">
              <Fragment>
                <Fragment>
                  <ConfigProvider
                    locale={faIR}
                    // theme={{
                    //   token: {
                    //     colorPrimary: "#00b96b",
                    //     colorBgContainer: "#f6ffed",
                    //   },
                    // }}
                  >
                    <Table
                      locale={{
                        emptyText: <Empty description="اطلاعات موجود نیست!" />,
                      }}
                      className="list"
                      bordered
                      dataSource={userLists}
                      columns={columns}
                      pagination={paginationConfig}
                      scroll={{ x: "max-content" }}
                      size="middle"
                    />
                  </ConfigProvider>
                  {userManagmentEditModal && <UserManagmentEditModal />}
                  {userManagmentRoleModal && <UserManagmentRoleModal />}
                  {userManagmentChangePasswordModal && (
                    <UserManagmentChangePasswordModal />
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

export default UserList;
