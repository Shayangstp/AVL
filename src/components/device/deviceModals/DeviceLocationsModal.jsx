import React from "react";
import { Modal, Form, Col, Row, Button, Tab, Tabs } from "react-bootstrap";
import {
  RsetDeviceLocationsModal,
  selectDeviceLocationsModal,
} from "../../../slices/modalSlices";
import { useSelector, useDispatch } from "react-redux";
import DeviceListLocations from "./DeviceLocations/DeviceListLocations";
import Map from "../../map/Map";
import {
  RsetDeviceCordinate,
  handleDeviceLocList,
  selectDeviceCordinate,
} from "../../../slices/deviceSlices";
import { useEffect } from "react";

const DeviceLocationsModal = () => {
  const dispatch = useDispatch();
  const deviceLocationsModal = useSelector(selectDeviceLocationsModal);
  const deviceCordinate = useSelector(selectDeviceCordinate);

  useEffect(() => {
    dispatch(handleDeviceLocList());
  }, []);

  console.log(deviceCordinate);

  return (
    <Modal
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetDeviceLocationsModal(false));
        dispatch(RsetDeviceCordinate([]));
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
        <div className="d-flex flex-column">
          <div>
            <DeviceListLocations />
          </div>
          <div
            id="map"
            style={{ height: "300px", width: "100%" }}
            className="mt-4"
          >
            <Map height="300px" />
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
            dispatch(RsetDeviceCordinate([]));
          }}
        >
          انصراف
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceLocationsModal;
