import React from "react";
import Header from "../cont/Header";
import BookingStatus from "./BookingStatus";

export default function BookingGet(props) {
  return (
    <div>
      <Header user={props.user} />
      <video className="lp-bg-video" autoPlay loop muted>
        <source src="/img/Spaceship-33066.mp4" type="video/mp4" />
      </video>
      <BookingStatus />
    </div>
  );
}
