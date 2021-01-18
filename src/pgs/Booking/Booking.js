// file for creating bookings

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import { getSelectedSeats, updateBooking, newBooking } from "../../lib/booking";

import Header from "../cont/Header";
import SeatSelect from "./SeatSelect";
import OtherInfo from "./OtherInfo";

import "../../css/Booking.css";

function TripIds(props) {
  // creating links to the various trips
  var tripIds = props.tripIds.map((id, index) => {
    return (
      <Link
        key={id}
        to={"/book/" + props.type + "/" + id + "/" + index}
        className="trip-id-links"
      >
        Trip {index + 1}
      </Link>
    );
  });
  return (
    <div
      style={{
        display: "flex",
        background: "black",
        marginBottom: "40px",
      }}
    >
      {tripIds}
    </div>
  );
}

export default function Booking(props) {
  const { type } = useParams();
  const tripIds = Cookies.get("tripIds").split(":");
  const travelRoute = Cookies.get("travelRoute");
  const history = useHistory();

  var price = Cookies.get("totalPrice");

  const [email, changeEmail] = useState(props.user.email);
  const [firstName, changeFirstName] = useState(props.user.firstName);
  const [lastName, changeLastName] = useState(props.user.lastName);
  const [phoneNumber, changePhoneNumber] = useState(props.user.phoneNumber);
  const [selectedSeats, changeSelectedSeats] = useState([]);
  const [valid, changeValid] = useState(false);

  // use useEffect to call backend and update selectedSeats, travelRoute
  useEffect(() => {
    if (type === "update") {
      getSelectedSeats().then((selectedSeats) => {
        changeSelectedSeats(selectedSeats);
      });
    } else {
      changeSelectedSeats(new Array(tripIds.length).fill(undefined));
    }
  }, [travelRoute, type, tripIds.length]);

  const changeSelSeats = (index, seatName) => {
    var selSeats = selectedSeats;
    selSeats[index] = seatName;
    changeSelectedSeats(selSeats);
  };

  const book = () => {
    if (type === "update") {
      updateBooking(email, selectedSeats.join(":")).then((resp) => {
        if (resp) {
          history.push("/book/show");
        } else {
          changeValid(false);
        }
      });
    } else {
      if (!selectedSeats.every((v) => v !== undefined)) {
        changeValid(true);
      } else {
        newBooking(
          email,
          firstName,
          lastName,
          selectedSeats.join(":"),
          phoneNumber
        ).then((resp) => {
          if (resp) {
            history.push("/book/show");
          } else {
            changeValid(true);
          }
        });
      }
    }
  };

  return (
    <div style={{ background: "black" }}>
      <Header user={props.user} />
      <Router>
        <TripIds tripIds={tripIds} type={type} />
        <Switch>
          <Route path="/book/:type/:tripId/:index">
            <SeatSelect
              selectedSeats={selectedSeats}
              changeSelSeats={changeSelSeats}
            />
          </Route>
        </Switch>
      </Router>
      <OtherInfo
        price={price}
        book={book}
        email={email}
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
        changeEmail={changeEmail}
        changeFirstName={changeFirstName}
        changeLastName={changeLastName}
        changePhoneNumber={changePhoneNumber}
        changeValid={changeValid}
        valid={valid}
        type={type}
      />
    </div>
  );
}
