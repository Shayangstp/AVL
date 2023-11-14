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
  selectGamil,
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
  const gmail = useSelector(selectGamil);
  const password = useSelector(selectPassword);
  const passwordConfirmation = useSelector(selectPasswordConfirmation);
  const gender = useSelector(selectGender);


  const 

  const validation = () => {
    var errors = {};
    const borderValidation = "border border-danger";

    // if (!deviceNumberIsValid) {
    //   errors.deviceNumber = borderValidation;
    // }

    return errors;
  };

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
          </div>
        </Row>
        <Row className="mt-3">
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field"> نام کاربری: </Form.Label>
            <Form.Control
              // className={`${
              //   !vehicleNumberIsValid ? formErrors.vehicleNumber : ""
              // }`}
              value={userName}
              type="text"
              name="userName"
              // value={vehicleNumber}
              onChange={(e) => {
                dispatch(RsetUserName(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">نام: </Form.Label>
            <Form.Control
              // className={`${
              //   !vehicleNumberIsValid ? formErrors.vehicleNumber : ""
              // }`}
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                dispatch(RsetFirstName(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">نام خانوادگی: </Form.Label>
            <Form.Control
              // className={`${
              //   !vehicleNumberIsValid ? formErrors.vehicleNumber : ""
              // }`}
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
              className={`form-control`}
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
              // className={`${
              //   !vehicleNumberIsValid ? formErrors.vehicleNumber : ""
              // }`}
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
              // className={`${
              //   !vehicleNumberIsValid ? formErrors.vehicleNumber : ""
              // }`}
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
              // className={`${
              //   !vehicleNumberIsValid ? formErrors.vehicleNumber : ""
              // }`}
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
              // onClick={(e) => {
              //   handleDeviceAdd(e);
              // }}
            >
              ثبت درخواست
            </Button>
            <Button
              variant="secondary"
              type="reset"
              className="mb-3 px-5 py-2"
              // onClick={() => {
              //   handleResetAddDeviceForm();
              // }}
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
