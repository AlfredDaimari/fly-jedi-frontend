// file for flight selection
import React, { useEffect, useState } from "react";
import Header from "./cont/Header";
import Cookies from "js-cookie";
import { useHistory, useParams } from "react-router-dom";
import { getFlightsInfo } from "../lib/flight";
import { getTripIDsAndTravelRoute } from "../lib/trip";
import "../css/Fly.css";

function DisplayFlights(props) {
  function joinFlightNumbers(arr) {
    var flNumbers = arr[0].flightNumber;
    if (arr.length > 1) {
      for (let i = 1; i < arr.length; i++) {
        flNumbers += "-" + arr[i].flightNumber;
      }
    }
    return flNumbers;
  }

  const flights = props.allFlights.map((flight) => {
    return (
      <tr key={flight.flightIds.join("")}>
        <td>{joinFlightNumbers(flight.flights)}</td>
        <td>{flight.travelRoute.join(" - ")}</td>
        <td>{new Date(flight.takeOffTime).toTimeString().substring(0, 17)}</td>
        <td>{flight.duration}</td>
        <td>
          {flight.price}

          <input
            type="radio"
            name={props.name}
            style={{ marginLeft: "12px" }}
            value={flight.flightIds.join(":")}
            onChange={(event) => {
              props.changeFlightSelect(event.target.value);
              props.price[props.index] = flight.price;
              props.changePrice(props.price);
            }}
          />
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2 style={{ marginTop: "1%", marginLeft: "3%" }}>
        Date: {props.allFlights[0].dateOfTravel}
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "120px",
          marginTop: "20px",
        }}
      >
        <table>
          <thead>
            <tr>
              <th className="container-2">Flight Number</th>
              <th className="container-2">Travel Route</th>
              <th className="container-2">TakeOff</th>
              <th className="container-2">Duration</th>
              <th className="container-2">Price</th>
            </tr>
          </thead>
          <tbody>{flights}</tbody>
        </table>
      </div>
    </div>
  );
}

export default function Fly(props) {
  const { datesOfTravel, start, end } = useParams();

  const [flightsInfo, changeFlightsInfo] = useState({
    startFlights: [],
    returnFlights: [],
  });

  var dates = datesOfTravel.split(":");

  var date = dates[0];
  var date2 = dates.length > 1 ? dates[1] : "";
  const history = useHistory();

  const [flightIds, changeFlightIds] = useState("");
  const [flightIds2, changeFlightIds2] = useState("");
  const [price, changePrice] = useState([0, 0]);

  const proceedToBook = () => {
    getTripIDsAndTravelRoute(date, flightIds, date2, flightIds2).then(() => {
      Cookies.set("totalPrice", price[0] + price[1]);
      var tripIds = Cookies.get("tripIds");
      tripIds = tripIds.split(":");
      history.push("/book/new/" + tripIds[0] + "/0");
    });
  };

  //Add use state parts

  useEffect(() => {
    getFlightsInfo(datesOfTravel, start, end).then((flightsInfo) => {
      changeFlightsInfo(flightsInfo);
    });
  }, [datesOfTravel, start, end]);

  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      <Header user={props.user} />
      <div style={{ display: "flex" }}>
        <div>
          <h3
            style={{
              marginLeft: "3%",
              marginTop: "3%",
              fontSize: "40px",
              color: "#ffe81f",
            }}
          >
            Available Outbound Flights:
          </h3>
          {flightsInfo.startFlights.length !== 0 && (
            <DisplayFlights
              changeFlightSelect={changeFlightIds}
              allFlights={flightsInfo.startFlights}
              index={0}
              price={price}
              changePrice={changePrice}
              name={"start"}
            />
          )}
          <hr style={{ marginTop: "2%" }} />
          {flightsInfo.returnFlights.length > 0 && (
            <h3
              style={{
                marginLeft: "3%",
                marginTop: "3%",
                fontSize: "40px",
                color: "#ffe81f",
              }}
            >
              Available Inbound Flights:
            </h3>
          )}

          {flightsInfo.returnFlights.length > 0 && (
            <DisplayFlights
              changeFlightSelect={changeFlightIds2}
              allFlights={flightsInfo.returnFlights}
              index={1}
              price={price}
              changePrice={changePrice}
              name={"end"}
            />
          )}
        </div>
        <img
          alt=""
          src="/img/x-wing.jpg"
          width="430px"
          height="640px"
          style={{
            borderRadius: "50px",
            marginLeft: "80px",
            marginRight: "0px",
            marginTop: "59px",
          }}
        ></img>
      </div>
      {(flightIds && flightIds2) ||
      (flightIds && flightsInfo.returnFlights.length === 0) ? (
        <button className="book-flightbtn" onClick={proceedToBook}>
          Book Flights
        </button>
      ) : (
        <button className="book-flightbtn" disabled>
          Book Flights
        </button>
      )}
    </div>
  );
}
