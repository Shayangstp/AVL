import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetDeviceEditModal,
  selectDeviceEditModal,
} from "../../../../slices/modalSlices";
import { NumericFormat } from "react-number-format";
import { Modal, Form, Col, Row, Button } from "react-bootstrap";

const DeviceEditeModal = () => {
  const dispatch = useDispatch();
  const deviceEditModal = useSelector(selectDeviceEditModal);
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetDeviceEditModal(false));
      }}
      show={deviceEditModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-primary text-white">
        <Modal.Title id="contained-modal-title-vcenter" className="fs-5">
          ویرایش
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">پلاک:</Form.Label>
              <Form.Control
                // className={`${
                //   !deviceImeiIsValid
                //     ? `${formErrors.deviceImei} borderRaduis-15`
                //     : ""
                // }`}
                type="text"
                name="vehicleNumber"
                // value={deviceImei}
                // onChange={(e) => {
                //   dispatch(RsetDeviceImei(e.target.value));
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">شرکت سازنده:</Form.Label>
              <NumericFormat
                // className={`form-control ${
                //   !deviceNumberIsValid ? formErrors.deviceNumber : ""
                // }`}
                className="form-control"
                type="text"
                name="vehicleCompany"
                maxLength={11}
                // value={deviceNumber}
                // onChange={(e) => {
                //   dispatch(RsetDeviceNumber(e.target.value));
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field"> مدل:</Form.Label>
              <Form.Control
                // className={`${
                //   !deviceImeiIsValid
                //     ? `${formErrors.deviceImei} borderRaduis-15`
                //     : ""
                // }`}
                type="text"
                name="devcieModle"
                // value={deviceImei}
                // onChange={(e) => {
                //   dispatch(RsetDeviceImei(e.target.value));
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field font10">
                {" "}
                میزان سوخت مصرفی در هر 100 کیلومتر:
              </Form.Label>
              <Form.Control
                // className={`${
                //   !deviceImeiIsValid
                //     ? `${formErrors.deviceImei} borderRaduis-15`
                //     : ""
                // }`}
                type="text"
                name="gas"
                // value={deviceImei}
                // onChange={(e) => {
                //   dispatch(RsetDeviceImei(e.target.value));
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">نام راننده:</Form.Label>
              <Form.Control
                // className={`${
                //   !deviceImeiIsValid
                //     ? `${formErrors.deviceImei} borderRaduis-15`
                //     : ""
                // }`}
                type="text"
                name="driverName"
                // value={deviceImei}
                // onChange={(e) => {
                //   dispatch(RsetDeviceImei(e.target.value));
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field"> تلفن راننده:</Form.Label>
              <Form.Control
                // className={`${
                //   !deviceImeiIsValid
                //     ? `${formErrors.deviceImei} borderRaduis-15`
                //     : ""
                // }`}
                type="text"
                name="driverNumber"
                // value={deviceImei}
                // onChange={(e) => {
                //   dispatch(RsetDeviceImei(e.target.value));
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field"> کاربری:</Form.Label>
              <Form.Control
                // className={`${
                //   !deviceImeiIsValid
                //     ? `${formErrors.deviceImei} borderRaduis-15`
                //     : ""
                // }`}
                type="text"
                name="vehicleUsage"
                // value={deviceImei}
                // onChange={(e) => {
                //   dispatch(RsetDeviceImei(e.target.value));
                // }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">تاریخ ستاپ:</Form.Label>
              <Form.Control
                // className={`${
                //   !deviceImeiIsValid
                //     ? `${formErrors.deviceImei} borderRaduis-15`
                //     : ""
                // }`}
                type="text"
                name="setup"
                // value={deviceImei}
                // onChange={(e) => {
                //   dispatch(RsetDeviceImei(e.target.value));
                // }}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            dispatch(RsetDeviceEditModal(false));
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceEditeModal;
