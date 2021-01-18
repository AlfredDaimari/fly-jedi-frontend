// component to display the flight details

export default function FlightDetails(props) {
  return (
    <div
      style={{
        width: "50%",
        marginRight: "10px",
        background: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white" }}>Flight Details:</h2>
      <img
        style={{
          maxWidth: "90%",
          textAlign: "center",
          borderRadius: "3%",
          border: "3px #ffe81f solid",
        }}
        alt=""
        src={"/img/" + props.flightDetails.flightType + ".jpg"}
      />
      <h3 style={{ color: "white" }}>{props.flightDetails.flightType}</h3>
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          width: "70%",
        }}
      >
        <h3>Date of travel: {props.tripDate}</h3>
        <h3>
          Route:
          {props.flightDetails.startingAirport +
            "-" +
            props.flightDetails.destinationAirport}
        </h3>
      </div>
      <div
        style={{
          color: "white",
          display: "flex",
          width: "70%",
          flexDirection: "column",
        }}
      >
        <h3>Flight Number: {props.flightDetails.flightNumber}</h3>
        <h3>
          Boarding:{" "}
          {new Date(props.flightDetails.boarding)
            .toTimeString()
            .substring(0, 18)}
        </h3>
        <h3>
          Takeoff:{" "}
          {new Date(props.flightDetails.takeOff)
            .toTimeString()
            .substring(0, 18)}
        </h3>
        <h3>
          Landing:{" "}
          {new Date(props.flightDetails.landingTime)
            .toTimeString()
            .substring(0, 18)}
        </h3>
      </div>
    </div>
  );
}
