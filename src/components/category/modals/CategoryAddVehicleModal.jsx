import React, { useEffect, useState } from "react";
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
  selectCategoryCurrentRequest,
} from "../../../slices/categorySlices";
import {
  postAddDeviceToDeviceGroup,
  getVehicleAddOptions,
} from "../../../services/categoryServices";
import { errorMessage, successMessage } from "../../../utils/msg";

const CategoryAddVehicleModal = () => {
  const [vehicleId, setVehicleId] = useState();
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

  const categoryCurrentRequest = useSelector(selectCategoryCurrentRequest);

  console.log(categoryCurrentRequest);

  //view
  // useEffect(async () => {
  //   const getVehicleAddOptionsres = await getVehicleAddOptions();
  //   console.log(getVehicleAddOptionsres);
  // }, []);

  let i = 1;
  const vehicleOptions = [
    {
      label: categoryCurrentRequest.devices.map((item) => {
        const vehicle = item.driverName + " " + item.deviceIMEI;
        return vehicle;
      }),
      value: categoryCurrentRequest.devices.map((item) => {
        const vehicleImei = item.deviceIMEI;
        return vehicleImei;
      }),
      driverNumber: categoryCurrentRequest.devices.map((item) => {
        const vehicleImei = item.driverPhoneNumber;
        return vehicleImei;
      }),
      deviceImei: categoryCurrentRequest.devices.map((item) => {
        const vehicleImei = item.deviceIMEI;
        return vehicleImei;
      }),
      simNumber: categoryCurrentRequest.devices.map((item) => {
        const vehicleImei = item.simNumber;
        return vehicleImei;
      }),
      vehicleType: categoryCurrentRequest.devices.map((item) => {
        const vehicleImei = item.type;
        return vehicleImei;
      }),
      vehicleNumber: categoryCurrentRequest.devices.map((item) => {
        const vehicleImei = item.plate;
        return vehicleImei;
      }),
      id: categoryCurrentRequest.devices.map((item) => {
        const vehicleImei = item._id;
        return vehicleImei;
      }),
    },
  ];

  const options = categoryCurrentRequest.devices.map((item) => {
    const vehicle = item.driverName + " " + item.deviceIMEI;
    const vehicleImei = item.deviceIMEI;
    return {
      label: vehicle.map((item) => {
        return item;
      }),
      value: vehicleImei.map((item) => {
        return item;
      }),
    };
  });

  console.log(options);

  console.log(vehicleId);
  console.log(categoryCurrentRequest._id);

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

  const handleAddVehicleform = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const values = {
      vehicleId: vehicleId,
      groupId: categoryCurrentRequest._id,
    };
    if (addVehicleformIsValid) {
      console.log({
        deviceImei,
        driverNumber,
        vehicleNumber,
        deviceNumber,
        vehicleType,
        categoryUserVehicle,
      });
      const postAddDeviceToDeviceGroupRes = await postAddDeviceToDeviceGroup(
        values,
        token
      );
      console.log(postAddDeviceToDeviceGroupRes);
      if (postAddDeviceToDeviceGroupRes.data.code === 200) {
        successMessage("دستگاه با موفقیت اضافه شد");
        dispatch(RsetCategoryAddVehicleModal(false));
      } else {
        errorMessage("خطا");
      }
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
        <Modal.Title id="contained-modal-title-vcenter">
          افزودن وسیله نقلیه
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">وسیله نقلیه :</Form.Label>
              <Select
                // className={`${!deviceTypeIsValid ? formErrors.deviceType : ""}`}
                value={categoryUserVehicle}
                name="deviceType"
                onChange={(selectedOption) => {
                  const selectedVehicle = vehicleOptions.find(
                    (option) => option.value === selectedOption.value
                  );

                  if (selectedVehicle) {
                    setVehicleId(...selectedVehicle.id);
                    dispatch(RsetCategoryUserVehicle(selectedVehicle));
                    dispatch(RsetDeviceImei(...selectedVehicle.deviceImei));
                    dispatch(RsetDriverNumber(...selectedVehicle.driverNumber));
                    dispatch(RsetDeviceNumber(...selectedVehicle.simNumber));
                    dispatch(RsetVehicleType(...selectedVehicle.vehicleType));
                    dispatch(
                      RsetVehicleNumber(...selectedVehicle.vehicleNumber)
                    );
                  }
                }}
                placeholder="انتخاب..."
                options={options}
                isSearchable={true}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">IMEI دستگاه : </Form.Label>
              <Form.Control
                className={`${!deviceImeiIsValid ? formErrors.deviceImei : ""}`}
                value={deviceImei}
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
