import React from "react";
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
import {
  RsetDeviceAddModelModal,
  selectDeviceAddModelModal,
} from "../../../slices/modalSlices";
import { useSelector, useDispatch } from "react-redux";
import {
  RsetVehicleAddType,
  selectVehicleAddType,
  selectVehicleAdded,
  handleVehicleModlesList,
  handleAddVehicleType,
  handleVehicleTypeOptions,
} from "../../../slices/deviceSlices";
import { selectFormErrors, RsetFormErrors } from "../../../slices/mainSlices";

const AddModel = () => {
  const dispatch = useDispatch();

  const deviceAddModelModal = useSelector(selectDeviceAddModelModal);
  const vehicleAddType = useSelector(selectVehicleAddType);
  const formErrors = useSelector(selectFormErrors);
  const vehicleAdded = useSelector(selectVehicleAdded);

  const vehicleAddTypeIsValid = vehicleAddType !== "";

  const validation = () => {
    var errors = {};
    const borderValidation = "border border-danger";

    if (!vehicleAddTypeIsValid) {
      errors.vehicleAddType = borderValidation;
    }

    return errors;
  };

  const handleVehicleModel = (e) => {
    e.preventDefault();
    if (vehicleAddTypeIsValid) {
      const values = {
        vehicleType: vehicleAddType,
      };
      dispatch(handleAddVehicleType(values));
      dispatch(handleVehicleTypeOptions());
    } else {
      dispatch(RsetFormErrors(validation({ vehicleAddType })));
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={deviceAddModelModal}
    >
      <Modal.Header
        className="text-dark"
        style={{ backgroundColor: "#73c088", border: "none" }}
      >
        <Modal.Title id="contained-modal-title-vcenter" className="fs-5">
          افزودن مدل
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label className="required-field">نام مدل: </Form.Label>
              <Form.Control
                className={`${
                  !vehicleAddTypeIsValid ? formErrors.vehicleAddType : ""
                } borderRadius-15`}
                type="text"
                name=""
                value={vehicleAddType}
                onChange={(e) => {
                  dispatch(RsetVehicleAddType(e.target.value));
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          className="px-4 font12"
          onClick={(e) => {
            handleVehicleModel(e);
            dispatch(RsetDeviceAddModelModal(false));
          }}
        >
          ثبت
        </Button>
        <Button
          variant="danger"
          className="px-4 font12"
          onClick={() => {
            dispatch(RsetDeviceAddModelModal(false));
            dispatch(RsetVehicleAddType(""));
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModel;
