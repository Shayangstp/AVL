import React, { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  faHome,
  faLocationDot,
  faChevronUp,
  faChevronDown,
  faClone,
  faChartSimple,
  faUser,
  faUserCircle,
  faBars,
  faRightFromBracket,
  faCar,
  faGasPump,
} from "@fortawesome/free-solid-svg-icons";
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
  handleAddDevice,
  handleAddDeviceReset,
} from "../../slices/deviceSlices";
import { RsetFormErrors, selectFormErrors } from "../../slices/mainSlices";
import { postAddDevice } from "../../services/deviceServices";
import { errorMessage, successMessage } from "../../utils/msg";
import { useNavigate } from "react-router";
import { selectUser } from "../../slices/mainSlices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  RsetDeviceAddModelModal,
  selectDeviceAddModelModal,
} from "../../slices/modalSlices";
import AddModel from "./deviceModals/AddModel";
import { selectLoading } from "../../slices/mainSlices";
import Loading from "../common/Loading";

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
  const deviceAddModelModal = useSelector(selectDeviceAddModelModal);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(RsetDeviceTypeOptions(gpsValues));
  }, []);

  useEffect(() => {
    dispatch(handleVehicleTypeOptions());
  }, []);

  // device validation
  const deviceNumberIsValid =
    deviceNumber !== "" && /^0\d{10}$/.test(deviceNumber);
  const deviceImeiIsValid = deviceImei !== "";
  const deviceTypeIsValid = deviceType !== "";

  //vehicle validation
  const vehicleNumberIsValid = vehicleNumber !== "";
  const vehicleTypeIsValid = vehicleType !== "";
  const vehicleCompanyIsValid = vehicleCompany !== "";
  const vehicleUsingIsValid = vehicleUsing !== "";

  //driver validation
  const driverNameIsValid = driverName !== "";
  const driverNumberIsValid =
    driverNumber !== "" && /^0\d{10}$/.test(driverNumber);

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
      errors.formValidation = "* فیلد های مشخص شده را لطفا پر کنید!";
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
      dispatch(handleAddDevice(values));
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

  return (
    <Container className="mt-5 mb-5">
      <Form>
        <Row className="d-flex flex-column flex-md-row gap-1 justify-content-center">
          <Form.Group
            as={Col}
            md="3"
            id="user"
            className="bg-white borderRadius-15 shadow p-0"
          >
            <div className="deviceHeader p-3 borderRadius-top">
              <span className="me-2">
                <FontAwesomeIcon icon={faUser} />
              </span>
              اطلاعات راننده
            </div>
            <div className="d-flex flex-column p-3">
              <Form.Group className="mb-3 mt-1">
                <Form.Label className="required-field">نام راننده:</Form.Label>
                <Form.Control
                  className={`${
                    !driverNameIsValid ? formErrors.driverName : ""
                  } borderRadius-15`}
                  type="text"
                  name="driverName"
                  value={driverName}
                  onChange={(e) => {
                    dispatch(RsetDriverName(e.target.value));
                  }}
                />
              </Form.Group>
              <Form.Group className="">
                <Form.Label className="required-field">تلفن راننده:</Form.Label>
                <NumericFormat
                  className={`form-control ${
                    !driverNumberIsValid ? formErrors.driverNumber : ""
                  } borderRadius-15`}
                  type="text"
                  name="deviceNumber"
                  maxLength={11}
                  value={driverNumber}
                  onChange={(e) => {
                    dispatch(RsetDriverNumber(e.target.value));
                  }}
                />
              </Form.Group>
            </div>
          </Form.Group>
          <Form.Group
            as={Col}
            md="5"
            id="vehicle"
            className="bg-white borderRadius-15 shadow p-0 mt-2 mt-md-0"
          >
            <div className="deviceHeader p-3 borderRadius-top ">
              <span className="me-2">
                <FontAwesomeIcon icon={faCar} />
              </span>
              اﻃﻼﻋﺎﺕ خودرو
            </div>
            <div className="d-flex flex-column p-3">
              <Row className="mb-3">
                <Form.Group as={Col} md="5" className="">
                  <Form.Label className="required-field">پلاک:</Form.Label>
                  <Form.Control
                    className={`${
                      !vehicleNumberIsValid ? formErrors.vehicleNumber : ""
                    } borderRadius-15`}
                    type="text"
                    name="vehicleNumber"
                    value={vehicleNumber}
                    onChange={(e) => {
                      dispatch(RsetVehicleNumber(e.target.value));
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md="5">
                  <Form.Label className="required-field">مدل:</Form.Label>
                  <Select
                    className={`${
                      !vehicleTypeIsValid ? formErrors.vehicleType : ""
                    }`}
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
                <Form.Group as={Col} md="2" className="mt-4">
                  <Button
                    className="mt-1 text-dark"
                    title="اضافه کردن مدل"
                    style={{ background: "#F6BD60", border: "none" }}
                    onClick={() => {
                      dispatch(RsetDeviceAddModelModal(true));
                    }}
                  >
                    +
                  </Button>
                </Form.Group>
              </Row>
              <Row className="d-flex">
                <Form.Group as={Col} md="6" className="">
                  <Form.Label className="required-field">
                    شرکت سازنده:
                  </Form.Label>
                  <Form.Control
                    className={`${
                      !vehicleCompanyIsValid ? formErrors.vehicleCompany : ""
                    } borderRadius-15`}
                    type="text"
                    name="softwareReqRequireParts"
                    value={vehicleCompany}
                    onChange={(e) => {
                      dispatch(RsetVehicleCompany(e.target.value));
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} md="6" className="">
                  <Form.Label className="required-field">کاربری:</Form.Label>
                  <Form.Control
                    className={`${
                      !vehicleUsingIsValid ? formErrors.vehicleUsing : ""
                    } borderRadius-15`}
                    type="text"
                    name="vehicleUsing"
                    value={vehicleUsing}
                    onChange={(e) => {
                      dispatch(RsetVehicleUsing(e.target.value));
                    }}
                  />
                </Form.Group>
                <Form.Group className="p-2 mb-4">
                  <Form.Label className="required-field mt-3">
                    <span className="me-2">
                      <FontAwesomeIcon icon={faGasPump} />
                    </span>
                    اﻃﻼﻋﺎﺕ سوخت‌گیری
                    <span className="font10">
                      (میزان سوخت مصرفی در هر ۱۰۰ کیلومتر)
                    </span>{" "}
                    :
                  </Form.Label>
                  <Form.Control
                    className={`${
                      !vehicleGasIsValid ? formErrors.vehicleGas : ""
                    } borderRadius-15`}
                    type="text"
                    name="vehicleGas"
                    value={vehicleGas}
                    onChange={(e) => {
                      dispatch(RsetVehicleGas(e.target.value));
                    }}
                  />
                </Form.Group>
              </Row>
            </div>
          </Form.Group>
          {/* </div> */}

          <Form.Group
            as={Col}
            md="3"
            className="bg-white borderRadius-15 shadow p-0 mt-2 mt-md-0"
          >
            <div className="deviceHeader p-3 borderRadius-top">
              <span className="me-2">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              اطلاعات ردیاب{" "}
            </div>
            <div className="d-flex flex-column gap-3 p-3">
              <Form.Group className="mb-3 mb-md-0">
                <Form.Label className="required-field">
                  شماره تلفن سیم کارت:
                </Form.Label>
                <NumericFormat
                  className={`form-control ${
                    !deviceNumberIsValid ? formErrors.deviceNumber : ""
                  } borderRadius-15`}
                  type="text"
                  name="deviceNumber"
                  maxLength={11}
                  value={deviceNumber}
                  onChange={(e) => {
                    dispatch(RsetDeviceNumber(e.target.value));
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 mb-md-0">
                <Form.Label className="required-field">IMEI دستگاه:</Form.Label>
                <Form.Control
                  className={`${
                    !deviceImeiIsValid
                      ? `${formErrors.deviceImei} borderRaduis-15`
                      : ""
                  } borderRadius-15`}
                  type="text"
                  name="deviceImei"
                  value={deviceImei}
                  onChange={(e) => {
                    dispatch(RsetDeviceImei(e.target.value));
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 mb-md-0">
                <Form.Label className="required-field">نوع GPS:</Form.Label>
                <Select
                  className={`${
                    !deviceTypeIsValid ? formErrors.deviceType : ""
                  }`}
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
            </div>
          </Form.Group>
          <hr className="mt-5 " />
          <Form.Group
            className="mb-3 mb-md-0 d-flex gap-2 justify-content-center"
            style={{ marginTop: "32px" }}
          >
            <Button
              // size="sm"
              variant="dark"
              className="font12 px-3 py-2"
              onClick={(e) => {
                if (!loading) {
                  handleDeviceAdd(e);
                }
              }}
            >
              {!loading ? "ثبت" : <Loading height={"5px"} width={"22px"} />}
            </Button>
            <Button
              // size="sm"
              variant="danger"
              type="reset"
              className="font12 px-3 py-2"
              onClick={() => {
                dispatch(handleAddDeviceReset());
              }}
            >
              انصراف
            </Button>
          </Form.Group>
        </Row>
      </Form>
      {deviceAddModelModal && <AddModel />}
    </Container>
  );
};

export default AddDevice;
