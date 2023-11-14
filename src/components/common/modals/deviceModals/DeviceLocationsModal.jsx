import React from "react";
import { Modal, Form, Col, Row, Button, Tab, Tabs } from "react-bootstrap";
import {
  RsetDeviceLocationsModal,
  selectDeviceLocationsModal,
} from "../../../../slices/modalSlices";
import { useSelector, useDispatch } from "react-redux";
import DeviceListLocations from "./DeviceLocations/DeviceListLocations";
import Map from "../../../map/Map";

const DeviceLocationsModal = () => {
  const dispatch = useDispatch();
  const deviceLocationsModal = useSelector(selectDeviceLocationsModal);
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetDeviceLocationsModal(false));
      }}
      show={deviceLocationsModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-primary text-white">
        <Modal.Title id="contained-modal-title-vcenter " className="fs-5">
          مشاهده مکان ها
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <div>
            <DeviceListLocations />
          </div>
          <div id="map" className="w-100" style={{ height: "300px" }}>
            <Map width="300px" height="300px" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          type="reset"
          className="mb-3 px-4 py-2"
          onClick={() => {
            dispatch(RsetDeviceLocationsModal(false));
          }}
        >
          انصراف
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceLocationsModal;
