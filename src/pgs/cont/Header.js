import React from "react";
import { Link } from "react-router-dom";
import SignStatus from "../cont/SignStatus";

import "../../css/Header.css";

export default function Header(props) {
  return (
    <div className="header">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "20px",
          marginBottom: "5px",
        }}
      >
        <h1 className="heading">FLY</h1>
        <img className="heading-icon" src="/img/lightsaber.png" alt ="" />
        <h1 className="heading">JEDI</h1>
      </div>
      <div className="sign-home-status-container">
        <Link to="/explore" className="header-links">
          Explore |
        </Link>
        <Link to="/" className="header-links">
          Home |
        </Link>
        <Link to="/thesystem/none" className="header-links">
          Search Flight |
        </Link>
        <Link to="/book/get" className="header-links">
          Booking Status |
        </Link>
        <SignStatus user={props.user} />
      </div>
    </div>
  );
}
