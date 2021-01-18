import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { checkUserToken } from "./lib/user";

import Home from "./pgs/Home";
import Booking from "./pgs/Booking/Booking";
import BookingShow from "./pgs/Booking/BookingShow";
import BookingStatus from "./pgs/Booking/BookingStatus";
import BookingGet from "./pgs/Booking/BookingGet";
import Fly from "./pgs/Fly";
import Profile from "./pgs/Profile/Profile";
import SignIn from "./pgs/SignIn";
import SignUp from "./pgs/SignUp";
import System from "./pgs/System";
import Explore from "./pgs/Explore";
import "./css/App.css";

export default function App() {
  const [user, updateUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    img: "",
    phoneNumber: "",
  });

  const [reload, changeReload] = useState(true);

  useEffect(() => {
    if (reload) {
      checkUserToken().then((response) => {
        if (response) {
          updateUser({
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            img: response.profilePic,
            phoneNumber: response.phoneNumber,
          });
          changeReload(false); // setting to false to prevent reload
        } else {
          updateUser({
            email: "",
            firstName: "",
            lastName: "",
            img: "",
            phoneNumber: "",
          });
          changeReload(false); // setting to false to prevent reload
        }
      });
    }
  }, [reload]);

  return (
    <div className="master">
      <Router>
        <Switch>
          <Route path="/book/show" exact>
            <BookingShow user={user} />
          </Route>
          <Route path="/book/check" exact>
            <BookingStatus user={user} />
          </Route>
          <Route path="/book/get" exact>
            <BookingGet user={user} />
          </Route>
          <Route path="/book/:type/:tripId/:index" exact>
            <Booking user={user} />
          </Route>
          <Route path="/explore" exact>
            <Explore user={user} />
          </Route>
          <Route path="/fly/:datesOfTravel/:start/:end" exact>
            <Fly user={user} />
          </Route>
          <Route path="/profile/:section" exact>
            <Profile user={user} reload={changeReload} />
          </Route>
          <Route path="/thesystem/:dest" exact>
            <System user={user} />
          </Route>
          <Route path="/signin" exact>
            <SignIn user={user} reload={changeReload} />
          </Route>
          <Route path="/signup" exact>
            <SignUp user={user} reload={changeReload} />
          </Route>
          <Route path="/">
            <Home user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
