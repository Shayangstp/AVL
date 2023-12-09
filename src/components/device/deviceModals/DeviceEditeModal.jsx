import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  RsetDeviceEditModal,
  selectDeviceEditModal,
} from "../../../slices/modalSlices";
import { NumericFormat } from "react-number-format";
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
import {
  RsetVehicleNumber,
  RsetVehicleType,
  RsetVehicleCompany,
  RsetDriverName,
  RsetDriverNumber,
  RsetVehicleGas,
  RsetVehicleUsing,
  RsetEditTimeStamp,
  RsetDeviceNumber,
  RsetVehicleId,
  RsetDeviceImei,
  RsetDeviceType,
  RsetCurrentDevice,
  selectVehicleNumber,
  selectVehicleType,
  selectVehicleCompany,
  selectDriverName,
  selectDriverNumber,
  selectVehicleGas,
  selectVehicleUsing,
  selectEditTimeStamp,
  selectVehicleId,
  selectDeviceNumber,
  selectDeviceImei,
  selectDeviceType,
  selectCurrentDevice,
  selectVehicleTypeOptions,
  handleVehicleTypeOptions,
} from "../../../slices/deviceSlices";
import { editDeviceList } from "../../../services/deviceServices";
import { errorMessage, successMessage } from "../../../utils/msg";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import moment from "moment-jalaali";
import { getDeviceType } from "../../../services/deviceServices";

const DeviceEditeModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deviceEditModal = useSelector(selectDeviceEditModal);
  const vehicleNumber = useSelector(selectVehicleNumber);
  const vehicleType = useSelector(selectVehicleType);
  const vehicleCompany = useSelector(selectVehicleCompany);
  const driverName = useSelector(selectDriverName);
  const driverNumber = useSelector(selectDriverNumber);
  const vehicleGas = useSelector(selectVehicleGas);
  const vehicleUsing = useSelector(selectVehicleUsing);
  const editTimeStamp = useSelector(selectEditTimeStamp);
  const vehiclelId = useSelector(selectVehicleId);
  const deviceNumber = useSelector(selectDeviceNumber);
  const deviceImei = useSelector(selectDeviceImei);
  const deviceType = useSelector(selectDeviceType);
  const currentDevice = useSelector(selectCurrentDevice);
  const vehicleTypeOptions = useSelector(selectVehicleTypeOptions);

  useEffect(() => {
    dispatch(handleVehicleTypeOptions());
  }, []);

  useEffect(() => {
    const apiDate = currentDevice.createDate;
    const dateParts = apiDate.split(" ");
    const day = parseInt(dateParts[2], 10);
    const month = moment().month(dateParts[1]).format("jMM");
    const year = parseInt(dateParts[3], 10);
    const persianDate = `${year}/${month}/${day}`;

    dispatch(RsetVehicleNumber(currentDevice.plate));
    dispatch(RsetVehicleCompany(currentDevice.vehicleName));
    dispatch(RsetVehicleType({ label: currentDevice.model.name, value: 1 }));
    dispatch(RsetDriverName(currentDevice.driverName));
    dispatch(RsetDriverNumber(currentDevice.driverPhoneNumber));
    dispatch(RsetVehicleUsing(currentDevice.usage));
    dispatch(RsetVehicleGas(currentDevice.fuel));
    dispatch(
      RsetEditTimeStamp(
        moment
          .utc(persianDate, "YYYY/MM/DD")
          .locale("fa")
          .format("jYYYY/jMM/jDD")
      )
    );
    dispatch(RsetVehicleId(currentDevice._id));
    dispatch(RsetDeviceNumber(currentDevice.simNumber));
    dispatch(RsetDeviceImei(currentDevice.deviceIMEI));
    dispatch(RsetDeviceType(currentDevice.trackerModel));
    dispatch(RsetCurrentDevice(currentDevice));
  }, [currentDevice]);

  const handleUpdateData = async () => {
    const token = localStorage.getItem("token");
    const values = {
      vehicleId: vehiclelId,
      simNumber: deviceNumber,
      deviceIMEI: deviceImei,
      plate: vehicleNumber,
      name: vehicleCompany,
      driverName: driverName,
      driverPhoneNumber: driverNumber,
      trackerModel: deviceType,
      fuel: vehicleGas,
      model: vehicleType.label,
      usage: vehicleUsing,
    };
    const editDeviceListRes = await editDeviceList(values, token);
    console.log(editDeviceListRes);
    if (editDeviceListRes.data.code === 200) {
      dispatch(RsetDeviceEditModal(false));
      successMessage("ویرایش با موفقیت انجام شد");
      dispatch(RsetCurrentDevice(""));
    } else {
      errorMessage("خطا");
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // onHide={() => {
      //   dispatch(RsetDeviceEditModal(false));
      //   dispatch(RsetVehicleNumber(""));
      //   dispatch(RsetVehicleCompany(""));
      //   dispatch(RsetVehicleType(""));
      //   dispatch(RsetDriverName(""));
      //   dispatch(RsetDriverNumber(""));
      //   dispatch(RsetVehicleUsing(""));
      //   dispatch(RsetVehicleGas(""));
      //   dispatch(RsetEditTimeStamp(null));
      //   dispatch(RsetVehicleId(""));
      //   dispatch(RsetDeviceNumber(""));
      //   dispatch(RsetDeviceImei(""));
      //   dispatch(RsetDeviceType(""));
      //   dispatch(RsetDeviceEditModal(false));
      // }}
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
                value={vehicleNumber}
                onChange={(e) => {
                  dispatch(RsetVehicleNumber(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field">شرکت سازنده:</Form.Label>
              <Form.Control
                // className={`form-control ${
                //   !deviceNumberIsValid ? formErrors.deviceNumber : ""
                // }`}
                type="text"
                name="vehicleCompany"
                value={vehicleCompany}
                onChange={(e) => {
                  dispatch(RsetVehicleCompany(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="required-field"> مدل:</Form.Label>
              <Select
                // className={`${
                //   !vehicleTypeIsValid ? formErrors.vehicleType : ""
                // }`}
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
                value={vehicleGas}
                onChange={(e) => {
                  dispatch(RsetVehicleGas(e.target.value));
                }}
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
                value={driverName}
                onChange={(e) => {
                  dispatch(RsetDriverName(e.target.value));
                }}
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
                maxLength={11}
                type="text"
                name="driverNumber"
                value={driverNumber}
                onChange={(e) => {
                  dispatch(RsetDriverNumber(e.target.value));
                }}
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
                value={vehicleUsing}
                onChange={(e) => {
                  dispatch(RsetVehicleUsing(e.target.value));
                }}
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
                readOnly
                type="text"
                name="setup"
                value={editTimeStamp}
                onChange={(e) => {
                  dispatch(RsetEditTimeStamp(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" className="mt-4">
              <Button
                variant="success"
                className="mb-3 me-5 px-4"
                onClick={(e) => {
                  handleUpdateData(e);
                }}
              >
                ثبت
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            dispatch(RsetDeviceEditModal(false));
            dispatch(RsetVehicleNumber(""));
            dispatch(RsetVehicleCompany(""));
            dispatch(RsetVehicleType(""));
            dispatch(RsetDriverName(""));
            dispatch(RsetDriverNumber(""));
            dispatch(RsetVehicleUsing(""));
            dispatch(RsetVehicleGas(""));
            dispatch(RsetEditTimeStamp(null));
            dispatch(RsetVehicleId(""));
            dispatch(RsetDeviceNumber(""));
            dispatch(RsetDeviceImei(""));
            dispatch(RsetDeviceType(""));
          }}
        >
          بستن
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeviceEditeModal;
