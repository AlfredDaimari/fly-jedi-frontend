// will receive data from App, the link sent back will depend on the data received

import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import "../../css/SignStatus.css";

export default function SignStatus(props) {
  return props.user.firstName !== "" ? (
    <Link to="/profile/userupdate" style={{ textDecoration: "none" }}>
      <div className="sign-status-user">
        <Avatar src={props.user.img} />
      </div>
    </Link>
  ) : (
    <div>
      <Link
        to="/signin"
        style={{
          color: "#FFE81F",
          textDecoration: "none",
          marginRight: "5px",
          fontSize: "17px",
        }}
      >
        {" "}
        Sign In
      </Link>
    </div>
  );
}
