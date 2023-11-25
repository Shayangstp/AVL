import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetUserManagmentRoleModal,
  selectUserManagmentRoleModal,
} from "../../../slices/modalSlices";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
// import {
//   handleUserRoles,
//   RsetUserRoles,
//   selectUserRoles,
// } from "../../../slices/userManagmentSlices";

const UserManagmentRoleModal = () => {
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState([]);

  const userManagmentRoleModal = useSelector(selectUserManagmentRoleModal);
  // const userRoles = useSelector(selectUserRoles);

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    // make this into the redux
    if (isChecked) {
      // dispatch(RsetUserRoles((prev) => [...prev, checkboxValue]));
      setCheckedItems((prevCheckedItems) => [
        ...prevCheckedItems,
        checkboxValue,
      ]);
    } else {
      // dispatch(
      //   RsetUserRoles(userRoles.filter((item) => item !== checkboxValue))
      // );
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== checkboxValue)
      );
    }
  };

  const handleUserRoles = (e) => {
    e.preventDefault();
    console.log(checkedItems);
    dispatch(RsetUserManagmentRoleModal(false));
    setCheckedItems([]);
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetUserManagmentRoleModal(false));
        setCheckedItems([]);
      }}
      show={userManagmentRoleModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-secondary text-white">
        <Modal.Title id="contained-modal-title-vcenter">سطح دسترسی</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mt-3">
            <Form.Group as={Col} md="12">
              <Form.Label>-دستگاه ها : </Form.Label>
              <div className="d-flex flex-row">
                <Form.Check
                  type="checkbox"
                  id="view"
                  label="مشاهده"
                  value="device_view"
                  onChange={(e) => {
                    handleCheckboxChange(e);
                  }}
                  className="me-3"
                />
                <Form.Check
                  type="checkbox"
                  id="view"
                  label="افزودن"
                  value="device_add"
                  onChange={(e) => {
                    handleCheckboxChange(e);
                  }}
                  className="me-3"
                />
                <Form.Check
                  type="checkbox"
                  id="view"
                  label="ویرایش"
                  value="device_edit"
                  onChange={(e) => {
                    handleCheckboxChange(e);
                  }}
                  className="me-3"
                />
              </div>
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Label>-کاربران : </Form.Label>
            <Form.Group as={Col} md="12" className="d-flex flex-wrap">
              <Form.Check
                type="checkbox"
                id="view"
                label="مشاهده"
                value="user_view"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="افزودن"
                value="user_add"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="ویرایش"
                value="user_edit"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="ویرایش نقش"
                value="user_role"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="مسدود سازی"
                value="user_block"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="تغییر رمز"
                value="user_password"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Label>-دسته ها : </Form.Label>
            <Form.Group as={Col} md="12" className="d-flex flex-wrap">
              <Form.Check
                type="checkbox"
                id="view"
                label="مشاهده"
                value="group_view"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="افزودن"
                value="group_add"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="ویرایش"
                value="group_edit"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="ویرایش دستگاه"
                value="group_device"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="ویرایش کاربر"
                value="group_user"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Label>-گزارشات : </Form.Label>
            <Form.Group as={Col} md="12" className="d-flex flex-wrap">
              <Form.Check
                type="checkbox"
                id="view"
                label="مشاهده"
                value="report_view"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Label>-سرعت : </Form.Label>
            <Form.Group as={Col} md="12" className="d-flex flex-wrap">
              <Form.Check
                type="checkbox"
                id="view"
                label="مشاهده"
                value="speed_view"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="ویرایش"
                value="speed_edit"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Label>-محدوده مجاز : </Form.Label>
            <Form.Group as={Col} md="12" className="d-flex flex-wrap">
              <Form.Check
                type="checkbox"
                id="view"
                label="مشاهده"
                value="polygon_view"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="ویرایش"
                value="polygon_edit"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Label>-تغییر وضعیت : </Form.Label>
            <Form.Group as={Col} md="12" className="d-flex flex-wrap">
              <Form.Check
                type="checkbox"
                id="view"
                label="مشاهده"
                value="status_view"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="ویرایش"
                value="status_edit"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Label>-تنظیمات جی پی اس : </Form.Label>
            <Form.Group as={Col} md="12" className="d-flex flex-wrap">
              <Form.Check
                type="checkbox"
                id="view"
                label="مشاهده"
                value="gps_view"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
              <Form.Check
                type="checkbox"
                id="view"
                label="ویرایش"
                value="gps_edit"
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
                className="me-3"
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-secondary">
        <Button
          variant="primary"
          onClick={(e) => {
            // dispatch(handleUserRoles(e));
            handleUserRoles(e);
          }}
        >
          ذخیره
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            dispatch(RsetUserManagmentRoleModal(false));
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserManagmentRoleModal;
