import React from "react";
import butterfly from "../images/butterfly.png";
import { Link } from "react-router-dom";

const centerH2 = {
  textAlign: "center",
  marginTop: "50px",
  fontFamily: "Fasthand, recursive",
  fontSize: "36px",
};

const centerImg = {
  display: "block",
  margin: "40px auto",
};

const ErrorPage = () => {
  return (
    <div className="index-item">
      <div className="container">
        <h2 style={centerH2}>Oups, wrong direction!</h2>
        <div className="text-center">
          <Link
            to="/"
            className="btn btn-primary mt-2 "
            style={{ backgroundColor: "hotpink", border: "1px solid hotpink" }}
          >
            Go Back
          </Link>
        </div>
        <img
          style={centerImg}
          src={butterfly}
          alt="error page"
          className="img-fluid"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
