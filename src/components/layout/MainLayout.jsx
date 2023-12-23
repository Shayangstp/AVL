import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import { selectUser } from "../../slices/mainSlices";
import { useDispatch, useSelector } from "react-redux";
import NavbarOff from "../common/NavbarOff";
import { RsetSmallNav, selectSmallNav } from "../../slices/mainSlices";

const MainLayout = (props) => {
  const user = useSelector(selectUser);
  const smallNav = useSelector(selectSmallNav);

  return (
    <div className="bg-dark p-2">
      {user.id !== undefined && (
        <div className="m-0 h-100 bg-white p-1 borderRadius-15">
          <Row className="m-0">
            <Col
              sm="2"
              xl={!smallNav ? "1" : "2"}
              className="d-none d-xl-inline border p-0"
            >
              <Sidebar />
            </Col>
            <Col
              sm="12"
              xl={!smallNav ? "11" : "10"}
              className="p-0 min-vh-100"
            >
              <Header />
              {props.children}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
