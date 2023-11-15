import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetUserManagmentChangePasswordModal,
  selectUserManagmentChangePasswordModal,
} from "../../../slices/modalSlices";
import { Button, Modal } from "react-bootstrap";

const UserManagmentChangePasswordModal = () => {
  const dispatch = useDispatch();
  const userManagmentChangePasswordModal = useSelector(
    selectUserManagmentChangePasswordModal
  );
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetUserManagmentChangePasswordModal(false));
      }}
      show={userManagmentChangePasswordModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-info text-white">
        <Modal.Title id="contained-modal-title-vcenter">
          تغییر رمزعبور
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer className="bg-info">
        <Button
          variant="danger"
          onClick={() => {
            dispatch(RsetUserManagmentChangePasswordModal(false));
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserManagmentChangePasswordModal;
