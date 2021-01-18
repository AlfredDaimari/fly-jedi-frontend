// file for flight selection

import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Header from "./cont/Header";

import "../css/System.css";

const useStyles = makeStyles({
  "fly-sub-btn": {
    color: "yellow",
    "&:hover": {
      color: "white",
    },
  },
});

function InputHolder(props) {
  const classes = useStyles();
  const minDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const mDate = [
    minDate.getFullYear(),
    minDate.getMonth() + 1,
    minDate.getDate(),
  ].join("-");

  return (
    <div
      style={{
        marginLeft: "30px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <h2
        onClick={() => props.changeType("start")}
        className={
          props.type === "start" ? "h2-start-selected" : "h2-unselected"
        }
      >
        Start: {props.start}
      </h2>
      <h2
        onClick={() => props.changeType("destination")}
        className={
          props.type === "destination"
            ? "h2-destination-selected"
            : "h2-unselected"
        }
      >
        Destination: {props.destination}
      </h2>
      <input
        type="date"
        className="systeminput"
        onChange={(event) => {
          props.changeDateOfTravel(event.target.value);
        }}
        min={mDate}
        max="2021-12-30"
        style={{ marginLeft: "10px", height: "30px" }}
      ></input>
      {props.dateOfTravel !== "" ? (
        <input
          type="date"
          className="systeminput"
          onChange={(event) => props.changeDateOfReturn(event.target.value)}
          min={mDate}
          max="2021-12-31"
          style={{ marginLeft: "10px", height: "30px" }}
        ></input>
      ) : (
        <input
          className="systeminput"
          type="date"
          disabled
          style={{ marginLeft: "10px", height: "30px" }}
        ></input>
      )}
      {(props.start &&
        props.destination &&
        props.dateOfTravel &&
        new Date(props.dateOfTravel) > new Date() &&
        props.dateOfReturn === "") ||
      (props.start &&
        props.destination &&
        props.dateOfTravel &&
        new Date(props.dateOfTravel) < new Date(props.dateOfReturn) &&
        new Date(props.dateOfTravel) > new Date()) ? (
        <Button onClick={props.searchFlight} className={classes["fly-sub-btn"]}>
          Search Flights
        </Button>
      ) : (
        <Button disabled className={classes["fly-sub-btn"]}>
          Search Flights
        </Button>
      )}
    </div>
  );
}

function PlanetHolder(props) {
  const planets = ["AJK", "ADR", "DAG", "HSP", "AV7", "CST", "GRL"];
  const planetNames = [
    "Ajan Kloss",
    "Alderaan",
    "Dagobah",
    "Hosnian Prime",
    "Arvala 7",
    "Coruscant",
    "Garel",
  ];

  const getClassName = (abv) => {
    if (abv === props.start || abv === props.destination) {
      if (abv === props.start) {
        return "selected-start";
      } else {
        return "selected-end";
      }
    } else {
      return "not-selected";
    }
  };

  const allPlanets = planets.map((item, index) => {
    return (
      <div
        className={
          item === props.start || item === props.destination
            ? "planet-container-selected"
            : "planet-container"
        }
        id={item}
      >
        {props.start === item || props.destination === item ? (
          <Button disabled>
            <div>
              <div className={getClassName(item)}></div>
              <img
                src={"/img/" + item + ".png"}
                alt=""
                width="200px"
                style={{
                  animation: "none",
                  position: "absolute",
                  transform: "translate(-50%,-103%)",
                }}
              />
              <p style={{ color: "whitesmoke" }}>{planetNames[index]}</p>
            </div>
          </Button>
        ) : (
          <Button onClick={() => props.addToBoxes(item)}>
            <div>
              <div className={getClassName(item)}></div>
              <img
                src={"/img/" + item + ".png"}
                alt=""
                width="200px"
                style={{
                  animation: "none",
                  position: "absolute",
                  transform: "translate(-50%,-103%)",
                }}
              />
              <p style={{ color: "whitesmoke" }}>{planetNames[index]}</p>
            </div>
          </Button>
        )}
      </div>
    );
  });

  return (
    <div
      style={{
        background: "black",
        width: "100vw",
        height: "900px",
      }}
    >
      <div>{allPlanets}</div>
    </div>
  );
}

export default function System(props) {
  const { dest } = useParams();

  const [type, changeType] = useState("start");
  const [start, changeStart] = useState("");
  const [destination, changeDestination] = useState(
    dest !== "none" ? dest : ""
  );
  const [dateOfTravel, changeDateOfTravel] = useState("");
  const [dateOfReturn, changeDateOfReturn] = useState("");

  const history = useHistory();

  function addToBoxes(planet) {
    if (type === "start") {
      changeStart(planet);
    } else {
      changeDestination(planet);
    }
  }

  function searchFlight() {
    var travelDates = "";
    if (dateOfReturn !== "") {
      travelDates = dateOfTravel + ":" + dateOfReturn;
    } else {
      travelDates = dateOfTravel;
    }
    history.push("/fly/" + travelDates + "/" + start + "/" + destination);
  }

  return (
    <div style={{ background: "black" }}>
      <Header user={props.user} />
      <InputHolder
        type={type}
        changeType={changeType}
        changeDateOfTravel={changeDateOfTravel}
        changeDateOfReturn={changeDateOfReturn}
        dateOfTravel={dateOfTravel}
        dateOfReturn={dateOfReturn}
        start={start}
        destination={destination}
        searchFlight={searchFlight}
      />
      <PlanetHolder
        addToBoxes={addToBoxes}
        start={start}
        destination={destination}
      />
    </div>
  );
}
