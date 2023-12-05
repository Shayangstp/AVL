import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetUserManagmentRoleModal,
  selectUserManagmentRoleModal,
} from "../../../slices/modalSlices";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { selectCurrentUser } from "../../../slices/userManagmentSlices";
import { useEffect } from "react";
import { postAddRoleToUser } from "../../../services/userServices";

const UserManagmentRoleModal = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [checkedItems, setCheckedItems] = useState([]);

  const rolesOfUser = currentUser.roles.map((role) => {
    return role.rolename;
  });

  useEffect(() => {
    setCheckedItems(currentUser.roles.length !== 0 && rolesOfUser);
  }, []);

  const userManagmentRoleModal = useSelector(selectUserManagmentRoleModal);

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

  const handleUserRoles = async (e) => {
    e.preventDefault();
    // console.log(checkedItems);
    const token = localStorage.getItem("token");
    const values = {
      userId: currentUser._id,
      roleName: checkedItems,
    };
    const postAddRoleToUserRes = await postAddRoleToUser(values, token);
    // console.log(postAddRoleToUserRes);

    // console.log("hi");
    dispatch(RsetUserManagmentRoleModal(false));
    // setCheckedItems([]);
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
                  checked={checkedItems.includes("device_view")}
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
                  checked={checkedItems.includes("device_add")}
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
                  checked={checkedItems.includes("device_edit")}
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
                checked={checkedItems.includes("user_view")}
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
                checked={checkedItems.includes("user_add")}
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
                checked={checkedItems.includes("user_edit")}
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
                checked={checkedItems.includes("user_role")}
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
                checked={checkedItems.includes("user_block")}
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
                checked={checkedItems.includes("user_password")}
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
                checked={checkedItems.includes("group_view")}
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
                checked={checkedItems.includes("group_add")}
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
                checked={checkedItems.includes("group_edit")}
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
                checked={checkedItems.includes("group_device")}
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
                checked={checkedItems.includes("group_user")}
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
                checked={checkedItems.includes("report_view")}
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
                checked={checkedItems.includes("speed_view")}
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
                checked={checkedItems.includes("speed_edit")}
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
                checked={checkedItems.includes("polygon_view")}
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
                checked={checkedItems.includes("polygon_edit")}
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
                checked={checkedItems.includes("status_view")}
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
                checked={checkedItems.includes("status_edit")}
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
                checked={checkedItems.includes("gps_view")}
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
                checked={checkedItems.includes("gps_edit")}
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
