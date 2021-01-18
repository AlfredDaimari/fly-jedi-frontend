import { checkWithPnr, checkWithEDP } from "../../lib/booking";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import "../../css/BookingStatus.css";

// need two types of cards, based on conditional render
// one with enter pnr number, lastname, the other with email, dateOfTravel, phoneNumber

export default function BookingStatus(props) {
  const [pnr, setPnr] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [email, setEmail] = useState("");
  const [phNum, setPhNum] = useState("");
  const [lastName, setLastName] = useState("");
  const [valid, updateValid] = useState(false);
  const history = useHistory();

  function checkPnr() {
    checkWithPnr(pnr, lastName).then((res) => {
      if (res) {
        history.push("/book/show");
      } else {
        updateValid(true);
      }
    });
  }

  function checkEDP() {
    checkWithEDP(departDate, returnDate, email, phNum).then((res) => {
      if (res) {
        history.push("/book/show");
      } else {
        updateValid(true);
      }
    });
  }

  function submitStatus() {
    if (pnr !== "" && lastName !== "") {
      checkPnr();
    } else if (
      email !== "" &&
      departDate !== "" &&
      returnDate !== "" &&
      phNum !== ""
    ) {
      checkEDP();
    } else {
      updateValid(true);
    }
  }

  return (
    <div
      style={{
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: "27%",
        top: "23%",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "#ffe81f", marginBottom: "5%", fontSize: "50px" }}>
        Booking Status
      </h1>
      <div>
        <div style={{ display: "flex" }}>
          <span
            style={{ color: "#ffe81f", marginRight: "2%", fontSize: "25px" }}
          >
            PNR:
          </span>
          <input
            className="bookstatusinput"
            onChange={(event) => {
              setPnr(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
          ></input>
          <span
            style={{
              color: "#ffe81f",
              marginLeft: "9%",
              marginRight: "2%",
              fontSize: "25px",
            }}
          >
            Last Name:
          </span>
          <input
            className="bookstatusinput"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
          ></input>
        </div>
      </div>
      <div>
        <h2 style={{ color: "#ffe81f", marginTop: "15%", marginBottom: "15%" }}>
          -------OR-------
        </h2>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <span
            style={{ color: "#ffe81f", fontSize: "25px", marginRight: "2%", marginLeft:"4%" }}
          >
            Email:
          </span>
          <input
            className="bookstatusinput"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
          ></input>
          <span
            style={{
              color: "#ffe81f",
              fontSize: "25px",
              marginRight: "2%",
              marginLeft: "10%",
            }}
          >
            Phone Number:
          </span>
          <input
            className="bookstatusinput"
            onChange={(event) => {
              setPhNum(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
          ></input>
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <span
            style={{
              color: "#ffe81f",
              marginTop: "10px",
              fontSize: "25px",
              marginRight: "1%",
               marginLeft:"4%"
            }}
          >
            Depart Date:
          </span>
          <input
            type="date"
            min="2020-11-30"
            className="bookstatusinput"
            onChange={(event) => {
              setDepartDate(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
            style={{ marginTop: "10px" }}
          ></input>
          <span
            style={{
              color: "#ffe81f",
              marginTop: "10px",
              fontSize: "25px",
              marginRight: "2%",
              
            }}
          >
            Return Date:
          </span>
          <input
            type="date"
            min="2020-11-30"
            className="bookstatusinput"
            onChange={(event) => {
              setReturnDate(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
            style={{ marginTop: "10px" }}
          ></input>
        </div>
      </div>
      {valid ? (
        <div>
          <span style={{ color: "#ffe81f" }}>Invalid Input</span>
        </div>
      ) : (
        <div>
          <span style={{ color: "transparent" }}>Invalid Input</span>
        </div>
      )}
      <div>
        <button className="book-status-btn" onClick={submitStatus}>
          Get Booking Status
        </button>
      </div>
    </div>
  );
}
