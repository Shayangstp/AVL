import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DashboardMap from "./map/DashboardMap";
import { useDispatch, useSelector } from "react-redux";
import { handleAllGpsesList } from "../slices/mainSlices";
import { Button, Row, Col } from "react-bootstrap";
import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
} from "react-advance-jalaali-datepicker";
import UserChart from "./common/charts/UserChart";
import GpsChart from "./common/charts/GpsChart";

const chartOne = [
  {
    name: "تعداد کاربران",
    color: "#000",
  },
  {
    name: "تعداد کاربران",
    color: "#000",
  },
  {
    name: "تعداد کاربران",
    color: "#000",
  },
];

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAllGpsesList());
  }, []);
  return (
    <div className="d-flex flex-column mt-3">
      <Row>
        <Col md="5" className="mt-3">
          <div
            className="p-1 borderRadius-15"
            style={{ background: "#f2f2f2" }}
          >
            <div className="border d-flex flex-column bg-white borderRadius-15 shadow">
              <div
                className="text-dark borderRadius-top p-3"
                style={{ background: "#F6BD60" }}
              >
                <div className="font12 ">
                  کاربران فعال{" "}
                  <span className="bg-white borderRadius-15 px-3 ms-2 shadow">
                    850 +{" "}
                  </span>
                </div>
              </div>
              <div className="mx-auto">
                <UserChart width={300} height={300} />
              </div>
              <div className="d-flex gap-3 justify-content-center">
                {chartOne.map((item, index) => {
                  return (
                    <div className="d-flex gap-1 mb-4">
                      <div
                        className="border bg-dark mt-1"
                        style={{ height: "10px", width: "10px" }}
                      ></div>
                      <span className="font12"> کاربران </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Col>
        <Col md="7" className="mt-3">
          <div className="shadow" style={{ height: "85vh" }}>
            <DashboardMap height={"100%"} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
