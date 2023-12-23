import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import DashboardMap from "./map/DashboardMap";
import { useDispatch, useSelector } from "react-redux";
import { handleAllGpsesList } from "../slices/mainSlices";
import { Button, Row, Col } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAllGpsesList());
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <div className="border">
            <div>
              کاربران فعال
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <DashboardMap height={"100px"} width={"100px"} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
