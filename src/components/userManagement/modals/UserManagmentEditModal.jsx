import React, { useState } from "react";
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
  RsetCurrentUser,
} from "../../../slices/userManagmentSlices";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import { NumericFormat } from "react-number-format";
import { useEffect } from "react";
import { putEditUser } from "../../../services/userServices";
import { errorMessage, successMessage } from "../../../utils/msg";
import { useNavigate } from "react-router";
import { handleVehicleTypeOptions } from "../../../slices/deviceSlices";

const UserManagmentEditModal = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  useEffect(() => {
    dispatch(handleVehicleTypeOptions());
  }, []);

  useEffect(() => {
    dispatch(RsetUserName(currentUser.username));
    dispatch(RsetFirstName(currentUser.firstname));
    dispatch(RsetLastName(currentUser.lastname));
    dispatch(RsetPhoneNumber(currentUser.mobileNumber));
    dispatch(RsetGmail(currentUser.email));
    dispatch(RsetGender(currentUser.gender));
    dispatch(RsetCurrentUser(currentUser));
  }, [currentUser]);

  useEffect(() => {
    setUserData({ ...currentUser });
  }, [currentUser]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (updateUserFormIsValid) {
      const values = {
        userId: currentUser._id,
        username: userName,
        firstname: firstName,
        lastname: lastName,
        gender: gender,
        email: gmail,
        mobileNumber: phoneNumber,
      };
      const putEditUserRes = await putEditUser(values, token);
      if (putEditUserRes.data.code === "200") {
        successMessage("مشخصات کاربر با موفقیت تغییر کرد");
        dispatch(RsetUserManagmentEditModal(false));
        dispatch(RsetCurrentUser(""));
      } else {
        errorMessage("خطا");
      }
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
                checked={userData.gender === "Female"}
                onChange={(e) => {
                  const newGender = e.target.checked ? "Female" : "";
                  setUserData({ ...currentUser, gender: newGender });
                  dispatch(RsetGender("female"));
                }}
              />
              <Form.Check
                inline
                label="مرد"
                name="gender"
                type="radio"
                id="male"
                checked={userData.gender === "Male"}
                onChange={(e) => {
                  const newGender = e.target.checked ? "Male" : "";
                  setUserData({ ...currentUser, gender: newGender });
                  dispatch(RsetGender("male"));
                }}
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
            <Col
              md="5"
              xl="4"
              className="mx-auto d-flex mt-5 w-100 justify-content-center"
            >
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
