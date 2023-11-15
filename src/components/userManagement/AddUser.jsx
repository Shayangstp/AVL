import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
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
} from "../../slices/userManagmentSlices";

const AddUser = () => {
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
  const phoneNumberIsValid = phoneNumber !== "";
  const gmailIsValid = gmail !== "";
  const passwordIsValid = password !== "";
  const passwordConfirmationIsValid =
    passwordConfirmation === password && passwordConfirmation !== "";
  const genderIsValid = gender !== false;

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

  const handleAddUser = (e) => {
    e.preventDefault();
    if (addUserFormIsValid) {
      console.log({
        userName,
        firstName,
        lastName,
        phoneNumber,
        gmail,
        password,
        passwordConfirmation,
        gender,
      });
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

  console.log(firstName);

  return (
    <Container fluid className="mt-4 mb-5">
      {/* <section className="lightGray2-bg p-3 shadow borderRadius-15 border border-white border-2"> */}
      {/* <div className="shadow p-4 mb-5 borderRadius-15 lightGray-bg  border border-white font16"> */}
      <div className="mb-5 mt-5">افزودن کاربر</div>
      <Form>
        {/* GPS info */}
        <div className="mb-4"> - ﺛﺒﺖ ﻧﺎﻡ</div>
        <Row>
          <div>
            <Form.Label className="me-2">جنسیت</Form.Label>
            <Form.Check
              inline
              label="زن"
              name="gender"
              type="radio"
              id="female"
              value={gender}
            />
            <Form.Check
              inline
              label="مرد"
              name="gender"
              type="radio"
              id="male"
              value={gender}
            />
            {!genderIsValid && (
              <p className="text-danger font12">{formErrors.gender}</p>
            )}
          </div>
        </Row>
        <Row className="mt-3">
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field"> نام کاربری: </Form.Label>
            <Form.Control
              className={`${!userNameIsValid ? formErrors.userName : ""}`}
              value={userName}
              type="text"
              name="userName"
              onChange={(e) => {
                dispatch(RsetUserName(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">نام: </Form.Label>
            <Form.Control
              className={`${!firstNameIsValid ? formErrors.firstName : ""}`}
              value={firstName}
              type="text"
              name="userName"
              onChange={(e) => {
                dispatch(RsetFirstName(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">نام خانوادگی: </Form.Label>
            <Form.Control
              className={`${!lastNameIsValid ? formErrors.lastName : ""}`}
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                dispatch(RsetLastName(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">
              شماره تلفن همراه:{" "}
            </Form.Label>
            <NumericFormat
              className={`form-control ${
                !phoneNumberIsValid ? formErrors.phoneNumber : ""
              }`}
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                dispatch(RsetPhoneNumber(e.target.value));
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mt-3">
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">پست الکترنیکی: </Form.Label>
            <Form.Control
              className={`${!gmailIsValid ? formErrors.gmail : ""}`}
              type="text"
              name="gmail"
              value={gmail}
              onChange={(e) => {
                dispatch(RsetGmail(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">رمز عبور: </Form.Label>
            <Form.Control
              className={`${!passwordIsValid ? formErrors.password : ""}`}
              type="text"
              name="password"
              value={password}
              onChange={(e) => {
                dispatch(RsetPassword(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">تکرار رمز عبور: </Form.Label>
            <Form.Control
              className={`${
                !passwordConfirmationIsValid
                  ? formErrors.passwordConfirmation
                  : ""
              }`}
              type="text"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => {
                dispatch(RsetPasswordConfirmation(e.target.value));
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mt-3">
          <Col md="5" xl="4" className="mx-auto d-flex mt-5">
            <Button
              variant="success"
              className="mb-3 me-5 px-4"
              onClick={(e) => {
                handleAddUser(e);
              }}
            >
              ثبت درخواست
            </Button>
            <Button
              variant="secondary"
              type="reset"
              className="mb-3 px-5 py-2"
              onClick={() => {
                dispatch(RsetUserName(""));
                dispatch(RsetFirstName(""));
                dispatch(RsetLastName(""));
                dispatch(RsetPhoneNumber(""));
                dispatch(RsetGmail(""));
                dispatch(RsetPassword(""));
                dispatch(RsetPasswordConfirmation(""));
                dispatch(RsetFormErrors(""));
                dispatch(RsetGender(false));
              }}
            >
              انصراف
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddUser;
