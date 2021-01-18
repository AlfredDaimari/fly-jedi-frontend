import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getBookingInfo, deleteBooking } from "../../lib/booking";
import { getTripIDsWithAuthPNR } from "../../lib/trip";
import Cookies from "js-cookie";
import ticketPdf from "../../lib/ticketPDF";

import Header from "../cont/Header";

function download(index, bookingData) {
  var name = bookingData.lastName + " " + bookingData.firstName;
  ticketPdf(
    new Date(bookingData.flightDetails[index].boarding),
    new Date(bookingData.flightDetails[index].takeOff)
      .toDateString()
      .substring(4),
    bookingData.flightDetails[index].destinationAirport,
    name,
    bookingData._id,
    bookingData.seats[index],
    bookingData.flightDetails[index].startingAirport,
    new Date(bookingData.flightDetails[index].takeOff),
    bookingData.flightDetails[index]._id,
    new Date(bookingData.flightDetails[index].landingTime)
  );
}

function DisplayBook(props) {
  var tickets = props.bookingData.flightDetails.map((flight, index) => {
    return (
      <tr key={props.bookingData.seats[index]}>
        <td style={{ color: "white", fontSize: "25px", padding: "15px" }}>
          {flight.flightNumber}
        </td>
        <td style={{ color: "white", fontSize: "25px", padding: "15px" }}>
          {new Date(flight.takeOff).toDateString().substring(4)}
        </td>
        <td style={{ color: "white", fontSize: "25px", padding: "15px" }}>
          {flight.startingAirport + " - " + flight.destinationAirport}
        </td>
        <td style={{ color: "white", fontSize: "25px", padding: "15px" }}>
          {props.bookingData.seats[index]}
        </td>
        <td>
          <button
            style={{
              backgroundColor: "#ffe81f",
              borderRadius: "15px",
              height: "35px",
              width: "150px",
            }}
            onClick={() => {
              download(index, props.bookingData);
            }}
          >
            Download
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <img src="/img/Fly_bg.jpg" alt="" className="book-show-bg"></img>
      <div style={{ zIndex: "1", position: "absolute" }}>
        <h3 style={{ marginLeft: "3%", fontSize: "37px", marginTop: "3.5%" }}>
          Details of Trip Booking{" "}
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "420px",
            marginTop: "60px",
          }}
        >
          <table>
            <thead>
              <tr>
                <th className="container-bs">Flight No.</th>
                <th className="container-bs">Date</th>
                <th className="container-bs">Travel Route</th>
                <th className="container-bs">Seat</th>
                <th className="container-bs">E-Ticket</th>
              </tr>
            </thead>
            <tbody>{tickets}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BookingDataDisplay(props) {
  return (
    <div style={{ backgroundColor: "black" }}>
      <div style={{ display: "flex", marginTop: "2%" }}>
        <h1 style={{ color: "white" }}>Booking </h1>
        <h2
          style={{
            color: "white",
            marginRight: "10%",
            marginLeft: "3%",
            marginBottom: "2%",
            fontSize: "22px",
          }}
        >
          PNR: {props.bookingData._id}
        </h2>
        <h2
          style={{
            color: "white",
            marginRight: "10%",
            marginBottom: "2%",
            fontSize: "22px",
          }}
        >
          Name: Mr/Ms
          {" " + props.bookingData.lastName + " " + props.bookingData.firstName}
        </h2>
        <h2
          style={{
            color: "white",
            marginRight: "10%",
            marginBottom: "2%",
            fontSize: "22px",
          }}
        >
          Travel Route: {props.bookingData.travelRoute.join("-")}
        </h2>
      </div>
    </div>
  );
}

export default function BookingShow(props) {
  const [bookingData, changeBookingData] = useState({
    dates: [],
    seats: [],
    travelRoute: [],
    _id: "",
    lastName: "",
    firstName: "",
    flightDetails: [],
    email: "",
    phoneNumber: "",
    totalPrice: "",
  });

  const history = useHistory();

  useEffect(() => {
    getBookingInfo().then((bookingInfo) => {
      changeBookingData(bookingInfo);
    });
  }, [bookingData._id]);

  return (
    <div>
      <Header user={props.user} />
      <BookingDataDisplay bookingData={bookingData} />
      <DisplayBook bookingData={bookingData} />
      <button
        style={{
          position: "absolute",
          marginTop: "32%",
          marginLeft: "28%",
          backgroundColor: "#ffe81f",
          borderRadius: "10px",
          height: "42px",
          width: "250px",
          fontSize: "22px",
        }}
        onClick={() => {
          getTripIDsWithAuthPNR().then(() => {
            var tripIds = Cookies.get("tripIds");
            tripIds = tripIds.split(":");
            history.push("/book/update/" + tripIds[0] + "/0");
          });
        }}
      >
        Update Booking
      </button>
      <button
        style={{
          position: "absolute",
          marginTop: "32%",
          marginLeft: "55%",
          backgroundColor: "#ffe81f",
          borderRadius: "10px",
          height: "42px",
          width: "250px",
          fontSize: "22px",
        }}
        onClick={() => {
          deleteBooking().then(() => {
            history.push("/");
          });
        }}
      >
        Delete Booking
      </button>
    </div>
  );
}
