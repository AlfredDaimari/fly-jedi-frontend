// file for booking fetch requests

async function checkWithEDP(departDate, returnDate, blipMail, phNum) {
  var response = await fetch(
    "http://localhost/booking/" +
      blipMail +
      "/" +
      departDate +
      ":" +
      returnDate +
      "/" +
      phNum,
    {
      method: "GET",
      credentials: "same-origin",
    }
  );

  if (response.status === 200) {
    return true;
  }

  return false;
}

async function checkWithPnr(pnr, lastName) {
  var response = await fetch(
    "http://localhost/booking/" + pnr + "/" + lastName,
    {
      method: "GET",
      credentials: "same-origin",
    }
  );

  if (response.status === 200) {
    return true;
  }

  return false;
}

async function checkWithUser(pnr) {
  await fetch("http://localhost/booking/" + pnr, {
    method: "GET",
    credentials: "same-origin",
  });
}

async function getSelectedSeats() {
  var selectedSeats = await fetch("http://localhost/booking/seats", {
    method: "GET",
    credentials: "same-origin",
  });
  selectedSeats = await selectedSeats.json();
  return selectedSeats;
}

async function newBooking(email, firstName, lastName, seats, phoneNumber) {
  const dataToSend = {
    email,
    firstName,
    lastName,
    seats,
    phoneNumber,
  };

  var formBody = [];
  for (var property in dataToSend) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(dataToSend[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  formBody = formBody.join("&");

  var response = await fetch("http://localhost/booking", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    method: "POST",
    body: formBody,
  });

  if (response.status === 201) {
    return true;
  }

  return false;
}

async function getBookingInfo() {
  var booking = await fetch("http://localhost/booking", {
    method: "GET",
    credentials: "same-origin",
  });
  booking = await booking.json();
  return booking;
}

async function updateBooking(email, seats) {
  const dataToSend = { email, seats };
  var formBody = [];

  for (let property in dataToSend) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(dataToSend[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  var response = await fetch("http://localhost/booking/", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    method: "PATCH",
    body: formBody,
    credentials: "same-origin",
  });

  if (response.status === 201) {
    return true;
  }

  return false;
}

async function deleteBooking() {
  await fetch("http://localhost/booking", {
    method: "DELETE",
    credentials: "same-origin",
  });
}
export {
  checkWithEDP,
  checkWithPnr,
  checkWithUser,
  deleteBooking,
  updateBooking,
  getSelectedSeats,
  newBooking,
  getBookingInfo,
};
