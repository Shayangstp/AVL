import React, { useState, useEffect, Fragment } from "react";
import { Input, Space, Table, ConfigProvider, Empty } from "antd";
import faIR from "antd/lib/locale/fa_IR";
import { SearchOutlined } from "@ant-design/icons";
import { Container, Row, Col, Button, Tabs, Tab, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAllUserPhoneNumberList,
  selectUserPhoneNumberList,
} from "../../slices/userManagmentSlices";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../common/Loading";
import { RsetLoading, selectLoading } from "../../slices/mainSlices";

const PhoneNumberList = () => {
  const dispatch = useDispatch();
  //table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const userPhoneNumberList = useSelector(selectUserPhoneNumberList);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(handleAllUserPhoneNumberList());
  }, []);

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
      key: "firstName",
      title: "نام",
      dataIndex: "firstName",
      sorter: (a, b) => {
        if (!a.firstName && !b.firstName) {
          return 0;
        }

        if (!a.firstName) {
          return 1;
        }

        if (!b.firstName) {
          return -1;
        }

        return a.firstName.localeCompare(b.firstName);
      },
      ...getColumnSearchProps("firstName", "جستجو..."),
      width: 200,
    },
    {
      key: "lastName",
      title: "نام خانوادگی",
      dataIndex: "lastName",
      sorter: (a, b) => {
        if (!a.lastName && !b.lastName) {
          return 0;
        }

        if (!a.lastName) {
          return 1;
        }

        if (!b.lastName) {
          return -1;
        }

        return a.lastName.localeCompare(b.lastName);
      },
      ...getColumnSearchProps("lastName", "جستجو..."),
      width: 200,
    },
    {
      key: "phoneNumber",
      title: "شماره تلفن",
      dataIndex: "phoneNumber",
      sorter: (a, b) => {
        if (!a.phoneNumber && !b.phoneNumber) {
          return 0;
        }

        if (!a.phoneNumber) {
          return 1;
        }

        if (!b.phoneNumber) {
          return -1;
        }

        return a.phoneNumber.localeCompare(b.phoneNumber);
      },
      ...getColumnSearchProps("phoneNumber", "جستجو..."),
      width: 200,
    },
  ];

  const paginationConfig = {
    position: ["bottomCenter"],
    showTotal: (total) => (
      <span className="font12">مجموع شماره تلفن ها : {total}</span>
    ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
  };

  return (
    <Container fluid className="py-4">
      <Fragment>
        <section className="mt-4">
          <div
            className="d-flex justify-content-start text-white py-3  borderRadius-top"
            style={{ background: "#485550" }}
          >
            <div className="ms-4 mt-1">
              <span className="me-2">
                <FontAwesomeIcon icon={faList} />
              </span>
              لیست شماره تلفن ها{" "}
            </div>{" "}
          </div>
          <div className="position-relative">
            {!loading ? (
              <Fragment>
                <ConfigProvider locale={faIR}>
                  <Table
                    locale={{
                      emptyText: <Empty description="اطلاعات موجود نیست!" />,
                    }}
                    className="list"
                    bordered
                    dataSource={userPhoneNumberList}
                    columns={columns}
                    pagination={paginationConfig}
                    scroll={{ x: "max-content" }}
                    size="middle"
                  />
                </ConfigProvider>
              </Fragment>
            ) : (
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "200px" }}
              >
                <Loading height={"60px"} width={"60px"} />
              </div>
            )}
          </div>
        </section>
      </Fragment>
    </Container>
  );
};

export default PhoneNumberList;
