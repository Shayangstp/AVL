import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const tokenIsValid = localStorage.getItem("token") ? true : false;
  return (
    <div>
      <div className="page-404">
        <div className="outer">
          <div className="middle">
            <div className="inner">
              <div className="inner-circle">
                <i className="fa fa-home"></i>
                <span>404</span>
              </div>
              <span className="inner-status">Oops! You're lost</span>
              <span className="inner-detail">
                We can not find the page you're looking for.
                <Button
                  className="btn btn-info mtl"
                  onClick={() => {
                    if (tokenIsValid) {
                      navigate("home");
                    } else {
                      navigate("/");
                    }
                  }}
                >
                  <i className="fa fa-home"></i>&nbsp; Return home
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
