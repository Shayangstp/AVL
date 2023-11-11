import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  RsetVehicleAddType,
  selectVehicleAddType,
  RsetVehicleAdded,
  selectVehicleAdded,
} from "../../slices/deviceSlices";
import { useDispatch, useSelector } from "react-redux";
import { RsetFormErrors, selectFormErrors } from "../../slices/mainSlices";
import { postAddVehicle } from "../../services/deviceServices";
import { errorMessage, successMessage } from "../../utils/msg";
import { getDeviceType } from "../../services/deviceServices";
import { useNavigate } from "react-router";

const AddVehicle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleAddVehicleType = async (e) => {
    e.preventDefault();
    if (vehicleAddTypeIsValid) {
      console.log(vehicleAddType);
      const value = {
        vehicleType: vehicleAddType,
      };
      const postAddVehicleRes = await postAddVehicle(value);
      console.log(postAddVehicleRes);
      if (postAddVehicleRes.data.code === 200) {
        successMessage("مدل دستگاه با موفقیت اضافه شد");
        navigate(0);
      } else {
        errorMessage("خطا!");
      }
    } else {
      dispatch(RsetFormErrors(validation({ vehicleAddType })));
    }
  };

  const getVehicleModles = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const getDeviceTypeRes = await getDeviceType(token);
    console.log(getDeviceTypeRes);
    dispatch(RsetVehicleAdded(getDeviceTypeRes.data.foundedItem));
  };

  useEffect(() => {
    getVehicleModles();
  }, []);

  console.log(vehicleAdded);

  return (
    <Container className="h-75 mt-5 d-flex flex-column flex-md-row justify-content-md-between">
      <Form>
        <div className="border p-5 borderRadius-15">
          <Row className="">
            <div className="mb-4">-افزودن مدل دستگاه ﺟﺪﯾﺪ</div>
            <Form.Group as={Col} md="12">
              <Form.Label className="required-field">نام مدل: </Form.Label>
              <Form.Control
                className={`${
                  !vehicleAddTypeIsValid ? formErrors.vehicleAddType : ""
                }`}
                type="text"
                name=""
                value={vehicleAddType}
                onChange={(e) => {
                  dispatch(RsetVehicleAddType(e.target.value));
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mt-4 mb-5">
            <Col className="d-flex flex-column flex-sm-row mt-4 justify-conten-center">
              <Button
                variant="success"
                className="mb-3 me-sm-5 font12 px-5"
                onClick={(e) => {
                  console.log("hi");
                  handleAddVehicleType(e);
                }}
              >
                ثبت
              </Button>
              <Button
                variant="secondary"
                type="reset"
                className="mb-3 font12 px-5"
                onClick={() => {
                  dispatch(RsetFormErrors(""));
                  dispatch(RsetVehicleAddType(""));
                }}
              >
                انصراف
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
      <Col md="7" className="border borderRadius-15 h-100">
        <ul className="ms-5 mt-4">
          {vehicleAdded.map((i, idx) => {
            return (
              <li key={idx} className="text-secondary mt-4">
                {i.name}
              </li>
            );
          })}
        </ul>
      </Col>
    </Container>
  );
};

export default AddVehicle;
