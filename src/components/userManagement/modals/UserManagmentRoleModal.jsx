import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetUserManagmentRoleModal,
  selectUserManagmentRoleModal,
} from "../../../slices/modalSlices";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const UserManagmentRoleModal = () => {
  const dispatch = useDispatch();
  const userManagmentRoleModal = useSelector(selectUserManagmentRoleModal);
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetUserManagmentRoleModal(false));
      }}
      show={userManagmentRoleModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-secondary text-white">
        <Modal.Title id="contained-modal-title-vcenter">سطح دسترسی</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col}></Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-secondary">
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
