import React from "react";
import {
  RsetCategoryName,
  selectCategoryName,
  RsetCategoryGroupDescription,
  selectCategoryGroupDescription,
} from "../../../slices/categorySlices";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import {
  RsetCategoryAddModal,
  selectCategoryAddModal,
} from "../../../slices/modalSlices";

const CategoryAddModal = () => {
  const dispatch = useDispatch();
  const categoryName = useSelector(selectCategoryName);
  const categoryGroupDescription = useSelector(selectCategoryGroupDescription);
  const formErrors = useSelector(selectFormErrors);
  const categoryAddModal = useSelector(selectCategoryAddModal);

  const categoryNameIsValid = categoryName !== "";
  const categoryGroupDescriptionIsValid = categoryGroupDescription !== "";

  const categoryAddFormIsValid =
    categoryNameIsValid && categoryGroupDescriptionIsValid;

  const validation = () => {
    let errors = {};
    const borderValidation = "border border-danger";
    if (!categoryNameIsValid) {
      errors.categoryName = borderValidation;
    }
    if (!categoryGroupDescriptionIsValid) {
      errors.categoryGroupDescription = borderValidation;
    }
    return errors;
  };

  const handleCategoryAdd = (e) => {
    e.preventDefault();
    if (categoryAddFormIsValid) {
      console.log({
        categoryName,
        categoryGroupDescription,
      });
      dispatch(RsetCategoryName(""));
      dispatch(RsetCategoryGroupDescription(""));
      dispatch(RsetCategoryAddModal(false));
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            categoryName,
            categoryGroupDescription,
          })
        )
      );
    }
  };

  const handleResetCategoryAdd = () => {
    dispatch(RsetCategoryName(""));
    dispatch(RsetCategoryGroupDescription(""));
    dispatch(RsetFormErrors(""));
    dispatch(RsetCategoryAddModal(false));
  };

  return (
    <Modal
      size="md"
      centered
      onHide={() => {
        dispatch(RsetCategoryAddModal(false));
      }}
      aria-labelledby="contained-modal-title-vcenter"
      show={categoryAddModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-success text-white">
        <Modal.Title id="contained-modal-title-vcenter">
          افزودن گروه
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label className="required-field">نام گروه : </Form.Label>
              <Form.Control
                className={`${
                  !categoryNameIsValid ? formErrors.categoryName : ""
                }`}
                type="text"
                id="groupName"
                value={categoryName}
                onChange={(e) => dispatch(RsetCategoryName(e.target.value))}
              />
            </Form.Group>
            <Form.Group as={Col} md="12" className="mt-2">
              <Form.Label className="required-field">توضیحات : </Form.Label>
              <Form.Control
                as="textarea"
                className={`${
                  !categoryGroupDescriptionIsValid
                    ? formErrors.categoryGroupDescription
                    : ""
                }`}
                rows={3}
                maxLength={2000}
                name="categoryGroupDescription"
                value={categoryGroupDescription}
                onChange={(e) => {
                  dispatch(RsetCategoryGroupDescription(e.target.value));
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-success text-white">
        <Button
          variant="primary"
          onClick={(e) => {
            handleCategoryAdd(e);
          }}
        >
          ذخیره
        </Button>
        <Button variant="danger" onClick={() => handleResetCategoryAdd()}>
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryAddModal;
