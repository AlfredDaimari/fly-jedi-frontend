//Displaying all bookings
import { checkWithUser } from "../../lib/booking";
import "../../css/Payment.css";

function DisplayBookings(props) {
  var activebook = [];

  props.bookings.forEach((book) => {
    if (book.status === "reserved") {
      activebook.push(book);
    }
  });

  activebook = activebook.map((book) => {
    return (
      <tr key={book.pnr}>
        <td>{book.pnr}</td>
        <td>{book.dates[0]}</td>
        <td>{book.travelRoute.join(" - ")}</td>
        <td>
          <button
            onClick={() => {
              checkWithUser(book.pnr).then(() => {
                props.history.push("/book/show");
              });
            }}
          >
            More info
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h3 style={{ marginLeft: "5%" }}>Active Booking Details:</h3>
      <div
        style={{ display: "flex", justifyContent: "center", width: "100vw" }}
      >
        <table>
          <thead>
            <tr>
              <th className="container-2">PNR</th>
              <th className="container-2">Trip Start Date</th>
              <th className="container-2">Travel Route</th>
              <th className="container-2">Trip Status</th>
            </tr>
          </thead>
          <tbody>{activebook}</tbody>
        </table>
      </div>
    </div>
  );
}

function DisplayOldBookings(props) {
  var oldbook = [];
  props.bookings.forEach((book1) => {
    if (book1.status === "completed") {
      oldbook.push(book1);
    }
  });
  oldbook = oldbook.map((book1) => {
    return (
      <tr key={book1.pnr}>
        <td>{book1.pnr}</td>
        <td>{book1.dates[0]}</td>
        <td>{book1.travelRoute.join(" - ")}</td>
        <td>{book1.status}</td>
      </tr>
    );
  });
  return (
    <div>
      <h3 style={{ marginLeft: "5%" }}>Trips Completed:</h3>
      <div
        style={{ display: "flex", justifyContent: "center", width: "100vw" }}
      >
        <table>
          <thead>
            <tr>
              <th className="container-2">PNR</th>
              <th className="container-2">Trip Start Date</th>
              <th className="container-2">Travel Route</th>
              <th className="container-2">Trip Status</th>
            </tr>
          </thead>
          <tbody>{oldbook}</tbody>
        </table>
      </div>
    </div>
  );
}

export { DisplayBookings, DisplayOldBookings };
