import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faSun,
  faMoon,
  faHome,
  faLocationDot,
  faChevronUp,
  faChevronDown,
  faClone,
  faChartSimple,
  faUser,
  faUserCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { RsetLoggedIn, selectLoggedIn } from "../../slices/authSlices";
import { selectAvatar } from "../../slices/mainSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Clock from "react-live-clock";
import {
  RsetChangeProfilePicModal,
  selectChangeProfilePicModal,
} from "../../slices/modalSlices";
import ChangeProfilePicModal from "./modals/ChangeProfilePicModal";
import { useEffect } from "react";
import { handleUserData } from "../../slices/authSlices";
import { selectUser } from "../../slices/mainSlices";
import { selectSmallNav } from "../../slices/mainSlices";

const Header = () => {
  const [deviceDrop, setDeviceDrop] = useState(false);
  const [categoriesDrop, setCategoriesDrop] = useState(false);
  const [reportsDrop, setReportDrop] = useState(false);
  const [userManagmentDrop, setUserManagementDrop] = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const [show, setShow] = useState(false);
  const currentTime = new Date();
  const isAM = currentTime.getHours() < 12;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector(selectLoggedIn);
  const avatar = useSelector(selectAvatar);
  const profilePicModal = useSelector(selectChangeProfilePicModal);
  const user = useSelector(selectUser);
  const smallNav = useSelector(selectSmallNav);

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

  const handleProfileDropdown = () => {
    setProfileDrop(!profileDrop);
  };
  const handleClose = () => {
    handleStatesFalse();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <div className="w-100">
      <Nav className="d-flex justify-content-end w-100">
        <div
          className={`d-flex ${
            !smallNav ? "justify-content-between" : "justify-content-end"
          } bg-dark borderRadius-15 p-1 border w-100`}
        >
          {!smallNav && (
            <div className="mt-3 text-center">
              <img
                className="img-fluid w-25"
                src="../../images/avlLogoFinal.png"
              />
            </div>
          )}
          <div className="d-flex justify-content-end align-items-center">
            <div className="me-3 ms-3 d-inline d-xl-none" id="offCanvas-btn">
              <FontAwesomeIcon
                icon={faBars}
                className="fs-6 text-white cursorPointer"
                onClick={handleShow}
              />
            </div>
            <div className="line me-4" id="line-break"></div>
            <div id="time" className="d-flex ">
              <span>
                {isAM ? (
                  <FontAwesomeIcon
                    icon={faSun}
                    className="text-light d-none d-md-inline"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faMoon}
                    className="text-light d-none d-md-inline"
                  />
                )}
              </span>
              <Clock
                format="HH:mm:ss"
                interval={1000}
                ticking={true}
                className="ms-3 text-light d-none d-md-inline"
                style={{ width: "60px" }}
                // onChange={(date) => console.log(date)}
              />
            </div>
            <div
              className="line me-4 d-none d-md-inline ms-4"
              id="line-break"
            ></div>
            <div className="" id="profile-name">
              <Nav.Link className="d-flex flex-column justify-content-center align-items-end text-light">
                <div className="">{user.id.username}</div>
                <div className="">
                  {user.id.firstname + " " + user.id.lastname}
                </div>
              </Nav.Link>
            </div>
            <div id="profile-pic">
              <NavDropdown
                dir="ltr"
                title={
                  !avatar ? (
                    <FontAwesomeIcon
                      className="navIconProfile ms-2 me-3 text-light"
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
            </div>
          </div>

          {/* logOut */}
          {/* <Nav.Link
                href="/"
                className="me-5 mt-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(RsetLoggedIn(false));
                }}
              > */}
          {/* <FontAwesomeIcon icon={faPowerOff} className="fs-6" /> */}
          {/* </Nav.Link> */}
        </div>
      </Nav>
      <Offcanvas show={show} onHide={handleClose} className="text-white">
        <Offcanvas.Header closeButton closeVariant="white" className="ms-auto">
          {/* <Offcanvas.Title className="mt-1"></Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          <div className="w-100">
            <Nav className="flex-column w-100">
              <Navbar.Brand className="text-center mb-3">
                {/* <div className="text-center text-white">
                  <img
                    className="img-fluid invert w-25 mb-3"
                    src="../../images/avlLogo.png"
                  />
                </div> */}
              </Navbar.Brand>
              <Nav.Link
                onClick={() => {
                  handleClose();
                  navigate("/home");
                }}
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
                    onClick={() => {
                      navigate("/addDevice");
                      handleClose();
                    }}
                    className="sidebar-link"
                  >
                    <span className="ms-4 lightGray">افزودن دستگاه</span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      handleClose();
                      navigate("/deviceList");
                    }}
                    className="sidebar-link"
                  >
                    <span className="ms-4 lightGray">مشاهده دستگاه ها</span>
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
                    onClick={() => {
                      navigate("/categoryList");
                      handleClose();
                    }}
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
                    onClick={() => {
                      navigate("/viewPath");
                      handleClose();
                    }}
                    className="sidebar-link text-white"
                  >
                    <span className="ms-4 lightGray">مشاهده مسیر</span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate("/viewLastLocation");
                      handleClose();
                    }}
                    className="sidebar-link"
                  >
                    <span className="ms-4 lightGray">مشاهده آخرین موقعیت</span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate("/getReportPage");
                      handleClose();
                    }}
                    className="sidebar-link"
                  >
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
                    onClick={() => {
                      navigate("/addUser");
                      handleClose();
                    }}
                    className="sidebar-link"
                  >
                    <span className="ms-4 lightGray">افزودن کاربر</span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate("/userList");
                      handleClose();
                    }}
                    className="sidebar-link"
                  >
                    <span className="ms-4 lightGray">مشاهده کاربرها</span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate("/viewPhoneNumbers");
                      handleClose();
                    }}
                    className="sidebar-link"
                  >
                    <span className="ms-4 lightGray">مشاهده شماره تلفن ها</span>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate("/addPhoneNumber");
                      handleClose();
                    }}
                    className="sidebar-link"
                  >
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
                <Nav className="d-flex justify-content-center w-100  ms-3">
                  <Nav.Link className="mt-2">
                    <div>{user.id.username}</div>
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

      {/* </Container> */}

      <ChangeProfilePicModal />
    </div>
  );
};

export default Header;
