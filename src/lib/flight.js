// file for flight fetch requests
async function getFlightsInfo(date, startAirport, endAirport) {
  var booking = await fetch(
    "http://localhost/flights/" + date + "/" + startAirport + "/" + endAirport,
    {
      method: "GET",
      credentials: "same-origin",
    }
  );
  booking = await booking.json();
  return booking;
}

export { getFlightsInfo };
