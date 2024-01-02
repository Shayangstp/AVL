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
  RsetCategoryCurrentRequest,
} from "../../../slices/categorySlices";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import { putCategoryEdit } from "../../../services/categoryServices";
import { errorMessage, successMessage } from "../../../utils/msg";
import { useNavigate } from "react-router";

const colorOptions = [
  {
    label: "قرمز",
    value: "red",
  },
  {
    label: "زرد",
    value: "yellow",
  },
  {
    label: "آبی ",
    value: "blue",
  },

  {
    label: "سبزه",
    value: "green",
  },
  {
    label: "نارنجی",
    value: "orange",
  },
];

const CategoryEditModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(RsetCategoryGroupName(categoryCurrentRequest.name));
    dispatch(RsetCategoryGroupDescription(categoryCurrentRequest.desc));

    switch (categoryCurrentRequest.color) {
      case "orange":
        dispatch(
          RsetCategoryGroupColor([
            {
              label: "نارنجی",
              value: "orange",
            },
          ])
        );
        break;
      case "blue":
        dispatch(
          RsetCategoryGroupColor([
            {
              label: "آبی",
              value: 2,
            },
          ])
        );
        break;
      case "yellow":
        dispatch(
          RsetCategoryGroupColor([
            {
              label: "زرد",
              value: "yellow",
            },
          ])
        );
        break;
      case "green":
        dispatch(
          RsetCategoryGroupColor([
            {
              label: "سبز",
              value: "green",
            },
          ])
        );
        break;
      case "red":
        dispatch(
          RsetCategoryGroupColor([
            {
              label: "قرمز",
              value: "red",
            },
          ])
        );
        break;

      default:
        console.log("color is not defined");
        break;
    }
  }, []);

  const categoryEditFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (categoryFormIsValid) {
      console.log({
        categoryGroupName,
        categoryGroupDescription,
        categoryGroupColor,
      });
      const values = {
        groupId: categoryCurrentRequest._id,
        name: categoryGroupName,
        desc: categoryGroupDescription,
        color: categoryGroupColor.value,
      };
      console.log(values);
      const putCategoryEditRes = await putCategoryEdit(values, token);
      console.log(putCategoryEditRes);
      if (putCategoryEditRes.data.code === 200) {
        successMessage("تغییرات با موفقیت انجام شد");
        dispatch(RsetCategoryEditModal(false));
        dispatch(RsetCategoryCurrentRequest(""))
        // navigate(0);
      } else {
        errorMessage("خظا");
      }
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
              <Form.Label>رنگ:</Form.Label>
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
