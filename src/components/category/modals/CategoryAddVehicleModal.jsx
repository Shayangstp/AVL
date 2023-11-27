import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import {
  RsetCategoryAddVehicleModal,
  selectCategoryAddVehicleModal,
} from "../../../slices/modalSlices";
import {
  RsetDeviceImei,
  RsetDriverNumber,
  RsetVehicleNumber,
  RsetDeviceNumber,
  RsetVehicleType,
  selectDeviceImei,
  selectDriverNumber,
  selectVehicleNumber,
  selectDeviceNumber,
  selectVehicleType,
} from "../../../slices/deviceSlices";
import {
  RsetCategoryUserVehicle,
  selectCategoryUserVehicle,
  RsetCategoryUserVehicleOptions,
  selectCategoryUserVehicleOptions,
} from "../../../slices/categorySlices";

const CategoryAddVehicleModal = () => {
  const dispatch = useDispatch();
  const categoryAddVehicleModal = useSelector(selectCategoryAddVehicleModal);
  const formErrors = useSelector(selectFormErrors);

  const deviceImei = useSelector(selectDeviceImei);
  const driverNumber = useSelector(selectDriverNumber);
  const vehicleNumber = useSelector(selectVehicleNumber);
  const deviceNumber = useSelector(selectDeviceNumber);
  const vehicleType = useSelector(selectVehicleType);
  ///must be fill by api and then fill all the Rsets
  const categoryUserVehicle = useSelector(selectCategoryUserVehicle);
  const categoryUserVehicleOptions = useSelector(
    selectCategoryUserVehicleOptions
  );

  const deviceImeiIsValid = deviceImei !== "";
  const driverNumberIsValid = driverNumber !== "";
  const vehicleNumberIsValid = vehicleNumber !== "";
  const deviceNumberIsValid = deviceNumber !== "";
  const vehicleTypeIsValid = vehicleType !== "";
  const categoryUserVehicleIsValid = categoryUserVehicle.length !== 0;

  const addVehicleformIsValid =
    deviceImeiIsValid &&
    driverNumberIsValid &&
    vehicleNumberIsValid &&
    deviceNumberIsValid &&
    vehicleTypeIsValid &&
    categoryUserVehicleIsValid;

  const validation = () => {
    let errors = {};
    const borderValidation = "border border-danger";
    if (!deviceImeiIsValid) {
      errors.deviceImei = borderValidation;
    }
    if (!driverNumberIsValid) {
      errors.driverNumber = borderValidation;
    }
    if (!vehicleNumberIsValid) {
      errors.vehicleNumber = borderValidation;
    }
    if (!deviceNumberIsValid) {
      errors.deviceNumber = borderValidation;
    }
    if (!vehicleTypeIsValid) {
      errors.vehicleType = borderValidation;
    }
    if (!categoryUserVehicleIsValid) {
      errors.categoryUserVehicle = borderValidation;
    }
    return errors;
  };

  const handleAddVehicleform = (e) => {
    e.preventDefault();
    if (addVehicleformIsValid) {
      console.log({
        deviceImei,
        driverNumber,
        vehicleNumber,
        deviceNumber,
        vehicleType,
        categoryUserVehicle,
      });
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            deviceImei,
            driverNumber,
            vehicleNumber,
            deviceNumber,
            vehicleType,
            categoryUserVehicle,
          })
        )
      );
    }
  };

  useEffect(() => {
    //add the ddata to the Rsets
    // dispatch(RsetDeviceImei(""));
    // dispatch(RsetDriverNumber(""));
    // dispatch(RsetVehicleNumber(""));
    // dispatch(RsetDeviceNumber(""));
    // dispatch(RsetVehicleType(""));
    // dispatch(RsetCategoryUserVehicle(""));
  }, []);

  const handleResetAddVehicleForm = () => {
    dispatch(RsetFormErrors(""));
    dispatch(RsetDeviceImei(""));
    dispatch(RsetDriverNumber(""));
    dispatch(RsetVehicleNumber(""));
    dispatch(RsetDeviceNumber(""));
    dispatch(RsetVehicleType(""));
    dispatch(RsetCategoryUserVehicle(""));
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetCategoryAddVehicleModal(false));
        handleResetAddVehicleForm();
      }}
      show={categoryAddVehicleModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-success text-white ">
        <Modal.Title id="contained-modal-title-vcenter">ویرایش</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">وسیله نقلیه :</Form.Label>
              <Select
                // className={`${!deviceTypeIsValid ? formErrors.deviceType : ""}`}
                // value={categoryGroupColor}
                name="deviceType"
                // onChange={(e) => {
                //   dispatch(e);
                // }}
                placeholder="انتخاب..."
                // options={categoryGroupColorOptions}
                isSearchable={true}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">IMEI دستگاه : </Form.Label>
              <Form.Control
                className={`${!deviceImeiIsValid ? formErrors.deviceImei : ""}`}
                value={deviceImei}
                type="text"
                name="deviceImei"
                onChange={(e) => {
                  dispatch(RsetDeviceImei(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">تلفن راننده : </Form.Label>
              <Form.Control
                className={`${
                  !driverNumberIsValid ? formErrors.driverNumber : ""
                }`}
                value={driverNumber}
                type="text"
                name="driverNumber"
                onChange={(e) => {
                  dispatch(RsetDriverNumber(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">پلاک : </Form.Label>
              <Form.Control
                className={`${
                  !vehicleNumberIsValid ? formErrors.vehicleNumber : ""
                }`}
                value={vehicleNumber}
                type="text"
                name="vehicleNumber"
                onChange={(e) => {
                  dispatch(RsetVehicleNumber(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">
                شماره تلفن سیم کارت :{" "}
              </Form.Label>
              <Form.Control
                className={`${
                  !deviceNumberIsValid ? formErrors.deviceNumber : ""
                }`}
                value={deviceNumber}
                type="text"
                name="deviceNumber"
                onChange={(e) => {
                  dispatch(RsetDeviceNumber(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">مدل : </Form.Label>
              <Form.Control
                className={`${
                  !vehicleTypeIsValid ? formErrors.vehicleType : ""
                }`}
                value={vehicleType}
                type="text"
                name="vehicleType"
                onChange={(e) => {
                  dispatch(RsetVehicleType(e.target.value));
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-success">
        <Button
          variant="primary"
          onClick={(e) => {
            handleAddVehicleform(e);
          }}
        >
          ذخیره
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            dispatch(RsetCategoryAddVehicleModal(false));
            handleResetAddVehicleForm();
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryAddVehicleModal;