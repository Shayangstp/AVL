import React, { useState } from "react";
import {
  RsetFormErrors,
  selectFormErrors,
  RsetUser,
  selectUser,
  selectLoading,
  RsetLoading,
} from "../../slices/mainSlices";
import { useDispatch, useSelector } from "react-redux";
import { errorMessage, successMessage } from "../../utils/msg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ResetPassword from "./ResetPassword";
import {
  RsetUsername,
  RsetPassword,
  RsetShowLogin,
  //selects
  selectUsername,
  selectPassword,
  selectShowLogin,
  handleLogin,
  selectLoggedIn,
  RsetLoggedIn,
} from "../../slices/authSlices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingBtn from "../common/LoadingBtn";

const Login = () => {
  const [passType, setPassType] = useState("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //selects
  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  const showLogin = useSelector(selectShowLogin);
  const formErrors = useSelector(selectFormErrors);
  const user = useSelector(selectUser);
  const loggedIn = useSelector(selectLoggedIn);
  const loading = useSelector(selectLoading);

  const handlePassType = () => {
    setPassType((passType) => (passType === "password" ? "text" : "password"));
  };

  useEffect(() => {
    dispatch(RsetUsername(""));
    dispatch(RsetPassword(""));
  }, []);

  //validation

  const usernameIsValid = username !== "";
  const passwordIsValid = password !== "";
  const loginFormIsValid = usernameIsValid && passwordIsValid;

  const validation = () => {
    let errors = {};
    if (!usernameIsValid) {
      errors.username = "border border-danger";
    }
    if (!passwordIsValid) {
      errors.password = "border border-danger";
    }
    return errors;
  };

  const handleLoginFormSubmit = async (e) => {
    if (loginFormIsValid) {
      dispatch(handleLogin(e));
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            username,
            password,
          })
        )
      );
    }
  };

  if (loggedIn === true) {
    navigate("/home");
  }

  useEffect(() => {
    localStorage.clear();
    dispatch(RsetUser({}));
    dispatch(RsetLoggedIn(false));
  }, []);

  return (
    <section className="min-vh-100 vw-100 d-flex justify-content-center align-items-center  login-back-img inputDesignPrimary">
      <div className="res-main mt-5">
        <div className="row">
          <div className="col-12 mb-5">
            <div className="d-flex login-main-img img-fluid shadow-lg borderRadius-15 border border-secondary h-100">
              <div className="w-100">
                <Form
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 || e.which === 13) {
                      handleLoginFormSubmit(e);
                    }
                  }}
                >
                  <Row className="mt-5">
                    {showLogin ? (
                      <Col
                        md="12"
                        className="mb-5 mx-auto ms-md-5 d-flex flex-column w-75 justify-content-center align-items-center"
                      >
                        {/* title */}
                        <div className="text-center text-white">
                          <img
                            className="img-fluid invert w-50 mb-5"
                            src="../../images/avlLogo.png"
                          />
                        </div>
                        <Form.Group
                          as={Col}
                          xs="12"
                          md="12"
                          lg="10"
                          xl="8"
                          className="mb-4"
                        >
                          <Form.Control
                            placeholder="نام کاربری / کدملی"
                            type="text"
                            dir="ltr"
                            value={username}
                            name="username"
                            className={`text-white ${
                              !usernameIsValid ? formErrors.username : ""
                            }`}
                            onChange={(e) => {
                              dispatch(RsetUsername(e.target.value));
                            }}
                          />
                        </Form.Group>
                        {/* pass */}
                        <Form.Group
                          as={Col}
                          xs="12"
                          md="12"
                          lg="10"
                          xl="8"
                          className="mb-4"
                        >
                          <div className="position-relative">
                            <Form.Control
                              className={`${
                                !passwordIsValid ? formErrors.password : ""
                              } `}
                              autocomplete="off"
                              dir="ltr"
                              id="passInput"
                              placeholder="رمزعبور"
                              type={passType}
                              value={password}
                              name="password"
                              onChange={(e) => {
                                dispatch(RsetPassword(e.target.value));
                              }}
                            />
                            {password ? (
                              <FontAwesomeIcon
                                icon={passType === "text" ? faEye : faEyeSlash}
                                className={`position-absolute cursorPointer start-0 top-0 eyeInputPass text-white`}
                                onClick={() => handlePassType()}
                              />
                            ) : null}
                          </div>
                        </Form.Group>
                        {/* forgetPass */}
                        <Form.Group
                          as={Col}
                          xs="12"
                          md="12"
                          lg="10"
                          xl="8"
                          className="mb-4 forgetPass cursorPointer"
                        >
                          <div
                            className="font12"
                            onClick={() => {
                              dispatch(RsetShowLogin(false));
                              dispatch(RsetUsername(""));
                              dispatch(RsetPassword(""));
                              dispatch(RsetFormErrors(""));
                            }}
                          >
                            فراموشی رمز عبور
                          </div>
                        </Form.Group>
                        {/* button */}
                        <Form.Group
                          as={Col}
                          xs="12"
                          md="12"
                          lg="10"
                          xl="8"
                          className="mb-4"
                        >
                          <Button
                            type="button"
                            className="btn w-100 text-white border-0 buttonDesignPrimary focus-ring py-3"
                            onClick={(e) => {
                              handleLoginFormSubmit(e);
                            }}
                          >
                            {loading ? <LoadingBtn /> : "ورود"}
                          </Button>
                        </Form.Group>
                      </Col>
                    ) : (
                      <ResetPassword />
                    )}
                  </Row>
                </Form>
              </div>
              <div className="ms-0 mt-5 w-25 d-none d-lg-flex align-items-end justify-content-end">
                <img
                  className="img-fluid align-items-end justify-content-end w-75"
                  src="../../images/logo.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
