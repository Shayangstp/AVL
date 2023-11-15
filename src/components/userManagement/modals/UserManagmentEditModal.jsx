import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetUserManagmentEditModal,
  selectUserManagmentEditModal,
} from "../../../slices/modalSlices";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
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
  RsetGender,
  selectGender,
  selectCurrentUser,
} from "../../../slices/userManagmentSlices";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import { NumericFormat } from "react-number-format";
import { useEffect } from "react";

const UserManagmentEditModal = () => {
  const dispatch = useDispatch();
  const userManagmentEditModal = useSelector(selectUserManagmentEditModal);
  const userName = useSelector(selectUserName);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const phoneNumber = useSelector(selectPhoneNumber);
  const gmail = useSelector(selectGmail);
  const gender = useSelector(selectGender);
  const formErrors = useSelector(selectFormErrors);
  const currentUser = useSelector(selectCurrentUser);

  const userNameIsValid = userName !== "";
  const firstNameIsValid = firstName !== "";
  const lastNameIsValid = lastName !== "";
  const phoneNumberIsValid = phoneNumber !== "";
  const gmailIsValid = gmail !== "";
  const genderIsValid = gender !== false;

  const updateUserFormIsValid =
    userNameIsValid &&
    firstNameIsValid &&
    lastNameIsValid &&
    phoneNumberIsValid &&
    gmailIsValid &&
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
    if (!genderIsValid) {
      errors.gender = "لطفا جنسیت را انتخاب کنید!";
    }

    return errors;
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (updateUserFormIsValid) {
      console.log({
        userName,
        firstName,
        lastName,
        phoneNumber,
        gmail,
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
            gender,
          })
        )
      );
    }
  };

  useEffect(() => {
    dispatch(RsetUserName(currentUser.username));
    dispatch(RsetFirstName(currentUser.username));
    dispatch(RsetLastName(currentUser.username));
    dispatch(RsetPhoneNumber(currentUser.mobileNumber));
    dispatch(RsetGmail(currentUser.email));
    dispatch(RsetGender(currentUser.gender));
  }, []);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetUserManagmentEditModal(false));
        dispatch(RsetUserName(""));
        dispatch(RsetFirstName(""));
        dispatch(RsetLastName(""));
        dispatch(RsetPhoneNumber(""));
        dispatch(RsetGmail(""));
        dispatch(RsetFormErrors(""));
        dispatch(RsetGender(""));
      }}
      show={userManagmentEditModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-warning text-dark">
        <Modal.Title id="contained-modal-title-vcenter">ویرایش</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
                checked={gender === "female"}
                onChange={(e) => {
                  
                }}
              />
              <Form.Check
                inline
                label="مرد"
                name="gender"
                type="radio"
                id="male"
                value={gender}
                checked={gender === "male"}
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
              <Form.Label className="required-field">
                پست الکترنیکی:{" "}
              </Form.Label>
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
          </Row>
          <Row className="mt-3">
            <Col md="5" xl="4" className="mx-auto d-flex mt-5">
              <Button
                variant="success"
                className="mb-3 me-5 px-4"
                onClick={(e) => {
                  handleUpdateUser(e);
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
                  dispatch(RsetFormErrors(""));
                  dispatch(RsetGender(false));
                }}
              >
                انصراف
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-warning">
        <Button
          variant="danger"
          onClick={() => {
            dispatch(RsetUserManagmentEditModal(false));
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserManagmentEditModal;
