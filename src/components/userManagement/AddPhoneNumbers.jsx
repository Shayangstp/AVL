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
import { faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <Form>
        <Row className="bg-white borderRadius-15 shadow p-0">
          <div className="deviceHeader p-3 borderRadius-top">
            <span className="me-2">
              <FontAwesomeIcon icon={faPhone} />
            </span>
            افزودن شماره تلفن
          </div>
          <Row className="mt-5 px-4">
            <Form.Group as={Col} md="3">
              <Form.Label className="required-field">نام: </Form.Label>
              <Form.Control
                className={`${
                  !firstNameIsValid ? `${formErrors.firstName} ` : ""
                } borderRadius-15`}
                type="text"
                name="deviceImei"
                value={firstName}
                onChange={(e) => {
                  dispatch(RsetFirstName(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label className="required-field">نام خانوادگی: </Form.Label>
              <Form.Control
                className={`${
                  !lastNameIsValid
                    ? `${formErrors.lastName} borderRaduis-15`
                    : ""
                }  borderRadius-15`}
                type="text"
                name="deviceImei"
                value={lastName}
                onChange={(e) => {
                  dispatch(RsetLastName(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label className="required-field">شماره تلفن: </Form.Label>
              <NumericFormat
                className={`form-control ${
                  !phoneNumberIsValid ? formErrors.phoneNumber : ""
                }
                borderRadius-15`}
                type="text"
                name="deviceNumber"
                maxLength={11}
                value={phoneNumber}
                onChange={(e) => {
                  dispatch(RsetPhoneNumber(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label className="required-field">
                پست الکترونیکی :
              </Form.Label>
              <Form.Control
                className={`${
                  !gmailIsValid ? `${formErrors.gmail} ` : ""
                }  borderRadius-15`}
                type="text"
                name="deviceImei"
                value={gmail}
                onChange={(e) => {
                  dispatch(RsetGmail(e.target.value));
                }}
              />
            </Form.Group>
            <div className="px-5 mt-5">
              <hr />
            </div>
            <Form.Group
              md="5"
              xl="4"
              className="d-flex justify-content-center mt-5 mb-3"
            >
              <Button
                variant="success"
                size="sm"
                className="mb-3 me-5 px-3"
                onClick={(e) => {
                  handleAddPhoneNumberSubmit(e);
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
                  dispatch(handleResetAddPhoneNumber());
                }}
              >
                انصراف
              </Button>
            </Form.Group>
          </Row>
        </Row>
        <Row></Row>
      </Form>
    </Container>
  );
};

export default AddPhoneNumbers;
