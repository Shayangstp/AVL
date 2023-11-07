import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RsetForgetPassUsername, RsetShowLogin } from "../../slices/authSlices";
import {
  selectForgetPassUsername,
  handleForgetPassword,
  selectForgetPassUsernameIsValid,
} from "../../slices/authSlices";
import {
  RsetFormErrors,
  selectFormErrors,
  selectLoading,
} from "../../slices/mainSlices";
import { useNavigate } from "react-router-dom";
import LoadingBtn from "../common/LoadingBtn";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //select
  const forgetPassUsername = useSelector(selectForgetPassUsername);
  const formErrors = useSelector(selectFormErrors);
  const loading = useSelector(selectLoading);
  const forgetPassUsernameIsValid = useSelector(
    selectForgetPassUsernameIsValid
  );

  //validation

  const forgetPassUsernameInputIsValid = forgetPassUsername !== "";
  const validation = () => {
    let errors = {};

    if (!forgetPassUsernameInputIsValid) {
      errors.forgetPassUsername = "border border-danger";
    }
    return errors;
  };

  const handleForgetPass = async (e) => {
    if (forgetPassUsernameInputIsValid) {
      dispatch(handleForgetPassword(e));
      //refresh the page
      if (forgetPassUsernameIsValid) {
        setTimeout(function () {
          navigate(0);
        }, 5000);
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            forgetPassUsername,
          })
        )
      );
    }
  };

  return (
    <Form
      className="inputDesignPrimary w-100"
      onKeyDown={(e) => {
        console.log(e.keyCode === 13);
        if (e.keyCode === 13 || e.which === 13) {
          handleForgetPass(e);
        }
      }}
    >
      <Col
        md="12"
        className="mb-5 mx-auto ms-md-5 d-flex flex-column w-75 justify-content-center align-items-center"
      >
        <img
          className="img-fluid mb-5 invert w75 mx-auto"
          src="../../images/avlLogo.png"
        />
        <div className="text-white text-center mb-5">
          برای بازیابی رمز عبور لطفا ایمیل خود را وارد کنید
        </div>
        <Form.Group
          as={Col}
          xs="12"
          md="12"
          lg="10"
          xl="8"
          className="mb-4 position-relative"
        >
          <Form.Control
            type="text"
            id="passInput"
            autoComplete="new-password"
            value={forgetPassUsername}
            name="email"
            onChange={(e) => {
              dispatch(RsetForgetPassUsername(e.target.value));
            }}
            placeholder="نام کاربری"
            className={`text-white ${
              !forgetPassUsernameInputIsValid
                ? formErrors.forgetPassUsername
                : ""
            }`}
          />
        </Form.Group>
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
              dispatch(RsetShowLogin(true));
            }}
          >
            ورود
          </div>
        </Form.Group>
        <Form.Group
          as={Col}
          xs="12"
          md="12"
          lg="10"
          xl="8"
          className="mb-4 forgetPass cursorPointer"
        >
          <Button
            type="button"
            className="btn w-100 font12 text-white border-0 buttonDesignPrimary focus-ring py-3"
            onClick={(e) => {
              handleForgetPass(e);
            }}
          >
            {loading ? <LoadingBtn /> : "بازیابی رمز عبور"}
          </Button>
        </Form.Group>
      </Col>
    </Form>
  );
};

export default ResetPassword;
