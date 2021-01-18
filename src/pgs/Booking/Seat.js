import React from "react";

import "../../css/Seat.css";

function SeatIconInfo() {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div>
        <span className="seat-info-span">Seat Selected:</span>
        <button className="seat-selected">SS</button>
      </div>
      <div>
        <span className="seat-info-span">Seat Reserved:</span>
        <button className="disabled-seat">SR</button>
      </div>
      <div>
        <span className="seat-info-span">Seat Unreserved:</span>
        <button className="seat">SU</button>
      </div>
    </div>
  );
}

export default function Seat(props) {
  var allSeats = [];
  // loop for rendering all seats

  const ftype = props.flightType === "Razor Crest";

  for (let i = 1; i <= (ftype ? 5 : 6); i += 1) {
    var row = [];
    for (let j of ftype
      ? ["A", "B"]
      : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]) {
      row.push(
        <div key={i + j}>
          {props.reservedSeats.includes(i + j) ? (
            <button disabled className="disabled-seat">
              {" "}
              {i + j}
            </button>
          ) : (
            <button
              className={
                props.selectedSeat === i + j ? "seat-selected" : "seat"
              }
              onClick={() => {
                props.addToSeats(i + j);
              }}
            >
              {i + j}
            </button>
          )}
        </div>
      );
    }
    allSeats.push(
      <div
        style={{
          display: "flex",
          color: "black",
          fontSize: "30px",
          fontWeight: "bold",
        }}
        key={i}
      >
        {row}
      </div>
    );
  }

  return (
    <div style={{ width: "45%", position: "relative", bottom: "20px" }}>
      <SeatIconInfo />
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "5px",
          borderBottom: "#ffe81f 2px solid",
        }}
      >
        Cockpit
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {allSeats}
      </div>
    </div>
  );
}
