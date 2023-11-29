import React, { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import {
  RsetDeviceNumber,
  RsetDeviceImei,
  RsetDeviceType,
  RsetDeviceTypeOptions,
  RsetVehicleNumber,
  RsetVehicleType,
  RsetVehicleTypeOptions,
  RsetVehicleCompany,
  RsetVehicleUsing,
  RsetDriverName,
  RsetDriverNumber,
  RsetVehicleGas,
  selectDeviceNumber,
  selectDeviceImei,
  selectDeviceType,
  selectDeviceTypeOptions,
  selectVehicleNumber,
  selectVehicleType,
  selectVehicleTypeOptions,
  selectVehicleCompany,
  selectVehicleUsing,
  selectDriverName,
  selectDriverNumber,
  selectVehicleGas,
  handleVehicleTypeOptions,
} from "../../slices/deviceSlices";
import { RsetFormErrors, selectFormErrors } from "../../slices/mainSlices";
import { postAddDevice } from "../../services/deviceServices";
import { errorMessage, successMessage } from "../../utils/msg";
import { useNavigate } from "react-router";
import { selectUser } from "../../slices/mainSlices";

const gpsValues = [
  {
    label: "GT06N",
    value: 1,
  },
  {
    label: "MVT380",
    value: 2,
  },
  {
    label: "FM1120",
    value: 3,
  },
  {
    label: "FMB920",
    value: 4,
  },
  {
    label: "FM2200",
    value: 5,
  },
];

const AddDevice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deviceNumber = useSelector(selectDeviceNumber);
  const deviceImei = useSelector(selectDeviceImei);
  const deviceType = useSelector(selectDeviceType);
  const deviceTypeOptions = useSelector(selectDeviceTypeOptions);
  const vehicleNumber = useSelector(selectVehicleNumber);
  const vehicleType = useSelector(selectVehicleType);
  const vehicleTypeOptions = useSelector(selectVehicleTypeOptions);
  const vehicleCompany = useSelector(selectVehicleCompany);
  const vehicleUsing = useSelector(selectVehicleUsing);
  const driverName = useSelector(selectDriverName);
  const driverNumber = useSelector(selectDriverNumber);
  const vehicleGas = useSelector(selectVehicleGas);
  const formErrors = useSelector(selectFormErrors);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(RsetDeviceTypeOptions(gpsValues));
  }, []);

  useEffect(() => {
    dispatch(handleVehicleTypeOptions());
  }, []);

  // device validation
  const deviceNumberIsValid = deviceNumber !== "" && deviceNumber.length === 11;
  const deviceImeiIsValid = deviceImei !== "";
  const deviceTypeIsValid = deviceType !== "";

  //vehicle validation
  const vehicleNumberIsValid = vehicleNumber !== "";
  const vehicleTypeIsValid = vehicleType !== "";
  const vehicleCompanyIsValid = vehicleCompany !== "";
  const vehicleUsingIsValid = vehicleUsing !== "";

  //driver validation
  const driverNameIsValid = driverName !== "";
  const driverNumberIsValid = driverNumber !== "" && driverNumber.length === 11;

  //gas validation
  const vehicleGasIsValid = vehicleGas !== "";

  const addDeviceFormIsValid =
    deviceNumberIsValid &&
    deviceImeiIsValid &&
    deviceTypeIsValid &&
    vehicleNumberIsValid &&
    vehicleTypeIsValid &&
    vehicleCompanyIsValid &&
    vehicleUsingIsValid &&
    driverNumberIsValid &&
    driverNameIsValid &&
    vehicleGas;

  const validation = () => {
    var errors = {};
    const borderValidation = "border border-danger";

    //device
    if (!deviceNumberIsValid) {
      errors.deviceNumber = borderValidation;
    }
    if (!deviceImeiIsValid) {
      errors.deviceImei = borderValidation;
    }
    if (!deviceTypeIsValid) {
      errors.deviceType = borderValidation;
    }
    if (!deviceNumberIsValid) {
      errors.deviceNumber = borderValidation;
    }
    //vehicle
    if (!vehicleNumberIsValid) {
      errors.vehicleNumber = borderValidation;
    }
    if (!vehicleTypeIsValid) {
      errors.vehicleType = borderValidation;
    }
    if (!vehicleCompanyIsValid) {
      errors.vehicleCompany = borderValidation;
    }
    if (!vehicleUsingIsValid) {
      errors.vehicleUsing = borderValidation;
    }
    //driver
    if (!driverNameIsValid) {
      errors.driverName = borderValidation;
    }
    if (!driverNumberIsValid) {
      errors.driverNumber = borderValidation;
    }

    //gas
    if (!vehicleGasIsValid) {
      errors.vehicleGas = borderValidation;
    }

    //form validation

    if (!addDeviceFormIsValid) {
      errors.formValidation = "* فیلد های مشخص شده را لطفا پر کنید";
    }

    return errors;
  };

  const handleDeviceAdd = async (e) => {
    e.preventDefault();
    if (addDeviceFormIsValid) {
      const values = {
        simNumber: deviceNumber,
        deviceIMEI: deviceImei,
        trackerModel: deviceType.label,
        plate: vehicleNumber,
        model: vehicleType.label,
        creator: vehicleCompany,
        usage: vehicleUsing,
        driverName: driverName,
        driverPhoneNumber: driverNumber,
        fuel: vehicleGas,
      };
      const postAddDeviceRes = await postAddDevice(values);
      if (postAddDeviceRes.data.code === 201) {
        successMessage("دستگاه مورد نظر با موفقیت اضافه شد");
        handleResetAddDeviceForm();
      } else {
        errorMessage("خطا!");
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation(
            deviceNumber,
            deviceImei,
            deviceType,
            vehicleNumber,
            vehicleType,
            vehicleCompany,
            vehicleUsing,
            driverName,
            driverNumber,
            vehicleGas
          )
        )
      );
    }
  };

  const handleResetAddDeviceForm = () => {
    dispatch(RsetDeviceNumber(""));
    dispatch(RsetDeviceImei(""));
    dispatch(RsetDeviceType(""));
    dispatch(RsetVehicleNumber(""));
    dispatch(RsetVehicleType(""));
    dispatch(RsetVehicleCompany(""));
    dispatch(RsetVehicleUsing(""));
    dispatch(RsetDriverName(""));
    dispatch(RsetDriverNumber(""));
    dispatch(RsetVehicleGas(""));
    dispatch(RsetFormErrors(""));
  };

  return (
    <Container fluid className="mt-4 mb-5">
      {/* <section className="lightGray2-bg p-3 shadow borderRadius-15 border border-white border-2"> */}
      {/* <div className="shadow p-4 mb-5 borderRadius-15 lightGray-bg  border border-white font16"> */}
      <div className="mb-5 mt-5">افزودن دستگاه ﺟﺪﯾﺪ</div>
      <Form>
        {/* GPS info */}
        <div className="mb-4">-اطلاعات ردیاب</div>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">
              شماره تلفن سیم کارت:
            </Form.Label>
            <NumericFormat
              className={`form-control ${
                !deviceNumberIsValid ? formErrors.deviceNumber : ""
              }`}
              type="text"
              name="deviceNumber"
              maxLength={11}
              value={deviceNumber}
              onChange={(e) => {
                dispatch(RsetDeviceNumber(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">IMEI دستگاه:</Form.Label>
            <Form.Control
              className={`${
                !deviceImeiIsValid
                  ? `${formErrors.deviceImei} borderRaduis-15`
                  : ""
              }`}
              type="text"
              name="deviceImei"
              value={deviceImei}
              onChange={(e) => {
                dispatch(RsetDeviceImei(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field">نوع GPS:</Form.Label>
            <Select
              className={`${!deviceTypeIsValid ? formErrors.deviceType : ""}`}
              value={deviceType}
              name="deviceType"
              onChange={(e) => {
                dispatch(RsetDeviceType(e));
              }}
              placeholder="انتخاب..."
              options={deviceTypeOptions}
              isSearchable={true}
            />
          </Form.Group>
        </Row>
        {/* VEHICLE INFO */}
        <hr className="mt-5 mb-5" />
        <div className="mt-4 mb-4">-اﻃﻼﻋﺎﺕ خودرو</div>
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">پلاک:</Form.Label>
            <Form.Control
              className={`${
                !vehicleNumberIsValid ? formErrors.vehicleNumber : ""
              }`}
              type="text"
              name="vehicleNumber"
              value={vehicleNumber}
              onChange={(e) => {
                dispatch(RsetVehicleNumber(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">مدل:</Form.Label>
            <Select
              className={`${!vehicleTypeIsValid ? formErrors.vehicleType : ""}`}
              value={vehicleType}
              name="vehicleType"
              onChange={(e) => {
                dispatch(RsetVehicleType(e));
              }}
              placeholder="انتخاب..."
              options={vehicleTypeOptions}
              isSearchable={true}
            />
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">شرکت سازنده:</Form.Label>
            <Form.Control
              className={`${
                !vehicleCompanyIsValid ? formErrors.vehicleCompany : ""
              }`}
              type="text"
              name="softwareReqRequireParts"
              value={vehicleCompany}
              onChange={(e) => {
                dispatch(RsetVehicleCompany(e.target.value));
              }}
            />
          </Form.Group>

          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">کاربری:</Form.Label>
            <Form.Control
              className={`${
                !vehicleUsingIsValid ? formErrors.vehicleUsing : ""
              }`}
              type="text"
              name="vehicleUsing"
              value={vehicleUsing}
              onChange={(e) => {
                dispatch(RsetVehicleUsing(e.target.value));
              }}
            />
          </Form.Group>
        </Row>
        {/* driver info */}
        <hr className="mt-5 mb-5" />
        <div className="mt-4 mb-4">-اﻃﻼﻋﺎﺕ راننده</div>
        <Row>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">نام راننده:</Form.Label>
            <Form.Control
              className={`${!driverNameIsValid ? formErrors.driverName : ""}`}
              type="text"
              name="driverName"
              value={driverName}
              onChange={(e) => {
                dispatch(RsetDriverName(e.target.value));
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label className="required-field">تلفن راننده:</Form.Label>
            <NumericFormat
              className={`form-control ${
                !driverNumberIsValid ? formErrors.driverNumber : ""
              }`}
              type="text"
              name="deviceNumber"
              maxLength={11}
              value={driverNumber}
              onChange={(e) => {
                dispatch(RsetDriverNumber(e.target.value));
              }}
            />
          </Form.Group>
        </Row>
        {/* sokhtGiri */}
        <hr className="mt-5 mb-5" />
        <div className="mt-4 mb-4">-اﻃﻼﻋﺎﺕ سوخت‌گیری</div>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label className="required-field mb-4">
              میزان سوخت مصرفی در هر ۱۰۰ کیلومتر:
            </Form.Label>
            <Form.Control
              className={`${!vehicleGasIsValid ? formErrors.vehicleGas : ""}`}
              type="text"
              name="vehicleGas"
              value={vehicleGas}
              onChange={(e) => {
                dispatch(RsetVehicleGas(e.target.value));
              }}
            />
          </Form.Group>
        </Row>
        {!addDeviceFormIsValid && (
          <p className="text-danger font12 mt-5 ms-3">
            {formErrors.formValidation}
          </p>
        )}
        <Row>
          <Col md="5" xl="4" className="mx-auto d-flex mt-5">
            <Button
              variant="success"
              className="mb-3 me-5 px-4"
              onClick={(e) => {
                handleDeviceAdd(e);
              }}
            >
              ثبت درخواست
            </Button>
            <Button
              variant="secondary"
              type="reset"
              className="mb-3 px-5 py-2"
              onClick={() => {
                handleResetAddDeviceForm();
              }}
            >
              انصراف
            </Button>
          </Col>
        </Row>
      </Form>
      {/* </section> */}
    </Container>
  );
};

export default AddDevice;
