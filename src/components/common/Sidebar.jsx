import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import {
  faHome,
  faLocationDot,
  faChevronUp,
  faChevronDown,
  faClone,
  faChartSimple,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../slices/mainSlices";
import { handleLogout, selectLoggedIn } from "../../slices/authSlices";

const Sidebar = () => {
  const [deviceDrop, setDeviceDrop] = useState(false);
  const [categoriesDrop, setCategoriesDrop] = useState(false);
  const [reportsDrop, setReportDrop] = useState(false);
  const [userManagmentDrop, setUserManagementDrop] = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className="sidebar shadow h-100">
        <Navbar expand="lg" bg="dark" className="sidebarItems h-100">
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="w-100 h-100 d-flex flex-column justify-content-between"
          >
            <div className="w-100 mt-5">
              <Nav className="flex-column w-100">
                <Navbar.Brand href="#home" className="text-center mb-3">
                  {/* <div className="text-center text-white">
                    <img
                      className="img-fluid invert w-25 mb-3"
                      src="../../images/avlLogo.png"
                    />
                  </div> */}
                </Navbar.Brand>
                <Nav.Link
                  onClick={() => navigate("/home")}
                  className="sidebar-link text-white"
                >
                  <span className="ms-3">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  <span className="ms-3 font12">داشبورد</span>
                </Nav.Link>
                {/* device dropDown */}
                <Nav.Link
                  onClick={() => handleDeviceDropdown()}
                  href="#about"
                  className="sidebar-link d-flex justify-content-between text-white"
                >
                  <span className="ms-3 font9">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="me-3 font10"
                    />
                    دستگاه ها
                  </span>
                  <span className="ms-3">
                    {deviceDrop ? (
                      <FontAwesomeIcon icon={faChevronUp} className="me-3" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} className="me-3" />
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
                      // onClick={() => navigate("/")}
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
                  <span className="ms-3 font9">
                    <FontAwesomeIcon icon={faClone} className="me-3" />
                    دسته ها
                  </span>
                  <span className="ms-3">
                    {categoriesDrop ? (
                      <FontAwesomeIcon icon={faChevronUp} className="me-3" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} className="me-3" />
                    )}
                  </span>
                </Nav.Link>
                {categoriesDrop && (
                  <div className="transitionAll">
                    <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                      <span className="ms-4 lightGray font9">مشاهده</span>
                    </Nav.Link>
                  </div>
                )}
                {/* report */}
                <Nav.Link
                  onClick={handleReportDropdown}
                  className="sidebar-link d-flex flex-row justify-content-between text-white"
                >
                  <span className="ms-3 font9">
                    <FontAwesomeIcon icon={faChartSimple} className="me-3" />
                    گزارش ها
                  </span>
                  <span className="ms-3">
                    {reportsDrop ? (
                      <FontAwesomeIcon icon={faChevronUp} className="me-3" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} className="me-3" />
                    )}
                  </span>
                </Nav.Link>
                {reportsDrop && (
                  <div className="transitionAll">
                    <Nav.Link
                      href="#dropdown-item-1"
                      className="sidebar-link text-white"
                    >
                      <span className="ms-4 lightGray font9">مشاهده مسیر</span>
                    </Nav.Link>
                    <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                      <span className="ms-4 lightGray font9">
                        مشاهده آخرین موقعیت
                      </span>
                    </Nav.Link>
                    <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                      <span className="ms-4 lightGray font9">گزارش گیری</span>
                    </Nav.Link>
                  </div>
                )}
                {/* user management */}
                <Nav.Link
                  onClick={handleUserManagmentdropDown}
                  className="sidebar-link d-flex flex-row justify-content-between text-white"
                >
                  <span className="ms-3 font9">
                    <FontAwesomeIcon icon={faUser} className="me-3" />
                    مدیریت کاربران
                  </span>
                  <span className="ms-3">
                    {userManagmentDrop ? (
                      <FontAwesomeIcon icon={faChevronUp} className="me-3" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} className="me-3" />
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
                    <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                      <span className="ms-4 lightGray font9">
                        مشاهده کاربرها
                      </span>
                    </Nav.Link>
                    <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                      <span className="ms-4 lightGray font9">
                        مشاهده شماره تلفن ها
                      </span>
                    </Nav.Link>
                    <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                      <span className="ms-4 lightGray font9">
                        افزودن شماره تلفن
                      </span>
                    </Nav.Link>
                  </div>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Sidebar;
