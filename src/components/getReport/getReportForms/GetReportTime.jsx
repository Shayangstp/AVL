import React, { useState } from "react";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  RsetGetReportFromTime,
  RsetGetReportToTime,
  selectGetReportFromTime,
  selectGetReportToTime,
} from "../../../slices/getReportSlices";

const GetReportTime = () => {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const getReportFromTime = useSelector(selectGetReportFromTime);
  const getReportToTime = useSelector(selectGetReportToTime);

  let fromOrTo = "";

  const handleDecrement = () => {
    if (fromOrTo === "from") {
      if (getReportFromTime > 1) {
        dispatch(RsetGetReportFromTime(getReportFromTime - 1));
      }
    } else if (fromOrTo === "to") {
      if (getReportToTime > 1) {
        dispatch(RsetGetReportToTime(getReportToTime - 1));
      }
    }
  };
  const handleIncrement = () => {
    if (fromOrTo === "from") {
      if (getReportFromTime < 24) {
        dispatch(RsetGetReportFromTime(getReportFromTime + 1));
      }
    } else if (fromOrTo === "to") {
      if (getReportToTime < 24) {
        dispatch(RsetGetReportToTime(getReportToTime + 1));
      }
    }
  };

  return (
    <Form className="border p-3 bg-light rounded">
      <Form.Group>
        <Form.Label>ساعت</Form.Label>
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
            <Form.Control
              type="number"
              min={1}
              max={24}
              value={getReportFromTime}
              onChange={(e) => {
                fromOrTo = "from";
                if (e.target.value > 24) {
                  dispatch(RsetGetReportFromTime(24));
                } else if (e.target.value < 0) {
                  dispatch(RsetGetReportFromTime(0));
                } else {
                  dispatch(RsetGetReportFromTime(parseInt(e.target.value)));
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
        <Form.Group className="mt-2">
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
            <Form.Control
              type="number"
              min={1}
              max={24}
              value={getReportToTime}
              onChange={(e) => {
                fromOrTo = "to";
                if (e.target.value > 24) {
                  dispatch(RsetGetReportToTime(24));
                } else if (e.target.value < 0) {
                  dispatch(RsetGetReportToTime(0));
                } else {
                  dispatch(RsetGetReportToTime(parseInt(e.target.value)));
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
      </Form.Group>
    </Form>
  );
};

export default GetReportTime;