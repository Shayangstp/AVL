import React, { useState } from "react";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  RsetGetReportFromSpeed,
  RsetGetReportToSpeed,
  selectGetReportFromSpeed,
  selectGetReportToSpeed,
} from "../../../slices/getReportSlices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faGauge } from "@fortawesome/free-solid-svg-icons";

const GetReportSpeed = () => {
  const dispatch = useDispatch();
  const getReportFromSpeed = useSelector(selectGetReportFromSpeed);
  const getReportToSpeed = useSelector(selectGetReportToSpeed);

  let fromOrTo = "";

  const handleDecrement = () => {
    if (fromOrTo === "from") {
      if (getReportFromSpeed > 1) {
        dispatch(RsetGetReportFromSpeed(getReportFromSpeed - 1));
      }
    } else if (fromOrTo === "to") {
      if (getReportToSpeed > 1) {
        dispatch(RsetGetReportToSpeed(getReportToSpeed - 1));
      }
    }
  };
  const handleIncrement = () => {
    if (fromOrTo === "from") {
      dispatch(RsetGetReportFromSpeed(getReportFromSpeed + 1));
    } else if (fromOrTo === "to") {
      dispatch(RsetGetReportToSpeed(getReportToSpeed + 1));
    }
  };

  return (
    <Form className="bg-light borderRadius-bottom shadow">
      <Form.Group>
        <div className="reportHeader p-3" style={{ background: "#eab56f" }}>
          <span className="me-2">
            <FontAwesomeIcon icon={faGauge} />
          </span>
          سرعت
        </div>
        <div className="p-3 borderRadius-15">
          <Form.Group className="mt-2">
            <Form.Label>از</Form.Label>
            <div className="d-flex ">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  fromOrTo = "from";
                  handleDecrement();
                }}
              >
                -
              </Button>
              <div
                className="text-white d-flex align-items-center outline-secondary rounded me-1 ms-1 "
                style={{ background: "#228DAF" }}
              >
                <span className="p-1">Km/h</span>
              </div>
              <Form.Control
                type="number"
                min={1}
                // max={24}
                value={getReportFromSpeed}
                onChange={(e) => {
                  fromOrTo = "from";
                  if (e.target.value < 0) {
                    dispatch(RsetGetReportFromSpeed(0));
                  } else {
                    dispatch(RsetGetReportFromSpeed(parseInt(e.target.value)));
                  }
                }}
              />

              <Button
                variant="outline-secondary"
                onClick={() => {
                  fromOrTo = "from";
                  handleIncrement();
                }}
              >
                +
              </Button>
            </div>
          </Form.Group>
          <Form.Group className="mt-2 mb-3">
            <Form.Label>تا</Form.Label>
            <div className="d-flex ">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  fromOrTo = "to";
                  handleDecrement();
                }}
              >
                -
              </Button>
              <div
                className="text-white d-flex align-items-center outline-secondary rounded me-1 ms-1 "
                style={{ background: "#228DAF" }}
              >
                <span className="p-1">Km/h</span>
              </div>
              <Form.Control
                type="number"
                min={1}
                // max={24}
                value={getReportToSpeed}
                onChange={(e) => {
                  fromOrTo = "to";
                  if (e.target.value < 0) {
                    dispatch(RsetGetReportToSpeed(0));
                  } else {
                    dispatch(RsetGetReportToSpeed(parseInt(e.target.value)));
                  }
                }}
              />
              <Button
                variant="outline-secondary"
                onClick={() => {
                  fromOrTo = "to";
                  handleIncrement();
                }}
              >
                +
              </Button>
            </div>
          </Form.Group>
        </div>
      </Form.Group>
    </Form>
  );
};

export default GetReportSpeed;
