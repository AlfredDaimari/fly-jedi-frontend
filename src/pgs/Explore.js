import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserRecommendations } from "../lib/user";

import Header from "./cont/Header";

import "../css/Explore.css";

function ExpPlanetDis(props) {
  //will create a component for displaying a planet with its description
  const planet = {
    AJK: {
      name: "Ajan Kloss",
      desc:
        "Originally scouted as a potential site for a Rebel Alliance base, it served as a secluded outpost after Battle of Endor & became training ground for the Jedi Luke Skywalker.",
    },
    ADR: {
      name: "Alderaan",
      desc:
        "The shattered remains of Alderaan are an example of the irredeemable evil that was the Empire. A peaceful world, Alderaan was bereft of weaponry in an era of galactic strife.",
    },
    DAG: {
      name: "Dagobah",
      desc:
        "Home to Yoda during his final years, Dagobah was a swamp-covered planet strong with the Force -- a forgotten world where the wizened Jedi Master could escape the notice of Imperial forces.",
    },
    HSP: {
      name: "Hosnian Prime",
      desc:
        "The capital of the New Republic is a cosmopolitan world on the outskirts of the Core Worlds region. It's tenure as Senate seat makes it the target an attack by the First Order",
    },
    AV7: {
      name: "Arvala 7",
      desc:
        "On the frontier world of Arvala-7, the cracked landscape of hardened mud gives way to dust clouds at the first sign of disruption.",
    },
    CST: {
      name: "Coruscant",
      desc:
        "A city-covered planet, Coruscant is the vibrant heart and capital of the galaxy, featuring a diverse mix of citizens and culture.",
    },
    GRL: {
      name: "Garel",
      desc:
        "Garel is a planet not far from Lothal, and was the site of a deal for T-7 ion disruptor rifles between the Empire's Minister Maketh Tua and Amda Wabo.",
    },
  };

  return (
    <div className="prod-container">
      <Link style={{ textDecoration: "none" }} to={"/thesystem/" + props.code}>
        <div>
          <img
            width="150px"
            className="prod-img"
            src={"/img/" + props.code + ".png"}
            alt={planet[props.code].name}
          />
          <h1
            style={{
              color: "#ffe81f",
              marginBottom: "5px",
              fontSize: "23px",
              marginLeft: "4px",
            }}
          >
            {planet[props.code].name}
          </h1>
          <p
            style={{
              width: "285px",
              color: "white",
              justifyContent: "center",
              marginRight: "4px",
              marginLeft: "4px",
              fontSize: "14px",
            }}
          >
            {planet[props.code].desc}
          </p>
        </div>
      </Link>
    </div>
  );
}
function PlanetContainer(props) {
  // suppose to render the message and the planets
  const displayPlanet = props.planets.map((code) => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <ExpPlanetDis code={code} />
      </div>
    );
  });
  return (
    <div>
      <h1
        style={{
          textAlign:"center",
          width:"100vw",
          color: "white",
          fontSize: "23px",
          marginTop: "2%",
          marginBottom: "1%",
        }}
      >
        {" "}
        {props.message}
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap",marginLeft:"7%", marginRight:"9%", justifyContent:"center" }}>{displayPlanet}</div>
    </div>
  );
}

export default function Explore(props) {
  const [message, changeMessage] = useState("");
  const [planets, changePlanets] = useState([]);

  useEffect(() => {
    if (props.user.firstName === "") {
      changeMessage(
        "You haven't visited any planets yet, visit one at our exorbitant prices!"
      );
      changePlanets(["AJK", "ADR", "DAG", "HSP", "AV7", "CST", "GRL"]);
    } else {
      getUserRecommendations().then((recom) => {
        if (recom.planets.length === 7) {
          changeMessage(
            "You haven't visited any planets yet, visit one at our exorbitant prices!"
          );
          changePlanets(["AJK", "ADR", "DAG", "HSP", "AV7", "CST", "GRL"]);
        } else {
          changeMessage(recom.message);
          changePlanets(recom.planets);
        }
      });
    }
  }, [props.user.firstName]);

  return (
    <div style={{ backgroundColor: "black", minHeight:"100vh" }}>
      <Header user={props.user} />
      <PlanetContainer message={message} planets={planets} />
    </div>
  );
}
