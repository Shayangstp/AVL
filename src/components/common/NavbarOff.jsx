import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Offcanvas, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  faHome,
  faLocationDot,
  faChevronUp,
  faChevronDown,
  faClone,
  faChartSimple,
  faUser,
  faUserCircle,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectAvatar } from "../../slices/mainSlices";
import { RsetLoggedIn, selectLoggedIn } from "../../slices/authSlices";
import {
  RsetChangeProfilePicModal,
  selectChangeProfilePicModal,
} from "../../slices/modalSlices";
import ChangeProfilePicModal from "./modals/ChangeProfilePicModal";

const NavbarOff = () => {
  const [deviceDrop, setDeviceDrop] = useState(false);
  const [categoriesDrop, setCategoriesDrop] = useState(false);
  const [reportsDrop, setReportDrop] = useState(false);
  const [userManagmentDrop, setUserManagementDrop] = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const avatar = useSelector(selectAvatar);

  const handleDeviceDropdown = () => {
    setDeviceDrop(!deviceDrop);
  };
  const handleCategoriesDropdown = () => {
    setCategoriesDrop(!categoriesDrop);
  };
  const handleReportDropdown = () => {
    setReportDrop(!reportsDrop);
  };
  const handleUserManagmentdropDown = () => {
    setUserManagementDrop(!userManagmentDrop);
  };
  const handleProfileDropdown = () => {
    setProfileDrop(!profileDrop);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="bg-dark w-100 d-flex justify-content-between p-2">
      <Button
        className="px-3 py-1 mt-2 mb-2 ms-2 border border-2 border-secondary offcanvasBtn"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faBars} className="fs-6 text-white" />
      </Button>
      <div className="text-white text-end mt-1">
        <img className="invert w-50" src="../../images/avlLogo.png" />
      </div>

      <Offcanvas show={show} onHide={handleClose} className="text-white">
        <Offcanvas.Header closeButton closeVariant="white" className="ms-auto">
          {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          <div className="w-100">
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
                <span className="ms-3">داشبورد</span>
              </Nav.Link>
              {/* device dropDown */}
              <Nav.Link
                onClick={() => handleDeviceDropdown()}
                href="#about"
                className="sidebar-link d-flex justify-content-between text-white"
              >
                <span className="ms-3">
                  <FontAwesomeIcon icon={faLocationDot} className="me-3" />
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
                    <span className="ms-4 lightGray">افزودن دستگاه</span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => navigate("/deviceList")}
                    className="sidebar-link"
                  >
                    <span className="ms-4 lightGray">مشاهده دستگاه ها</span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => navigate("/addVehicle")}
                    className="sidebar-link"
                  >
                    <span className="ms-4 lightGray">افزودن مدل دستگاه</span>
                  </Nav.Link>
                </div>
              )}
              {/* categories dropDown */}
              <Nav.Link
                onClick={handleCategoriesDropdown}
                className="sidebar-link d-flex flex-row justify-content-between text-white"
              >
                <span className="ms-3">
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
                  <Nav.Link
                    onClick={() => navigate("/categoryList")}
                    className="sidebar-link"
                  >
                    <span className="ms-4 lightGray">مشاهده</span>
                  </Nav.Link>
                </div>
              )}
              {/* report */}
              <Nav.Link
                onClick={handleReportDropdown}
                className="sidebar-link d-flex flex-row justify-content-between text-white"
              >
                <span className="ms-3">
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
                    <span className="ms-4 lightGray">مشاهده مسیر</span>
                  </Nav.Link>
                  <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                    <span className="ms-4 lightGray">مشاهده آخرین موقعیت</span>
                  </Nav.Link>
                  <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                    <span className="ms-4 lightGray">گزارش گیری</span>
                  </Nav.Link>
                </div>
              )}
              {/* user management */}
              <Nav.Link
                onClick={handleUserManagmentdropDown}
                className="sidebar-link d-flex flex-row justify-content-between text-white"
              >
                <span className="ms-3">
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
                    <span className="ms-4 lightGray">افزودن کاربر</span>
                  </Nav.Link>
                  <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                    <span className="ms-4 lightGray">مشاهده کاربرها</span>
                  </Nav.Link>
                  <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                    <span className="ms-4 lightGray">مشاهده شماره تلفن ها</span>
                  </Nav.Link>
                  <Nav.Link href="#dropdown-item-1" className="sidebar-link">
                    <span className="ms-4 lightGray">افزودن شماره تلفن</span>
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </div>
          <div>
            <Navbar
              // expand="lg"
              // fixed="top"
              bg="dark"
              variant="dark"
              className="d-flex justify-content-end borderRadius-15 shadow-lg "
            >
              {/* <Container className="me-5"> */}
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="d-flex justify-content-end w-100">
                  <Nav.Link className="mt-2 me-1">
                    <div>شایان گلستانی پور</div>
                  </Nav.Link>
                  <NavDropdown
                    drop="up"
                    dir="ltr"
                    title={
                      !avatar ? (
                        <FontAwesomeIcon
                          className="navIconProfile ms-2"
                          icon={faUserCircle}
                        />
                      ) : (
                        <img
                          className="invert navProfilePic ms-2 border border-2  border-secondary"
                          src="../../images/avlLogo.png"
                        />
                      )
                    }
                    id="basic-nav-dropdown"
                    className="me-2"
                  >
                    <NavDropdown.Item className="font10 fw-bold">
                      تغییر رمز عبور
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      className="font10 fw-bold"
                      onClick={() => dispatch(RsetChangeProfilePicModal(true))}
                    >
                      {avatar ? "تغییر عکس پروفایل" : "آپلود عکس پروفایل"}
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link
                    href="/"
                    className="me-5 mt-2"
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(RsetLoggedIn(false));
                    }}
                  >
                    <FontAwesomeIcon icon={faPowerOff} className="fs-6" />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              {/* </Container> */}
            </Navbar>
            <ChangeProfilePicModal />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default NavbarOff;
