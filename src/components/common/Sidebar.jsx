import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Nav, Navbar, DropdownButton, Dropdown } from "react-bootstrap";
import {
  faHome,
  faLocationDot,
  faChevronUp,
  faChevronDown,
  faClone,
  faChartSimple,
  faUser,
  faUserCircle,
  faBars,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectSmallNav,
  RsetSmallNav,
} from "../../slices/mainSlices";
import {
  handleLogout,
  selectLoggedIn,
  RsetLoggedIn,
} from "../../slices/authSlices";

const Sidebar = () => {
  const [deviceDrop, setDeviceDrop] = useState(false);
  const [categoriesDrop, setCategoriesDrop] = useState(false);
  const [reportsDrop, setReportDrop] = useState(false);
  const [userManagmentDrop, setUserManagementDrop] = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const smallNav = useSelector(selectSmallNav);
  const loggedIn = useSelector(selectLoggedIn);

  const handleStatesFalse = () => {
    setDeviceDrop(false);
    setCategoriesDrop(false);
    setReportDrop(false);
    setUserManagementDrop(false);
    setProfileDrop(false);
  };

  const handleDeviceDropdown = () => {
    handleStatesFalse();
    setDeviceDrop(!deviceDrop);
  };
  const handleCategoriesDropdown = () => {
    handleStatesFalse();
    setCategoriesDrop(!categoriesDrop);
  };
  const handleReportDropdown = () => {
    handleStatesFalse();
    setReportDrop(!reportsDrop);
  };
  const handleUserManagmentdropDown = () => {
    handleStatesFalse();
    setUserManagementDrop(!userManagmentDrop);
  };

  return (
    <div className="h-100">
      {/* <div className="sidebar shadow h-100 borderRadius-15"> */}
      {!smallNav ? (
        <Navbar expand="lg" bg="dark" className="borderRadius-15 h-100">
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="w-100 h-100 d-flex flex-column justify-content-between"
          >
            <div className="mt-3 d-flex w-100">
              <Nav className="d-flex flex-column align-items-center w-100">
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faBars}
                    className="fs-6 text-white cursorPointer"
                    onClick={() => {
                      dispatch(RsetSmallNav(!smallNav));
                    }}
                  />
                </div>
                <Nav.Link
                  onClick={() => navigate("/home")}
                  className="text-white "
                >
                  <span className="">
                    <FontAwesomeIcon
                      icon={faHome}
                      id="dashboard"
                      className="h4 navItem me-1"
                    />
                  </span>
                </Nav.Link>
                {/* device dropDown */}
                <div className="">
                  <DropdownButton
                    className="d-flex justify-content-between text-white "
                    drop="end"
                    variant="transparent"
                    title={
                      <span>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="h4 navItem ms-1"
                        />
                      </span>
                    }
                  >
                    <Dropdown.Header>دستگاه ها</Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => navigate("/addDevice")}>
                      افزودن دستگاه
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/deviceList")}>
                      مشاهده دستگاه ها
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/addVehicle")}>
                      افزودن مدل دستگاه
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                {/* categories dropDown */}
                <div className="">
                  <DropdownButton
                    data-bs-theme="dark"
                    className="d-flex justify-content-between text-white"
                    drop="end"
                    variant="transparent"
                    title={
                      <span>
                        <FontAwesomeIcon
                          icon={faClone}
                          className="h4 navItem"
                        />
                      </span>
                    }
                  >
                    <Dropdown.Header>دسته ها</Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => navigate("/categoryList")}>
                      مشاهده
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                {/* report */}
                <div className="">
                  <DropdownButton
                    data-bs-theme="dark"
                    className="d-flex justify-content-between text-white"
                    drop="end"
                    variant="transparent"
                    title={
                      <span>
                        <FontAwesomeIcon
                          icon={faChartSimple}
                          className="navItem h4"
                        />
                      </span>
                    }
                  >
                    <Dropdown.Header>گزارش ها</Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => navigate("/viewPath")}>
                      مشاهده مسیر
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => navigate("/viewLastLocation")}
                    >
                      مشاهده آخرین موقعیت
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/getReportPage")}>
                      گزارش گیری
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                {/* user management */}
                <div className="">
                  <DropdownButton
                    data-bs-theme="dark"
                    className="d-flex justify-content-between text-white"
                    drop="end"
                    variant="transparent"
                    title={
                      <span>
                        <FontAwesomeIcon icon={faUser} className="navItem h4" />
                      </span>
                    }
                  >
                    <Dropdown.Header>مدیریت کاربران</Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => navigate("/addUser")}>
                      افزودن کاربر
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/userList")}>
                      مشاهده کاربرها
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => navigate("/viewPhoneNumbers")}
                    >
                      مشاهده شماره تلفن ها
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/addPhoneNumber")}>
                      افزودن شماره تلفن
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </Nav>
            </div>
            <div>
              <span
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(RsetLoggedIn(false));
                  navigate("/");
                }}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="me-2 h4 navItem cursorPointer"
                />
              </span>
              <div style={{ height: "50px" }}></div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar expand="lg" bg="dark" className="h-100 borderRadius-15">
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="w-100 h-100 d-flex flex-column justify-content-between"
          >
            <div className="w-100 mt-3">
              <Nav className="flex-column w-100">
                <Navbar.Brand className="text-center mb-3 d-flex justify-content-between align-items-center">
                  <div className="text-center text-white">
                    <img
                      className="img-fluid w-50 cursorPointer"
                      src="../../images/avlLogoFinal.png"
                      onClick={() => {
                        navigate("/home");
                      }}
                    />
                  </div>
                  <div className="">
                    <FontAwesomeIcon
                      icon={faBars}
                      className="fs-6 text-white cursorPointer"
                      onClick={() => {
                        dispatch(RsetSmallNav(!smallNav));
                      }}
                    />
                  </div>
                </Navbar.Brand>
                <Nav.Link
                  onClick={() => navigate("/home")}
                  className="sidebar-link text-white mt-2"
                >
                  <span className="ms-3">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  <span className="ms-3">داشبورد</span>
                </Nav.Link>
                {/* device dropDown */}
                <Nav.Link
                  onClick={() => handleDeviceDropdown()}
                  href="#about"
                  className="sidebar-link d-flex justify-content-between text-white"
                >
                  <span className="ms-3 font12">
                    <FontAwesomeIcon icon={faLocationDot} className="me-3" />
                    دستگاه ها
                  </span>
                  <span className="ms-3">
                    {deviceDrop ? (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="me-3 font10"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="me-3 font10"
                      />
                    )}
                  </span>
                </Nav.Link>
                {deviceDrop && (
                  <div className="transitionAll">
                    <Nav.Link
                      onClick={() => navigate("/addDevice")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font10">
                        افزودن دستگاه
                      </span>
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/deviceList")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font10">
                        مشاهده دستگاه ها
                      </span>
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/addVehicle")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font10">
                        افزودن مدل دستگاه
                      </span>
                    </Nav.Link>
                  </div>
                )}
                {/* categories dropDown */}
                <Nav.Link
                  onClick={handleCategoriesDropdown}
                  className="sidebar-link d-flex flex-row justify-content-between text-white"
                >
                  <span className="ms-3 font12">
                    <FontAwesomeIcon icon={faClone} className="me-3" />
                    دسته ها
                  </span>
                  <span className="ms-3">
                    {categoriesDrop ? (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="me-3 font10"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="me-3 font10"
                      />
                    )}
                  </span>
                </Nav.Link>
                {categoriesDrop && (
                  <div className="transitionAll">
                    <Nav.Link
                      onClick={() => navigate("/categoryList")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font10">مشاهده</span>
                    </Nav.Link>
                  </div>
                )}
                {/* report */}
                <Nav.Link
                  onClick={handleReportDropdown}
                  className="sidebar-link d-flex flex-row justify-content-between text-white"
                >
                  <span className="ms-3 font12">
                    <FontAwesomeIcon icon={faChartSimple} className="me-3" />
                    گزارش ها
                  </span>
                  <span className="ms-3">
                    {reportsDrop ? (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="me-3 font10"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="me-3 font10"
                      />
                    )}
                  </span>
                </Nav.Link>
                {reportsDrop && (
                  <div className="transitionAll">
                    <Nav.Link
                      onClick={() => navigate("/viewPath")}
                      className="sidebar-link text-white"
                    >
                      <span className="ms-4 lightGray font9">مشاهده مسیر</span>
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/viewLastLocation")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font9">
                        مشاهده آخرین موقعیت
                      </span>
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/getReportPage")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font9">گزارش گیری</span>
                    </Nav.Link>
                  </div>
                )}
                {/* user management */}
                <Nav.Link
                  onClick={handleUserManagmentdropDown}
                  className="sidebar-link d-flex flex-row justify-content-between text-white"
                >
                  <span className="ms-3 font12">
                    <FontAwesomeIcon icon={faUser} className="me-3" />
                    مدیریت کاربران
                  </span>
                  <span className="ms-3">
                    {userManagmentDrop ? (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="me-3 font10"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="me-3 font10"
                      />
                    )}
                  </span>
                </Nav.Link>
                {userManagmentDrop && (
                  <div className="transitionAll">
                    <Nav.Link
                      onClick={() => navigate("/addUser")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font9">افزودن کاربر</span>
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/userList")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font9">
                        مشاهده کاربرها
                      </span>
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/viewPhoneNumbers")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font9">
                        مشاهده شماره تلفن ها
                      </span>
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/addPhoneNumber")}
                      className="sidebar-link"
                    >
                      <span className="ms-4 lightGray font9">
                        افزودن شماره تلفن
                      </span>
                    </Nav.Link>
                  </div>
                )}
              </Nav>
            </div>
            <div>
              <Button className="px-4 py-2 bg-transparent border-2 border-danger rounded-pill navItem">
                <span
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispatch(RsetLoggedIn(false));
                    navigate("/");
                  }}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
                </span>
                <span className="font12">خروج</span>
              </Button>
              <div style={{ height: "50px" }}></div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
    // </div>
  );
};

export default Sidebar;
