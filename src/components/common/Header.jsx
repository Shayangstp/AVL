import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { RsetLoggedIn, selectLoggedIn } from "../../slices/authSlices";
import { selectAvatar } from "../../slices/mainSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  RsetChangeProfilePicModal,
  selectChangeProfilePicModal,
} from "../../slices/modalSlices";
import ChangeProfilePicModal from "./modals/ChangeProfilePicModal";
import { useEffect } from "react";
import { handleUserData } from "../../slices/authSlices";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector(selectLoggedIn);
  const avatar = useSelector(selectAvatar);
  const profilePicModal = useSelector(selectChangeProfilePicModal);

  return (
    <div>
      <Navbar
        // expand="lg"
        // fixed="top"
        bg="dark"
        variant="dark"
        className="d-flex justify-content-end "
      >
        {/* <Container className="me-5"> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-between w-100">
            <div className="text-center ms-5">
              <img
                className="img-fluid invert w-50 mt-3 ms-3"
                src="../../images/avlLogo.png"
              />
            </div>
            <div className="d-flex">
              <Nav.Link className="mt-2 me-1">
                <div>شایان گلستانی پور</div>
              </Nav.Link>
              <NavDropdown
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
            </div>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
      <ChangeProfilePicModal />
    </div>
  );
};

export default Header;
