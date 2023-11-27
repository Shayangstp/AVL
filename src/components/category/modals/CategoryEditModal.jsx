import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetCategoryEditModal,
  selectCategoryEditModal,
} from "../../../slices/modalSlices";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Select from "react-select";
import {
  selectCategoryCurrentRequest,
  RsetCategoryGroupName,
  selectCategoryGroupName,
  RsetCategoryGroupDescription,
  selectCategoryGroupDescription,
  RsetCategoryGroupColorOptions,
  selectCategoryGroupColorOptions,
  RsetCategoryGroupColor,
  selectCategoryGroupColor,
} from "../../../slices/categorySlices";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";

const colorOptions = [
  {
    label: "قرمز",
    value: 1,
  },
  {
    label: "زرد",
    value: 2,
  },
  {
    label: "آبی روشن",
    value: 3,
  },
  {
    label: "آبی تیره",
    value: 4,
  },
  {
    label: "سبزه روشن",
    value: 5,
  },
  {
    label: "سبزه تیره",
    value: 6,
  },
  {
    label: "نارنجی",
    value: 7,
  },
  {
    label: "قهوه ای",
    value: 8,
  },
  {
    label: "صورتی",
    value: 9,
  },
  {
    label: "بنفش",
    value: 10,
  },
  {
    label: "سبزآبی",
    value: 11,
  },
  {
    label: "سرخابی",
    value: 12,
  },
  {
    label: "یاسی",
    value: 13,
  },
];

const CategoryEditModal = () => {
  const dispatch = useDispatch();
  const categoryEditModal = useSelector(selectCategoryEditModal);
  const categoryGroupName = useSelector(selectCategoryGroupName);
  const categoryGroupDescription = useSelector(selectCategoryGroupDescription);
  const categoryGroupColorOptions = useSelector(
    selectCategoryGroupColorOptions
  );
  const categoryGroupColor = useSelector(selectCategoryGroupColor);
  const formErrors = useSelector(selectFormErrors);
  const categoryCurrentRequest = useSelector(selectCategoryCurrentRequest);

  const categoryGroupNameisValid = categoryGroupName !== "";
  const categoryGroupDescriptionisValid = categoryGroupDescription !== "";
  const categoryGroupColorisValid = categoryGroupColor.length !== 0;

  const categoryFormIsValid =
    categoryGroupNameisValid &&
    categoryGroupDescriptionisValid &&
    categoryGroupDescriptionisValid;

  const validation = () => {
    let errors = {};
    const borderValidation = "border border-danger";
    if (!categoryGroupNameisValid) {
      errors.categoryGroupName = borderValidation;
    }
    if (!categoryGroupDescriptionisValid) {
      errors.categoryGroupDescription = borderValidation;
    }
    if (!categoryGroupNameisValid) {
      errors.categoryGroupColorisValid = borderValidation;
    }
    return errors;
  };

  useEffect(() => {
    dispatch(RsetCategoryGroupColorOptions(colorOptions));
    dispatch(RsetCategoryGroupName(categoryCurrentRequest.groupName));
    dispatch(RsetCategoryGroupDescription(categoryCurrentRequest.description));
    dispatch(
      RsetCategoryGroupColor([
        {
          label: categoryCurrentRequest.color.label,
          value: categoryCurrentRequest.color.value,
        },
      ])
    );
  }, []);

  console.log(categoryCurrentRequest.groupName);

  const categoryEditFormSubmit = (e) => {
    e.preventDefault();
    if (categoryFormIsValid) {
      console.log({
        categoryGroupName,
        categoryGroupDescription,
        categoryGroupColor,
      });
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            categoryGroupName,
            categoryGroupDescription,
            categoryGroupColor,
          })
        )
      );
    }
  };

  const categoryEditFormReset = () => {
    dispatch(RsetCategoryGroupName(""));
    dispatch(RsetCategoryGroupDescription(""));
    dispatch(RsetCategoryGroupColor(""));
    dispatch(RsetFormErrors({}));
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetCategoryEditModal(false));
      }}
      show={categoryEditModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-primary text-white ">
        <Modal.Title id="contained-modal-title-vcenter">ویرایش</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>نام گروه : </Form.Label>
              <Form.Control
                // className={`${!userNameIsValid ? formErrors.userName : ""}`}
                value={categoryGroupName}
                type="text"
                name="groupName"
                onChange={(e) => {
                  dispatch(RsetCategoryGroupName(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>توضیحات : </Form.Label>
              <Form.Control
                // className={`${!userNameIsValid ? formErrors.userName : ""}`}
                value={categoryGroupDescription}
                type="text"
                name="groupName"
                onChange={(e) => {
                  dispatch(RsetCategoryGroupDescription(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">رنگ:</Form.Label>
              <Select
                // className={`${!deviceTypeIsValid ? formErrors.deviceType : ""}`}
                value={categoryGroupColor}
                name="deviceType"
                onChange={(e) => {
                  dispatch(RsetCategoryGroupColor(e));
                }}
                placeholder="انتخاب..."
                options={categoryGroupColorOptions}
                isSearchable={true}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-primary">
        <Button
          variant="success"
          onClick={(e) => {
            categoryEditFormSubmit(e);
          }}
        >
          ذخیره
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            dispatch(RsetCategoryEditModal(false));
            categoryEditFormReset();
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryEditModal;
