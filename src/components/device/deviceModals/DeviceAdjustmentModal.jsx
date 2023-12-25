import React, { useState } from "react";
import {
  RsetDeviceAdjusmentModal,
  selectDeviceAdjusmentModal,
} from "../../../slices/modalSlices";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Col, Row, Button, Tab, Tabs } from "react-bootstrap";
import Select from "react-select";
import {
  RsetVehicleSpeed,
  selectVehicleSpeed,
  RsetSmsReciver,
  selectSmsReciver,
  RsetSmsReciverOptions,
  selectSmsReciverOptions,
  RsetEmailReciver,
  selectEmailReciver,
  RsetTimeToSendSms,
  selectTimeToSendSms,
  RsetVehicleCondition,
  selectVehicleCondition,
  RsetVehicleConditionOptions,
  selectVehicleConditionOptions,
  RsetVehicleConditionDescription,
  selectVehicleConditionDescription,
  RsetDeviceNumber,
  selectDeviceNumber,
  RsetDeviceImei,
  selectDeviceImei,
  RsetDeviceType,
  selectDeviceType,
  selectDeviceTypeOptions,
  selectCurrentDevice,
  RsetDeviceTypeOptions,
  selectDeviceCordinate,
  RsetCurrentDevice,
} from "../../../slices/deviceSlices";
import { RsetFormErrors, selectFormErrors } from "../../../slices/mainSlices";
import MapDraw from "../../map/MapDraw";
import {
  getPhoneNumbers,
  postSpeedLimitation,
  putGpsEdit,
  postVehicleCondition,
  postGpsLimit,
  deleteGeoLimit,
} from "../../../services/deviceServices";
import { useEffect } from "react";
import { errorMessage, successMessage } from "../../../utils/msg";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

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
const conditionValues = [
  {
    label: "تصادفی",
    value: 1,
  },
  {
    label: "تعمیرگاه",
    value: 2,
  },
];

const DeviceAdjustmentModal = () => {
  const [key, setKey] = useState("speed");
  const [sms, setSms] = useState(false);
  const [email, setEmail] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formErrors = useSelector(selectFormErrors);
  const deviceAdjusmentModal = useSelector(selectDeviceAdjusmentModal);
  const vehicleSpeed = useSelector(selectVehicleSpeed);
  const smsReciver = useSelector(selectSmsReciver);
  const smsReciverOptions = useSelector(selectSmsReciverOptions);
  const emailReciver = useSelector(selectEmailReciver);
  const timeToSendSms = useSelector(selectTimeToSendSms);
  const vehicleCondition = useSelector(selectVehicleCondition);
  const vehicleConditionDescription = useSelector(
    selectVehicleConditionDescription
  );
  const vehicleConditionOptions = useSelector(selectVehicleConditionOptions);
  const deviceNumber = useSelector(selectDeviceNumber);
  const deviceImei = useSelector(selectDeviceImei);
  const deviceType = useSelector(selectDeviceType);
  const deviceTypeOptions = useSelector(selectDeviceTypeOptions);
  const currentDevice = useSelector(selectCurrentDevice);
  const deviceCordinate = useSelector(selectDeviceCordinate);

  //validation common
  const smsReciverIsValid = smsReciver.length !== 0;
  const emailReciverIsValid =
    emailReciver !== "" &&
    /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/.test(emailReciver);
  const emailSmsIsValid = smsReciverIsValid || emailReciverIsValid;
  //speed
  const vehicleSpeedIsValid = vehicleSpeed !== "";
  const smsEmailIsValidSpeed = sms === true || email === true;
  const speedFormIsValid = vehicleSpeedIsValid && emailSmsIsValid;

  const speedValidation = () => {
    var errors = {};
    const borderValidation = "border border-danger";

    if (!vehicleSpeedIsValid) {
      errors.vehicleSpeed = borderValidation;
    }
    if (!smsReciverIsValid) {
      errors.smsReciver = borderValidation;
    }
    if (!emailReciverIsValid) {
      errors.emailReciver = borderValidation;
    }
    if (!smsEmailIsValidSpeed) {
      errors.smsEmailSpeed = "انتخاب یکی از موارد اطلاع رسانی اجباری است!";
    }

    return errors;
  };

  const getPhoneNumbersOptions = async () => {
    try {
      const getPhoneNumbersRes = await getPhoneNumbers();

      if (getPhoneNumbersRes.data.code === 200) {
        let phoneNumbers = [];
        getPhoneNumbersRes.data.Allusers.map((numbers) => {
          phoneNumbers.push({
            value: numbers.phoneNumber,
            label: numbers.firstName + " " + numbers.lastName,
          });
        });
        dispatch(RsetSmsReciverOptions(phoneNumbers));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPhoneNumbersOptions();
  }, []);

  const speedVehicleHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (speedFormIsValid) {
      const values = {
        IMEI: currentDevice.deviceIMEI,
        emails: emailReciver,
        maxSpeed: vehicleSpeed,
        sendEmail: email,
        sendSMS: sms,
        settingsType: "speed",
        smsReciver: smsReciver,
      };
      const postSpeedLimitationRes = await postSpeedLimitation(values, token);
      if (postSpeedLimitationRes.data.code === 200) {
        successMessage("تغییرات با موفقیت انجام شد");
        speedVehicleHandlerReset();
      } else {
        errorMessage("خطا");
      }
    } else {
      dispatch(
        RsetFormErrors(
          speedValidation({
            vehicleSpeed,
            smsReciver,
            emailReciver,
          })
        )
      );
    }
  };

  const speedVehicleHandlerReset = () => {
    dispatch(RsetVehicleSpeed(""));
    dispatch(RsetSmsReciver(""));
    dispatch(RsetEmailReciver(""));
    dispatch(RsetFormErrors(""));
    setSms(false);
    setEmail(false);
  };

  //geo
  const timeToSendSmsIsValid = timeToSendSms !== "";
  const smsEmailIsValidGeo = sms === true || email === true;
  const deviceCordinateIsValid = deviceCordinate.length !== 0;
  const geoFormIsValid =
    timeToSendSmsIsValid &&
    emailSmsIsValid &&
    smsEmailIsValidGeo &&
    deviceCordinateIsValid;

  const geoValidation = () => {
    var errors = {};
    const borderValidation = "border border-danger";

    if (!timeToSendSmsIsValid) {
      errors.timeToSendSms = borderValidation;
    }
    if (!smsReciverIsValid) {
      errors.smsReciver = borderValidation;
    }
    if (!emailReciverIsValid) {
      errors.emailReciver = borderValidation;
    }
    if (!deviceCordinateIsValid) {
      errors.deviceCordinate = "ایجاد محدودیت بر روی نقشه اجباری است!";
    }
    if (!smsEmailIsValidGeo) {
      errors.smsEmailGeo = "انتخاب یکی از موارد اطلاع رسانی اجباری است!";
    }

    return errors;
  };

  const geoHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (geoFormIsValid) {
      const smsReciversItems = smsReciver.map((item) => {
        return item.value;
      });
      const values = {
        id: currentDevice._id,
        sendSMS: sms,
        smsNumbers: "",
        smsReceivers: sms
          ? smsReciver.length !== 0
            ? smsReciversItems
            : ""
          : "",
        sendEmail: email,
        emails: email ? emailReciver : "",
        smsInterval: timeToSendSms,
        coordinates: deviceCordinate,
      };
      const postGpsLimitRes = await postGpsLimit(token, values);
      if (postGpsLimitRes.status === 200) {
        successMessage("محدودیت با موفقیت اعمال شد");
        geoHandlerReset();
        dispatch(RsetDeviceAdjusmentModal(false));
        dispatch(RsetCurrentDevice(""));
      } else {
        errorMessage("خطا");
      }
    } else {
      dispatch(
        RsetFormErrors(
          geoValidation({
            timeToSendSms,
            smsReciver,
            emailReciver,
            deviceCordinate,
          })
        )
      );
    }
  };

  const geoHandlerReset = () => {
    setSms(false);
    setEmail(false);
    dispatch(RsetSmsReciver(""));
    dispatch(RsetEmailReciver(""));
    dispatch(RsetTimeToSendSms(""));
  };

  const geoDeleteHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const deviceId = currentDevice._id;
    const deleteGeoLimitRes = await deleteGeoLimit(deviceId, token);
    if (currentDevice.permissibleZone !== undefined) {
      if (deleteGeoLimitRes.status === 200) {
        successMessage("محدودیت با موفقیت برداشته شد");
        dispatch(RsetCurrentDevice(""));
        dispatch(RsetDeviceAdjusmentModal(false));
      } else {
        errorMessage("خطا");
      }
    } else {
      errorMessage("محدودیتی بروی دستگاه وجود ندارد!");
    }
  };

  //vehicle Condition
  const vehicleConditionIsValid = vehicleCondition !== "";

  const vehicleConditionValidation = () => {
    var errors = {};
    const borderValidation = "border border-danger";

    if (!vehicleConditionIsValid) {
      errors.vehicleCondition = borderValidation;
    }

    return errors;
  };

  const handleConditionOptions = () => {
    dispatch(RsetVehicleConditionOptions(conditionValues));
  };

  useEffect(() => {
    handleConditionOptions();
  }, []);

  const handleVehicleCondition = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (vehicleConditionIsValid) {
      const values = {
        status: vehicleCondition.label,
        imei: currentDevice.deviceIMEI,
        desc: vehicleConditionDescription,
      };
      const postVehicleConditionRes = await postVehicleCondition(values, token);
      console.log(postVehicleConditionRes);
      if (postVehicleConditionRes.data.code === 200) {
        successMessage("تغییرات با موفقیت انجام شد");
        handleVehicleConditionReset();
      } else {
        errorMessage("خطا");
      }
    } else {
      dispatch(
        RsetFormErrors(
          vehicleConditionValidation({
            vehicleCondition,
          })
        )
      );
    }
  };

  const handleVehicleConditionReset = () => {
    dispatch(RsetVehicleCondition(""));
    dispatch(RsetVehicleConditionDescription(""));
    dispatch(RsetFormErrors(""));
  };

  //GPS
  const deviceNumberIsValid = deviceNumber !== "";
  const deviceImeiIsValid = deviceImei !== "";
  const deviceTypeIsValid = deviceType !== "" && deviceType.length !== 0;
  const gpsFormIsValid =
    deviceNumberIsValid && deviceImeiIsValid && deviceTypeIsValid;

  const gspValidation = () => {
    var errors = {};
    const borderValidation = "border border-danger";

    if (!deviceNumberIsValid) {
      errors.deviceNumber = borderValidation;
    }
    if (!deviceImeiIsValid) {
      errors.deviceImei = borderValidation;
    }
    if (!deviceTypeIsValid) {
      errors.deviceType = borderValidation;
    }

    return errors;
  };

  useEffect(() => {
    dispatch(RsetDeviceTypeOptions(gpsValues));
  }, []);

  const handleGps = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (gpsFormIsValid) {
      //back wants like this
      const values = {
        vehicleId: currentDevice._id,
        simNumber: deviceNumber,
        deviceIMEI: deviceImei,
        plate: "",
        name: "",
        driverName: "",
        driverPhoneNumber: "",
        trackerModel: deviceType.label,
        fuel: "",
        model: "",
        usage: "",
      };
      const putGpsEditRes = await putGpsEdit(values, token);
      if (putGpsEditRes.data.code === 200) {
        successMessage("تغییرات با موفقیت انجام شد");
        handleGpsReset();
      } else {
        errorMessage("خطا");
      }
    } else {
      dispatch(
        RsetFormErrors(
          gspValidation({
            deviceNumber,
            deviceImei,
            deviceType,
          })
        )
      );
    }
  };

  const handleGpsReset = () => {
    dispatch(RsetDeviceNumber(""));
    dispatch(RsetDeviceImei(""));
    dispatch(RsetDeviceType(""));
  };

  return (
    <Modal
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // onHide={() => {
      //   dispatch(RsetDeviceAdjusmentModal(false));
      // }}
      show={deviceAdjusmentModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-dark text-white">
        <Modal.Title id="contained-modal-title-vcenter" className="fs-5">
          <span className="me-2">
            {" "}
            <FontAwesomeIcon icon={faScrewdriverWrench} />
          </span>
          تنضیمات
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => {
            setKey(k);
            setSms(false);
            setEmail(false);
            dispatch(RsetSmsReciver(""));
            dispatch(RsetEmailReciver(""));
            dispatch(RsetVehicleCondition(""));
            dispatch(RsetVehicleConditionDescription(""));
            dispatch(RsetVehicleSpeed(""));
          }}
          className="mb-3"
          fill
        >
          <Tab eventKey="speed" title="تنضیمات سرعت">
            <Form>
              <Row>
                <Form.Group as={Col} md="4">
                  <Form.Label className="required-field">
                    حداکثر سرعت(km/h):
                  </Form.Label>

                  <Form.Control
                    className={`${
                      !vehicleSpeedIsValid ? `${formErrors.vehicleSpeed}` : ""
                    }`}
                    type="text"
                    name="vehicleSpeed"
                    value={vehicleSpeed}
                    onChange={(e) => {
                      dispatch(RsetVehicleSpeed(e.target.value));
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md="8" className="mt-4 d-flex flex-column">
                  <Form.Check
                    inline
                    label="اطلاع از طریق پیامک"
                    name="sms"
                    value={sms}
                    checked={sms}
                    className="mt-2"
                    onChange={() => {
                      setSms(!sms);
                    }}
                  />
                  <Form.Check
                    inline
                    label="اطلاع از طریق ایمیل"
                    name="email"
                    value={email}
                    className="mt-2"
                    checked={email}
                    onChange={() => {
                      setEmail(!email);
                    }}
                  />
                  <div>
                    {!smsEmailIsValidSpeed ? (
                      <p className="text-danger font10">
                        {formErrors.smsEmailSpeed}
                      </p>
                    ) : null}
                  </div>
                </Form.Group>
              </Row>
              <Row>
                {sms && (
                  <>
                    <Form.Group as={Col} md="6" className="mt-5">
                      <Form.Label className="required-field">
                        گیرنده های پیامک:
                      </Form.Label>
                      <Select
                        className={`${
                          !smsReciverIsValid ? formErrors.smsReciver : ""
                        } borderRadius-15`}
                        value={smsReciverOptions.value}
                        name="driverReciver"
                        onChange={(e) => {
                          dispatch(RsetSmsReciver(e));
                        }}
                        placeholder="انتخاب از دفترچه تلفن"
                        options={smsReciverOptions}
                        isSearchable={true}
                        isMulti
                      />
                    </Form.Group>
                    {/* <Form.Group as={Col} md="4" className="mt-5">
                      <Form.Label className="required-field">
                        گیرنده های پیامک:
                      </Form.Label>
                      <Select
                        readOnly
                        // className={`${
                        //   !emailReciverIsValid
                        //     ? `${formErrors.emailReciver} borderRaduis-15`
                        //     : ""
                        // }`}
                        type="text"
                        name="smsReciver"
                        value={smsReciver}
                        // onChange={(e) => {
                        //   dispatch((e.target.value));
                        // }}
                      />
                    </Form.Group> */}
                  </>
                )}
                {email && (
                  <Form.Group as={Col} md="4" className="mt-5">
                    <Form.Label className="required-field">
                      گیرنده ایمیل:
                    </Form.Label>
                    <Form.Control
                      className={`${
                        !emailReciverIsValid ? `${formErrors.emailReciver}` : ""
                      }`}
                      type="text"
                      name="emailReciver"
                      value={emailReciver}
                      onChange={(e) => {
                        dispatch(RsetEmailReciver(e.target.value));
                      }}
                    />
                  </Form.Group>
                )}
              </Row>
              <Row>
                <Col md="5" xl="4" className="mx-auto d-flex mt-5">
                  <Button
                    variant="success"
                    className="mb-3 me-5 px-4"
                    onClick={(e) => {
                      speedVehicleHandler(e);
                    }}
                  >
                    ثبت
                  </Button>
                  <Button
                    variant="secondary"
                    type="reset"
                    className="mb-3 px-3 py-2"
                    onClick={() => {
                      dispatch(RsetVehicleSpeed(""));
                      dispatch(RsetSmsReciver(""));
                      dispatch(RsetEmailReciver(""));
                      dispatch(RsetFormErrors(""));
                      setSms(false);
                      setEmail(false);
                    }}
                  >
                    انصراف
                  </Button>
                </Col>
              </Row>
            </Form>
          </Tab>
          <Tab eventKey="geo" title="تنضیمات جغرافیایی">
            <div className="d-flex flex-column">
              <Form className="w-100">
                <Row>
                  <Form.Group as={Col} md="4">
                    <Form.Label className="required-field">
                      فاصله زمانی ارسال پیامک (ساعت):
                    </Form.Label>
                    <Form.Control
                      className={`${
                        !timeToSendSmsIsValid
                          ? `${formErrors.timeToSendSms} borderRaduis-15`
                          : ""
                      }`}
                      type="text"
                      name="sendingEmailPerHours"
                      value={timeToSendSms}
                      onChange={(e) => {
                        dispatch(RsetTimeToSendSms(e.target.value));
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" className="mt-3">
                    <div className="d-flex mt-3 flex-column">
                      <Form.Check
                        inline
                        label="اطلاع از طریق پیامک"
                        name="sms"
                        value={sms}
                        checked={sms}
                        onChange={() => {
                          setSms(!sms);
                        }}
                      />
                      <Form.Check
                        inline
                        label="اطلاع از طریق ایمیل"
                        name="email"
                        value={email}
                        checked={email}
                        onChange={() => {
                          setEmail(!email);
                        }}
                      />
                    </div>
                    <div>
                      {!smsEmailIsValidGeo ? (
                        <p className="text-danger font10">
                          {formErrors.smsEmailGeo}
                        </p>
                      ) : null}
                    </div>
                  </Form.Group>
                </Row>
                <Row>
                  {sms && (
                    <>
                      <Form.Group as={Col} md="4" className="mt-3">
                        <Form.Label className="required-field">
                          گیرنده های پیامک:
                        </Form.Label>
                        <Select
                          className={`${
                            !smsReciverIsValid ? formErrors.smsReciver : ""
                          } borderRadius-15`}
                          value={smsReciver}
                          name="driverReciver"
                          onChange={(e) => {
                            dispatch(RsetSmsReciver(e));
                          }}
                          placeholder="انتخاب از دفترچه تلفن"
                          options={smsReciverOptions}
                          isSearchable={true}
                          isMulti
                        />
                      </Form.Group>
                      {/* <Form.Group as={Col} md="4" className="mt-3">
                        <Form.Label className="required-field">
                          گیرنده های پیامک:
                        </Form.Label>
                        <Select
                          // className={`${
                          //   !emailReciverIsValid
                          //     ? `${formErrors.emailReciver} borderRaduis-15`
                          //     : ""
                          // }`}
                          type="text"
                          name="smsReciver"
                          value={smsReciver.lable}
                          // onChange={(e) => {
                          //   dispatch((e.target.value));
                          // }}
                        />
                      </Form.Group> */}
                    </>
                  )}
                  {email && (
                    <Form.Group as={Col} md="4" className="mt-3">
                      <Form.Label className="required-field">
                        گیرنده ایمیل:
                      </Form.Label>
                      <Form.Control
                        className={`${
                          !emailReciverIsValid
                            ? `${formErrors.emailReciver}`
                            : ""
                        }`}
                        type="text"
                        name="emailReciver"
                        value={emailReciver}
                        onChange={(e) => {
                          dispatch(RsetEmailReciver(e.target.value));
                        }}
                      />
                    </Form.Group>
                  )}
                </Row>
                <Row className="mt-5 mx-auto">
                  <Col md="5" xl="4" className="d-flex">
                    <Button
                      variant="success"
                      className="mb-3 me-5 px-4 font12"
                      onClick={(e) => {
                        geoHandler(e);
                      }}
                    >
                      ثبت
                    </Button>
                    <Button
                      variant="danger"
                      className="mb-3 me-5 px-4 font12"
                      onClick={(e) => {
                        geoDeleteHandler(e);
                      }}
                    >
                      حذف
                    </Button>
                    <Button
                      variant="secondary"
                      type="reset"
                      className="mb-3 px-4 py-2 font12"
                      onClick={() => {
                        dispatch(RsetTimeToSendSms(""));
                        dispatch(RsetSmsReciver(""));
                        dispatch(RsetEmailReciver(""));
                        dispatch(RsetFormErrors(""));
                        setSms(false);
                        setEmail(false);
                      }}
                    >
                      انصراف
                    </Button>
                  </Col>
                </Row>
              </Form>
              <div id="map" className="w-100 mt-5" style={{ height: "300px" }}>
                {!deviceCordinateIsValid && (
                  <p className="text-danger font10 mb-2">
                    {formErrors.deviceCordinate}
                  </p>
                )}
                <MapDraw height="300px" width="100%" />
              </div>
            </div>
          </Tab>
          <Tab eventKey="contact" title="تنضیمات وضعیت">
            <Form>
              <Row>
                <Form.Group>
                  <Form.Label>وضعیت فعلی دستگاه</Form.Label>
                  <Select
                    className={`mt-3 ${
                      !vehicleConditionIsValid
                        ? formErrors.vehicleCondition
                        : ""
                    }`}
                    value={vehicleCondition}
                    name="vehicleCondition"
                    onChange={(e) => {
                      dispatch(RsetVehicleCondition(e));
                    }}
                    placeholder="انتخاب..."
                    options={vehicleConditionOptions}
                    isSearchable={true}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="mt-3"
                    name="vehicleConditionDescription"
                    value={vehicleConditionDescription}
                    onChange={(e) => {
                      dispatch(RsetVehicleConditionDescription(e.target.value));
                    }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center mt-5">
                  <Button
                    variant="success"
                    className="mb-3 me-5 px-4"
                    onClick={(e) => {
                      handleVehicleCondition(e);
                    }}
                  >
                    ثبت
                  </Button>
                  <Button
                    variant="secondary"
                    type="reset"
                    className="mb-3 px-4"
                    onClick={() => {
                      dispatch(RsetVehicleCondition(""));
                      dispatch(RsetVehicleConditionDescription(""));
                      dispatch(RsetFormErrors(""));
                    }}
                  >
                    انصراف
                  </Button>
                </Col>
              </Row>
            </Form>
          </Tab>
          <Tab eventKey="gps" title="تنضیمات GPS">
            <Form>
              <Row>
                <Form.Group>
                  <Form.Label className="required-field">
                    شماره تلفن سیم کارت
                  </Form.Label>
                  <Form.Control
                    className={`${
                      !deviceNumberIsValid ? `${formErrors.deviceNumber}` : ""
                    }`}
                    type="text"
                    name="deviceNumber"
                    onChange={(e) => {
                      dispatch(RsetDeviceNumber(e.target.value));
                    }}
                    value={deviceNumber}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="required-field mt-4">
                    IMEI دستگاه
                  </Form.Label>
                  <Form.Control
                    className={`${
                      !deviceImeiIsValid
                        ? `${formErrors.deviceImei} borderRaduis-15`
                        : ""
                    }`}
                    type="text"
                    name="deviceImei"
                    onChange={(e) => {
                      dispatch(RsetDeviceImei(e.target.value));
                    }}
                    value={deviceImei}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="required-field mt-4">
                    نوع GPS
                  </Form.Label>
                  <Select
                    className={`${
                      !deviceTypeIsValid ? formErrors.deviceType : ""
                    }`}
                    value={deviceType}
                    name="DeviceType"
                    onChange={(e) => {
                      dispatch(RsetDeviceType(e));
                    }}
                    placeholder="انتخاب..."
                    options={deviceTypeOptions}
                    isSearchable={true}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Col md="5" xl="4" className="mx-auto d-flex mt-5">
                  <Button
                    variant="success"
                    className="mb-3 me-5 px-4"
                    onClick={(e) => {
                      handleGps(e);
                    }}
                  >
                    ثبت
                  </Button>
                  <Button
                    variant="secondary"
                    type="reset"
                    className="mb-3 px-5 py-2"
                    onClick={() => {
                      dispatch(RsetDeviceNumber(""));
                      dispatch(RsetDeviceImei(""));
                      dispatch(RsetDeviceType(""));
                      dispatch(RsetFormErrors(""));
                    }}
                  >
                    انصراف
                  </Button>
                </Col>
              </Row>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            dispatch(RsetDeviceAdjusmentModal(false));
            handleGpsReset();
            handleVehicleConditionReset();
            geoHandlerReset();
            speedVehicleHandlerReset();
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceAdjustmentModal;
