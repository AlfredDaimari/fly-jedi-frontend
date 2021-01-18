import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTripData, getTripDataForUpdate } from "../../lib/trip";
import { getSelectedSeats } from "../../lib/booking";

import FlightDetails from "./FlightDetails";
import Seat from "./Seat";

export default function SeatSelect(props) {
  const [date, changeDate] = useState("");
  const [flightDetails, changeFlightDetails] = useState({
    _id: "",
    boarding: "",
    destinationAirport: "",
    flightNumber: "",
    flightType: "",
    gateClose: "",
    landingTime: "",
    startingAirport: "",
    takeOff: "",
  });

  var { type, tripId, index } = useParams();

  const [reservedSeats, changeReservedSeats] = useState([]);
  const [curSeat, chngCurSeat] = useState("");

  useEffect(() => {
    // use tripId to get information from the backend
    if (type === "new") {
      getTripData(tripId).then(({ date, flightDetails, seatBookings }) => {
        changeFlightDetails(flightDetails);
        changeReservedSeats(seatBookings);
        chngCurSeat(props.selectedSeats[index]);
        changeDate(date);
      });
    } else {
      getTripDataForUpdate(tripId).then(
        ({ date, flightDetails, seatBookings }) => {
          changeFlightDetails(flightDetails);
          changeReservedSeats(seatBookings);
          getSelectedSeats().then((arr) => {
            chngCurSeat(arr[index]);
          });
          changeDate(date);
        }
      );
    }
  }, [tripId]);

  const addToSeats = (seatName) => {
    props.changeSelSeats(index, seatName);
    chngCurSeat(seatName);
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "black",
          alignItems: "center",
        }}
      >
        <FlightDetails tripDate={date} flightDetails={flightDetails} />
        <Seat
          flightType={flightDetails.flightType}
          selectedSeat={curSeat}
          reservedSeats={reservedSeats}
          addToSeats={addToSeats}
        />
      </div>
    </div>
  );
}
