import React, { Fragment } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { selectUser } from "../../slices/mainSlices";
import { useDispatch, useSelector } from "react-redux";
import NavbarOff from "../common/NavbarOff";

const MainLayout = (props) => {
  const user = useSelector(selectUser);

  return (
    <div className="px-0">
      {user.id !== undefined && (
        <div className="m-0 h-100">
          <Row className="m-0">
            <Col sm="12" className="p-0  d-none d-xl-inline">
              <Header />
            </Col>
            <Col sm="12" className="p-0 d-inline d-xl-none">
              <NavbarOff />
            </Col>
          </Row>
          <Row className="d-flex m-0">
            <Col sm="2" lg="3" xl="2" className="d-none d-xl-inline p-0">
              <Sidebar />
            </Col>
            <Col sm="12" xl="10" className="p-0 min-vh-100">
              {props.children}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
