import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import {
  RsetCategoryCommonUserModal,
  selectCategoryCommonUserModal,
} from "../../../slices/modalSlices";
import CommonUserList from "./commonUser/CommonUserList";
import {
  selectCategoryCommonUser,
  RsetCategoryCommonUser,
  selectCategoryCommonUserOptions,
  RsetCategoryCommonUserOptions,
} from "../../../slices/categorySlices";
import { handleCommonUserList } from "../../../slices/mainSlices";

const CategoryCommonUserModal = () => {
  const dispatch = useDispatch();
  const categoryCommonUserModal = useSelector(selectCategoryCommonUserModal);
  const categoryCommonUser = useSelector(selectCategoryCommonUser);
  //this should be fill by api
  const categoryCommonUserOptions = useSelector(
    selectCategoryCommonUserOptions
  );
  const formErrors = useSelector(selectFormErrors);

  const categoryCommonUserisValid = categoryCommonUser.length !== 0;

  const validation = () => {
    let errors = {};
    const borderValidation = "border border-danger";
    if (!categoryCommonUserisValid) {
      errors.categoryCommonUser = borderValidation;
    }
    return errors;
  };

  useEffect(() => {
    dispatch(handleCommonUserList());
  }, []);

  const handleCommonUserModal = (e) => {
    e.preventDefault();
    if (categoryCommonUserisValid) {
      console.log({
        categoryCommonUser,
      });
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            categoryCommonUser,
          })
        )
      );
    }
  };

  const handleResetCommonUserForm = () => {
    dispatch(RsetFormErrors(""));
    dispatch(RsetCategoryCommonUser(""));
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetCategoryCommonUserModal(false));
        handleResetCommonUserForm();
      }}
      show={categoryCommonUserModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-info text-white ">
        <Modal.Title id="contained-modal-title-vcenter">
          کاربرهای مشترک
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <CommonUserList />
          </Row>
          <Row>
            <Form.Group as={Col} md="10">
              <Form.Label className="required-field">
                افزودن کاربر :{" "}
              </Form.Label>
              <Select
                className={`${
                  !categoryCommonUserisValid
                    ? formErrors.categoryCommonUser
                    : ""
                }`}
                value={categoryCommonUser}
                name="commonUserAdd"
                onChange={(e) => {
                  dispatch(RsetCategoryCommonUser(e));
                }}
                placeholder="انتخاب..."
                options={categoryCommonUserOptions}
                isSearchable={true}
              />
            </Form.Group>
            <Form.Group as={Col} md="2" className="mt-4">
              <Button
                variant="primary"
                className="mt-2 font12"
                onClick={(e) => {
                  handleCommonUserModal(e);
                }}
              >
                افزودن
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-info">
        <Button
          variant="danger"
          onClick={() => {
            dispatch(RsetCategoryCommonUserModal(false));
            handleResetCommonUserForm();
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryCommonUserModal;
