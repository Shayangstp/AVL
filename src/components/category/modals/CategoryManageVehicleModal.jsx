import React from "react";
import ManageVehicleList from "./manageVehicle/ManageVehicleList";
import {
  RsetCategoryManageVehicleModal,
  selectCategoryManageVehicleModal,
} from "../../../slices/modalSlices";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
import { handleCategoryManageVehicleList } from "../../../slices/categorySlices";

const CategoryManageVehicleModal = () => {
  const dispatch = useDispatch();
  const categoryManageVehicleModal = useSelector(
    selectCategoryManageVehicleModal
  );

  useEffect(() => {
    dispatch(handleCategoryManageVehicleList());
  }, []);

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
          مدیریت وسیله نقلیه
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
