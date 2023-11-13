import React, { useState } from "react";
import {
  RsetDeviceAdjusmentModal,
  selectDeviceAdjusmentModal,
} from "../../../../slices/modalSlices";
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
} from "../../../../slices/deviceSlices";
import {
  RsetFormErrors,
  selectFormErrors,
} from "../../../../slices/mainSlices";
import MapDraw from "../../../map/MapDraw";

const DeviceAdjustmentModal = () => {
  const [key, setKey] = useState("speed");
  const [sms, setSms] = useState(false);
  const [email, setEmail] = useState(false);

  const dispatch = useDispatch();
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

  //validation common
  const smsReciverIsValid = smsReciver.length !== 0;
  const emailReciverIsValid = emailReciver !== "";
  const emailSmsIsValid = smsReciverIsValid || emailReciverIsValid;
  //speed
  const vehicleSpeedIsValid = vehicleSpeed !== "";

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

    return errors;
  };

  const speedVehicleHandler = (e) => {
    e.preventDefault();
    if (speedFormIsValid) {
      console.log({
        vehicleSpeed,
        smsReciver,
        emailReciver,
      });
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

  //geo
  const timeToSendSmsIsValid = timeToSendSms !== "";
  const geoFormIsValid = timeToSendSmsIsValid && emailSmsIsValid;

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

    return errors;
  };
  const geoHandler = (e) => {
    e.preventDefault();
    if (geoFormIsValid) {
      console.log({
        timeToSendSms,
        smsReciver,
        emailReciver,
      });
    } else {
      dispatch(
        RsetFormErrors(
          geoValidation({
            timeToSendSms,
            smsReciver,
            emailReciver,
          })
        )
      );
    }
  };

  //vehicle Condition
  const vehicleConditionIsValid =
    vehicleCondition.length !== 0 && vehicleCondition !== "";

  const vehicleConditionValidation = () => {
    var errors = {};
    const borderValidation = "border border-danger";

    if (!vehicleConditionIsValid) {
      errors.vehicleCondition = borderValidation;
    }

    return errors;
  };

  const handleVehicleCondition = (e) => {
    e.preventDefault();
    if (vehicleConditionIsValid) {
      console.log({
        vehicleCondition,
      });
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

  const handleGps = (e) => {
    e.preventDefault();
    if (gpsFormIsValid) {
      console.log({
        deviceNumber,
        deviceImei,
        deviceType,
      });
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

  return (
    <Modal
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        dispatch(RsetDeviceAdjusmentModal(false));
      }}
      show={deviceAdjusmentModal}
      className="borderRadius-15"
    >
      <Modal.Header className="bg-primary text-white">
        <Modal.Title id="contained-modal-title-vcenter" className="fs-5">
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
          }}
          className="mb-3"
          fill
        >
          <Tab eventKey="speed" title="تنضیمات سرعت">
            <Form>
              <Row>
                <Form.Group>
                  <Form.Label className="required-field">
                    حداکثر سرعت(km/h):
                  </Form.Label>

                  <Form.Control
                    className={`${
                      !vehicleSpeedIsValid
                        ? `${formErrors.vehicleSpeed} borderRaduis-15`
                        : ""
                    }`}
                    type="text"
                    name="vehicleSpeed"
                    value={vehicleSpeed}
                    onChange={(e) => {
                      dispatch(RsetVehicleSpeed(e.target.value));
                    }}
                  />
                </Form.Group>
                <div className="d-flex mt-3">
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
                {sms && (
                  <div>
                    <Form.Group>
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
                          multi
                        />
                      </Form.Group>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="required-field mt-4">
                        گیرنده های پیامک:
                      </Form.Label>
                      <Form.Control
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
                    </Form.Group>
                  </div>
                )}
                {email && (
                  <Form.Group>
                    <Form.Label className="required-field mt-4">
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
                      console.log("hi");
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
                    <div className="d-flex mt-3">
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
                          multi
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="4" className="mt-3">
                        <Form.Label className="required-field">
                          گیرنده های پیامک:
                        </Form.Label>
                        <Form.Control
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
                      </Form.Group>
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
                    className={`mt-3${
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
                <Col md="5" xl="4" className="mx-auto d-flex mt-5">
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
                    className="mb-3 px-5 py-2"
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
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceAdjustmentModal;
