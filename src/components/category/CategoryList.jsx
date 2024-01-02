import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { Input, Space, Table, ConfigProvider, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import faIR from "antd/lib/locale/fa_IR";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faCar,
  faUser,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import {
  handleCategoryList,
  selectCategorylist,
  RsetCategoryCurrentRequest,
} from "../../slices/categorySlices";
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
import Loading from "../common/Loading";
import { RsetLoading, selectLoading } from "../../slices/mainSlices";
import { selectCategoryCurrentRequest } from "../../slices/categorySlices";

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

const CategoryList = () => {
  const dispatch = useDispatch();

  //table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const categoryList = useSelector(selectCategorylist);
  const categoryEditModal = useSelector(selectCategoryEditModal);
  const categoryAddVehicleModal = useSelector(selectCategoryAddVehicleModal);
  const categoryCommonUsermodal = useSelector(selectCategoryCommonUserModal);
  const categoryManageVehicleModal = useSelector(
    selectCategoryManageVehicleModal
  );
  const categoryAddModal = useSelector(selectCategoryAddModal);
  const categoryCurrentRequest = useSelector(selectCategoryCurrentRequest);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(handleCategoryList());
  }, [categoryCurrentRequest]);

  console.log(categoryList);

  console.log(categoryCurrentRequest);

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
      dataIndex: "idx",
      render: (text, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
      titleStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      width: 200,
    },
    {
      key: "idx",
      title: "رنگ",
      dataIndex: "",
      render: (text, record, index) => handleBackgroundColor(index, record),
      titleStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      width: 200,
    },
    {
      key: "name",
      title: "نام گروه",
      dataIndex: "name",
      sorter: (a, b) => {
        if (!a.name && !b.name) {
          return 0;
        }

        if (!a.name) {
          return 1;
        }

        if (!b.name) {
          return -1;
        }

        return a.name.localeCompare(b.name);
      },
      ...getColumnSearchProps("name", "جستجو..."),
      width: 200,
    },
    {
      key: "desc",
      title: "توضیحات",
      dataIndex: "desc",
      sorter: (a, b) => {
        if (!a.desc && !b.desc) {
          return 0;
        }

        if (!a.desc) {
          return 1;
        }

        if (!b.desc) {
          return -1;
        }

        return a.desc.localeCompare(b.desc);
      },
      ...getColumnSearchProps("desc", "جستجو..."),
      width: 200,
    },
    // {
    //   key: "devices",
    //   title: "تعداد وسیله نقلیه",
    //   dataIndex: "devices",
    //   sorter: (a, b) => {
    //     if (!a.driverName && !b.driverName) {
    //       return 0;
    //     }

    //     if (!a.driverName) {
    //       return 1;
    //     }

    //     if (!b.driverName) {
    //       return -1;
    //     }

    //     return a.devices?.length.localeCompare(b.devices?.length);
    //   },
    //   render: (devices) => devices?.length,
    //   ...getColumnSearchProps("devices", "جستجو..."),
    //   width: 200,
    // },
    {
      key: "operation",
      title: "عملیات",
      dataIndex: "operation",
      render: (_, record) => <span>{operation(record)}</span>,
      width: 100,
    },
  ];

  const paginationConfig = {
    position: ["bottomCenter"],
    showTotal: (total) => (
      <span className="font12">مجموع وسیله ها: {total}</span>
    ),
    pageSize: 10,
    showSizeChanger: false,
    pageSizeOptions: [],
    size: "small",
  };

  const operation = (request) => {
    return (
      <div className="d-flex justify-content-center gap-1 ms-2 flex-wrap">
        <Button
          title="ویرایش"
          className="btn btn-primary d-flex align-items-center  mb-2 mb-md-2"
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
          className="btn btn-success d-flex align-items-center  mb-2 mb-md-2"
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
          className="btn btn-danger d-flex align-items-center  mb-2 mb-md-2"
          size="sm"
          active
          onClick={() => {
            console.log(request);
            dispatch(RsetCategoryCurrentRequest(request));
            dispatch(RsetCategoryManageVehicleModal(true));
          }}
        >
          <FontAwesomeIcon icon={faCar} />
        </Button>
        <Button
          title="کاربر های مشابه"
          className="btn btn-info d-flex align-items-center  mb-2 mb-md-2"
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
  };

  //data should be ok in this color handling function

  const handleBackgroundColor = (i, request) => {
    return (
      <div className="d-flex justify-content-center rounded-circle">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center border"
          style={{
            background: `${request.color && request.color}`,
            width: "30px",
            height: "30px",
          }}
        ></div>
      </div>
    );
  };

  return (
    <Container fluid className="py-4">
      {/* {menuPermission ? */}
      <Fragment>
        {/* {showFilter ? <SoftwareReqFilter /> : null} */}
        <section className="position-relative">
          <div
            className="d-flex justify-content-between text-white py-3  borderRadius-top"
            style={{ background: "#485550" }}
          >
            <div className="ms-4 mt-1">
              <span className="me-2">
                <FontAwesomeIcon icon={faList} />
              </span>
              لیست گروه ها{" "}
            </div>
            <Button
              size="sm"
              variant="success"
              className="px-4 me-4 shadow"
              onClick={() => {
                dispatch(RsetCategoryAddModal(true));
              }}
            >
              + افزودن
            </Button>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between"></div>
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
                      dataSource={categoryList}
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
          </div>
        </section>
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
