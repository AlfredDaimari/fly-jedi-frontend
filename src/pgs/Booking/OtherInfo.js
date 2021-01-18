import React from "react";
import "../../css/Payment.css";
import Payment from "./Payment";

export default function OtherInfo(props) {
  return (
    <div style={{ background: "black" }}>
      <h1
        style={{
          color: "white",
          marginLeft: "30px",
          borderBottom: "3px #ffe81f solid",
        }}
      >
        Passenger Details:
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                margin: "2px 0px 2px 0px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "200px" }}>
                <p className="oth-inf-label">First Name:</p>
              </div>
              <input
                className="book-input"
                autoComplete="off"
                type="text"
                value={props.firstName}
                onChange={(event) => {
                  props.changeFirstName(event.target.value);
                }}
                onClick={() => {
                  props.changeValid(false);
                }}
              />
            </div>

            <div
              style={{
                margin: "2px 0px 2px 0px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "200px" }}>
                <p className="oth-inf-label">Last Name:</p>
              </div>
              <input
                value={props.lastName}
                className="book-input"
                autoComplete="off"
                type="text"
                onChange={(event) => {
                  props.changeLastName(event.target.value);
                }}
                onClick={() => {
                  props.changeValid(false);
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                margin: "2px 0px 2px 0px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "200px" }}>
                <p className="oth-inf-label"> Email :</p>
              </div>
              <input
                value={props.email}
                className="book-input"
                autoComplete="off"
                type="text"
                onChange={(event) => {
                  props.changeEmail(event.target.value);
                }}
                onClick={() => {
                  props.changeValid(false);
                }}
              />
            </div>
            <div
              style={{
                margin: "2px 0px 2px 0px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "200px" }}>
                <p className="oth-inf-label"> Phone:</p>
              </div>
              <input
                value={props.phoneNumber}
                className="book-input"
                autoComplete="off"
                type="text"
                onChange={(event) => {
                  props.changePhoneNumber(event.target.value);
                }}
                onClick={() => {
                  props.changeValid(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {props.type === "new" && <Payment />}
      <button className="book-flightbtn" onClick={props.book}>
        {props.type === "update" ? "Update Booking" : "Buy Tickets"}
      </button>

      {props.valid ? (
        <p style={{ color: "white", marginLeft:"10%", fontSize:"20px" }}>
          Error in input Email may not be unique or fields may be empty.
        </p>
      ) : (
        <p style={{ color: "transparent" }}>
          Error in input. Email may not be unique or fields may be empty.
        </p>
      )}
    </div>
  );
}
