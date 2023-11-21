import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetUserManagmentChangePasswordModal,
  selectUserManagmentChangePasswordModal,
} from "../../../slices/modalSlices";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import {
  RsetPassword,
  RsetPasswordConfirmation,
  selectPassword,
  selectPasswordConfirmation,
  selectCurrentUser,
} from "../../../slices/userManagmentSlices";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import { postNewPassword } from "../../../services/userServices";
import { errorMessage, successMessage } from "../../../utils/msg";

const UserManagmentChangePasswordModal = () => {
  const dispatch = useDispatch();
  const userManagmentChangePasswordModal = useSelector(
    selectUserManagmentChangePasswordModal
  );
  const password = useSelector(selectPassword);
  const passwordConfirmation = useSelector(selectPasswordConfirmation);
  const currentUser = useSelector(selectCurrentUser);
  const formErrors = useSelector(selectFormErrors);

  const newPasswordCharacterIsValid = password.length >= 4;
  const newPasswordIsValid = password !== "";
  const newPasswordConfirmationIsValid = passwordConfirmation === password;

  const changePasswordFormIsValid =
    newPasswordIsValid && newPasswordConfirmationIsValid && newPasswordIsValid;

  const validation = () => {
    let errors = {};
    const borderValidation = "border border-danger";
    if (!newPasswordIsValid) {
      errors.password = borderValidation;
    } else if (!newPasswordCharacterIsValid) {
      errors.passwordChar = "رمز عبور باید بیشتر از 4 کاراکتر باشد";
    } else if (!newPasswordConfirmationIsValid) {
      errors.passwordConfirmation = "تکرار رمز عبور با رمز عبور یکسان نیست!";
    }
    return errors;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const values = {
      userId: currentUser._id,
      newPassword: password,
    };

    if (changePasswordFormIsValid) {
      const postNewPasswordRes = await postNewPassword(values, token);
      console.log(postNewPasswordRes);
      if (postNewPasswordRes.data.code === 200) {
        successMessage("رمز عبور با موفقیت تغییر یافت");
        dispatch(RsetPassword(""));
        dispatch(RsetPasswordConfirmation(""));
        dispatch(RsetUserManagmentChangePasswordModal(false));
      } else {
        errorMessage("!خطا");
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            password,
            passwordConfirmation,
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
        dispatch(RsetUserManagmentChangePasswordModal(false));
        dispatch(RsetPassword(""));
        dispatch(RsetPasswordConfirmation(""));
      }}
      show={userManagmentChangePasswordModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-info text-white">
        <Modal.Title id="contained-modal-title-vcenter">
          تغییر رمز عبور
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="d-flex justify-content-center">
            <Form.Group as={Col} md="6">
              <Form.Label className="required-field">
                رمز عبور جدید:{" "}
              </Form.Label>
              <Form.Control
                className={`${!newPasswordIsValid ? formErrors.password : ""}`}
                value={password}
                type="text"
                name="newPassWord"
                onChange={(e) => {
                  dispatch(RsetPassword(e.target.value));
                }}
              />
              {!newPasswordCharacterIsValid && (
                <p className="text-danger font10 mt-1">
                  {formErrors.passwordChar}
                </p>
              )}
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label className="required-field">
                تکرار رمز عبور:{" "}
              </Form.Label>
              <Form.Control
                value={passwordConfirmation}
                type="text"
                name="repeatNewPassword"
                onChange={(e) => {
                  dispatch(RsetPasswordConfirmation(e.target.value));
                }}
              />
              {!newPasswordConfirmationIsValid && (
                <p className="text-danger font10 mt-1">
                  {formErrors.passwordConfirmation}
                </p>
              )}
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-info">
        <Row>
          <Col className="d-flex justify-content-center mt-3 ">
            <Button
              variant="success"
              className="font12 me-2"
              onClick={(e) => {
                handleChangePassword(e);
              }}
            >
              ثبت درخواست
            </Button>
            <Button
              className="font12"
              variant="danger"
              onClick={() => {
                dispatch(RsetUserManagmentChangePasswordModal(false));
                dispatch(RsetPassword(""));
                dispatch(RsetPasswordConfirmation(""));
                dispatch(RsetFormErrors(""));
              }}
            >
              انصراف
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default UserManagmentChangePasswordModal;
