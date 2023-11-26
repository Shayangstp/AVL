import React from "react";
import ManageVehicleList from "./manageVehicle/ManageVehicleList";
import {
  RsetCategoryManageVehicleModal,
  selectCategoryManageVehicleModal,
} from "../../../slices/modalSlices";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const CategoryManageVehicleModal = () => {
  const dispatch = useDispatch();
  const categoryManageVehicleModal = useSelector(
    selectCategoryManageVehicleModal
  );

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetCategoryManageVehicleModal(false));
      }}
      show={categoryManageVehicleModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-info text-white ">
        <Modal.Title id="contained-modal-title-vcenter">
          کاربرهای مشترک
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ManageVehicleList />
      </Modal.Body>
      <Modal.Footer className="bg-info">
        <Button
          variant="danger"
          onClick={() => {
            dispatch(RsetCategoryManageVehicleModal(false));
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryManageVehicleModal;
