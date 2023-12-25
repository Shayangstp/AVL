import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  RsetVehicleAddType,
  selectVehicleAddType,
  selectVehicleAdded,
  handleVehicleModlesList,
  handleAddVehicleType,
} from "../../slices/deviceSlices";
import { useDispatch, useSelector } from "react-redux";
import { RsetFormErrors, selectFormErrors } from "../../slices/mainSlices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faAdd, faCar } from "@fortawesome/free-solid-svg-icons";

const AddVehicle = () => {
  const dispatch = useDispatch();
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
    } else {
      dispatch(RsetFormErrors(validation({ vehicleAddType })));
    }
  };

  useEffect(() => {
    dispatch(handleVehicleModlesList());
  }, []);

  return (
    <Container className="mt-5 d-flex flex-column flex-md-row justify-content-md-between">
      <Form>
        <Row className="shadow bg-white borderRadius-15 mx-auto">
          <div className="deviceHeader p-3">
            <span className="me-2">
              <FontAwesomeIcon icon={faAdd} />
            </span>
            افزودن مدل دستگاه ﺟﺪﯾﺪ
          </div>
          <div className="p-4 bg-white borderRadius-15">
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
            <Form.Group className="d-flex flex-column flex-sm-row justify-content-center mt-4">
              <Button
                variant="success"
                className="mb-3 me-sm-5 font12 px-4"
                onClick={(e) => {
                  handleVehicleModel(e);
                }}
              >
                ثبت
              </Button>
              <Button
                variant="secondary"
                type="reset"
                className="mb-3 font12 px-4"
                onClick={() => {
                  dispatch(RsetFormErrors(""));
                  dispatch(RsetVehicleAddType(""));
                }}
              >
                انصراف
              </Button>
            </Form.Group>
          </div>
        </Row>
      </Form>
      <Row>
        <div
          className="ms-0 ms-md-3 mt-3 mt-md-0 borderRadius-15 lightGray-bg shadow borderRadius-15 border border-white border-2"
          style={{ right: "350px" }}
        >
          <ul className="ms-5 mt-4 d-flex flex-column flex-wrap">
            {vehicleAdded.map((i, idx) => {
              return (
                <li key={idx} className="text-secondary mt-4">
                  {i.name}
                </li>
              );
            })}
          </ul>
        </div>
      </Row>
    </Container>
  );
};

export default AddVehicle;
