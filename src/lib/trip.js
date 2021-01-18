// file for trip fetch requests

async function getTripData(tripId) {
  var tripInfo = await fetch("http://localhost/trip/" + tripId);
  tripInfo = await tripInfo.json();
  return tripInfo;
}

async function getTripDataForUpdate(tripId) {
  var tripInfo = await fetch("http://localhost/trip/" + tripId + "/update", {
    method: "GET",
    credentials: "same-origin",
  });
  tripInfo = await tripInfo.json();
  return tripInfo;
}

async function getTripIDsAndTravelRoute(date, flightIds, date2, flightIds2) {
  if (date2 === "") {
    date2 = "none";
    flightIds2 = "none";
  }
  await fetch(
    "http://localhost/trip/" +
      date +
      "/" +
      flightIds +
      "/" +
      date2 +
      "/" +
      flightIds2,
    {
      method: "GET",
    }
  );
}

async function getTripIDsWithAuthPNR() {
  await fetch("http://localhost/trip/pnr", {
    method: "GET",
    credentials: "same-origin",
  });
}

export {
  getTripData,
  getTripDataForUpdate,
  getTripIDsAndTravelRoute,
  getTripIDsWithAuthPNR,
};
