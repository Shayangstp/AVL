import React from "react";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div className="bg-primary h-100">
      <div className="border">
        <div className="bg-dark text-white border"> this is test</div>
      </div>
      <div className="border border-danger mt-4 ">
        <div className="bg-dark text-white"> this is test</div>
      </div>
    </div>
  );
};

export default Home;
