import React, { useEffect } from "react";
import { Container, Row, Col, Button, Tabs, Tab, Form } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetFirstName,
  RsetLastName,
  RsetPhoneNumber,
  RsetGmail,
  selectFirstName,
  selectLastName,
  selectPhoneNumber,
  selectGmail,
  handleAddPhoneNumber,
  handleResetAddPhoneNumber,
} from "../../slices/userManagmentSlices";
import { RsetFormErrors, selectFormErrors } from "../../slices/mainSlices";

const AddPhoneNumbers = () => {
  const dispatch = useDispatch();
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const phoneNumber = useSelector(selectPhoneNumber);
  const gmail = useSelector(selectGmail);
  const formErrors = useSelector(selectFormErrors);

  const firstNameIsValid = firstName !== "";
  const lastNameIsValid = lastName !== "";
  const phoneNumberIsValid =
    /^0\d{10}$/.test(phoneNumber) && phoneNumber !== "";
  const gmailIsValid =
    /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/.test(gmail) && gmail !== "";

  const addPhoneNumberFormIsValid =
    firstNameIsValid && lastNameIsValid && phoneNumberIsValid && gmailIsValid;

  const validation = () => {
    let errors = {};
    const borderValidation = "border border-danger";

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
    return errors;
  };

  const handleAddPhoneNumberSubmit = (e) => {
    e.preventDefault();
    if (addPhoneNumberFormIsValid) {
      dispatch(handleAddPhoneNumber(e));
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            firstName,
            lastName,
            phoneNumber,
            gmail,
          })
        )
      );
    }
  };

  return (
    <Container fluid className="mt-4 mb-5">
      <div className="mb-5 mt-5">افزودن </div>
      <Form>
        <div className="mb-4">-اطلاعات را وارد کنید</div>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">نام: </Form.Label>
            <Form.Control
              className={`${
                !firstNameIsValid ? `${formErrors.firstName} ` : ""
              }`}
              type="text"
              name="deviceImei"
              value={firstName}
              onChange={(e) => {
                dispatch(RsetFirstName(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">نام خانوادگی: </Form.Label>
            <Form.Control
              className={`${
                !lastNameIsValid ? `${formErrors.lastName} borderRaduis-15` : ""
              }`}
              type="text"
              name="deviceImei"
              value={lastName}
              onChange={(e) => {
                dispatch(RsetLastName(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">شماره تلفن: </Form.Label>
            <NumericFormat
              className={`form-control ${
                !phoneNumberIsValid ? formErrors.phoneNumber : ""
              }
              `}
              type="text"
              name="deviceNumber"
              maxLength={11}
              value={phoneNumber}
              onChange={(e) => {
                dispatch(RsetPhoneNumber(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">پست الکترونیکی :</Form.Label>
            <Form.Control
              className={`${
                !gmailIsValid ? `${formErrors.gmail} borderRaduis-15` : ""
              }`}
              type="text"
              name="deviceImei"
              value={gmail}
              onChange={(e) => {
                dispatch(RsetGmail(e.target.value));
              }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col md="5" xl="4" className="mx-auto d-flex mt-5">
            <Button
              variant="success"
              className="mb-3 me-5 px-4"
              onClick={(e) => {
                handleAddPhoneNumberSubmit(e);
              }}
            >
              ثبت درخواست
            </Button>
            <Button
              variant="secondary"
              type="reset"
              className="mb-3 px-5 py-2"
              onClick={() => {
                dispatch(handleResetAddPhoneNumber());
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

export default AddPhoneNumbers;
