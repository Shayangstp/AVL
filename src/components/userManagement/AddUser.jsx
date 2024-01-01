import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { RsetFormErrors, selectFormErrors } from "../../slices/mainSlices";
import {
  RsetUserName,
  selectUserName,
  RsetFirstName,
  selectFirstName,
  RsetLastName,
  selectLastName,
  RsetPhoneNumber,
  selectPhoneNumber,
  RsetGmail,
  selectGmail,
  RsetPassword,
  selectPassword,
  RsetPasswordConfirmation,
  selectPasswordConfirmation,
  RsetGender,
  selectGender,
  handleAddUser,
  handleResetAddUser,
} from "../../slices/userManagmentSlices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";

const AddUser = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const phoneNumber = useSelector(selectPhoneNumber);
  const gmail = useSelector(selectGmail);
  const password = useSelector(selectPassword);
  const passwordConfirmation = useSelector(selectPasswordConfirmation);
  const gender = useSelector(selectGender);
  const formErrors = useSelector(selectFormErrors);

  const userNameIsValid = userName !== "";
  const firstNameIsValid = firstName !== "";
  const lastNameIsValid = lastName !== "";
  const passwordIsValid = password !== "";
  const passwordConfirmationIsValid =
    passwordConfirmation === password && passwordConfirmation !== "";
  const genderIsValid = gender !== "";
  const phoneNumberIsValid =
    /^0\d{10}$/.test(phoneNumber) && phoneNumber !== "";
  const gmailIsValid =
    /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/.test(gmail) && gmail !== "";

  useEffect(() => {
    dispatch(handleResetAddUser());
  }, []);

  const addUserFormIsValid =
    userNameIsValid &&
    firstNameIsValid &&
    lastNameIsValid &&
    phoneNumberIsValid &&
    gmailIsValid &&
    passwordIsValid &&
    passwordConfirmationIsValid &&
    genderIsValid;

  const validation = () => {
    var errors = {};
    const borderValidation = "border border-danger";

    if (!userNameIsValid) {
      errors.userName = borderValidation;
    }
    if (!firstNameIsValid) {
      errors.firstName = borderValidation;
    }
    if (!lastNameIsValid) {
      errors.lastName = borderValidation;
    }
    if (!phoneNumberIsValid) {
      errors.phoneNumber = borderValidation;
    }
    if (!gmailIsValid) {
      errors.gmail = borderValidation;
    }
    if (!passwordIsValid) {
      errors.password = borderValidation;
    }
    if (!passwordConfirmationIsValid) {
      errors.passwordConfirmation = borderValidation;
    }
    if (!genderIsValid) {
      errors.gender = "لطفا جنسیت را انتخاب کنید!";
    }

    return errors;
  };

  const handleAdduserFormSubmit = (e) => {
    if (addUserFormIsValid) {
      dispatch(handleAddUser(e));
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            userName,
            firstName,
            lastName,
            phoneNumber,
            gmail,
            password,
            passwordConfirmation,
            gender,
          })
        )
      );
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Form>
        <Row className="bg-white borderRadius-15 shadow p-0">
          <div className="deviceHeader p-3 borderRadius-top">
            <span className="me-2">
              <FontAwesomeIcon icon={faUser} />
            </span>
            افزودن کاربر
          </div>
          <Row className="px-4 mt-4">
            <Form.Group as={Col} md="3" id="gender">
              <Form.Label className="me-2 required-field">جنسیت: </Form.Label>
              <Form.Check
                inline
                label="زن"
                name="gender"
                type="radio"
                id="Female"
                value={gender}
                checked={gender === "Female"}
                onChange={(e) => {
                  dispatch(RsetGender("Female"));
                }}
              />
              <Form.Check
                inline
                label="مرد"
                name="gender"
                type="radio"
                id="Male"
                value={gender}
                checked={gender === "Male"}
                onChange={(e) => {
                  dispatch(RsetGender("Male"));
                }}
              />
              {!genderIsValid && (
                <p className="text-danger font12">{formErrors.gender}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="p-4">
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field"> نام کاربری: </Form.Label>
              <Form.Control
                className={`${
                  !userNameIsValid ? formErrors.userName : ""
                } borderRadius-15`}
                value={userName}
                type="text"
                name="userName"
                onChange={(e) => {
                  dispatch(RsetUserName(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">نام: </Form.Label>
              <Form.Control
                className={`${
                  !firstNameIsValid ? formErrors.firstName : ""
                } borderRadius-15`}
                value={firstName}
                type="text"
                name="userName"
                onChange={(e) => {
                  dispatch(RsetFirstName(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">نام خانوادگی: </Form.Label>
              <Form.Control
                className={`${
                  !lastNameIsValid ? formErrors.lastName : ""
                } borderRadius-15`}
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  dispatch(RsetLastName(e.target.value));
                }}
              />
            </Form.Group>
          </Row>
          <Row className="px-4">
            <Form.Group as={Col} md="3">
              <Form.Label className="required-field">
                شماره تلفن همراه:{" "}
              </Form.Label>
              <NumericFormat
                className={`form-control ${
                  !phoneNumberIsValid ? formErrors.phoneNumber : ""
                } borderRadius-15 `}
                type="text"
                maxLength={11}
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  dispatch(RsetPhoneNumber(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label className="required-field">
                پست الکترنیکی:{" "}
              </Form.Label>
              <Form.Control
                className={`${
                  !gmailIsValid ? formErrors.gmail : ""
                } borderRadius-15`}
                type="text"
                name="gmail"
                value={gmail}
                onChange={(e) => {
                  dispatch(RsetGmail(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" className="position-relative">
              <Form.Label className="required-field">رمز عبور: </Form.Label>
              <Form.Control
                className={`${
                  !passwordIsValid ? formErrors.password : ""
                } borderRadius-15`}
                type={showPass ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => {
                  dispatch(RsetPassword(e.target.value));
                }}
              />
              <FontAwesomeIcon
                icon={showPass ? faEye : faEyeSlash}
                className="position-absolute top-50 end-0 mt-2 me-4 text-secondary font10"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3" className="position-relative">
              <Form.Label className="required-field">
                تکرار رمز عبور:{" "}
              </Form.Label>
              <Form.Control
                className={`${
                  !passwordConfirmationIsValid
                    ? formErrors.passwordConfirmation
                    : ""
                } borderRadius-15`}
                type={showPassConfirm ? "text" : "password"}
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => {
                  dispatch(RsetPasswordConfirmation(e.target.value));
                }}
              />
              <FontAwesomeIcon
                icon={showPassConfirm ? faEye : faEyeSlash}
                className="position-absolute  end-0 me-4 text-secondary font10"
                style={{ top: "40px" }}
                onClick={() => {
                  setShowPassConfirm(!showPassConfirm);
                }}
              />
            </Form.Group>
          </Row>
          <div className="px-5 mt-5">
            <hr />
          </div>
          <Row className="px-4 mt-3">
            <Form.Group
              as={Col}
              md="12"
              className=" mt-4 d-flex justify-content-center"
            >
              <Button
                variant="success"
                size="sm"
                className="mb-3 me-5 px-4"
                onClick={(e) => {
                  handleAdduserFormSubmit(e);
                }}
              >
                ثبت درخواست
              </Button>
              <Button
                variant="secondary"
                type="reset"
                size="sm"
                className="mb-3 px-4"
                onClick={() => {
                  handleResetAddUser();
                }}
              >
                انصراف
              </Button>
            </Form.Group>
          </Row>
        </Row>
      </Form>
    </Container>
  );
};

export default AddUser;
