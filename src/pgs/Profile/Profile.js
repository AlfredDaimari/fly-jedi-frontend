// file for displaying profile
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Header from "../cont/Header";
import { DisplayBookings, DisplayOldBookings } from "./Bookings";
import { signOut, signOutAll } from "../../lib/sign";
import { updateUser, updateUserPassword, getUserInfo } from "../../lib/user";
import "../../css/Profile.css";

function ProfileInfoDisplay(props) {
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(14),
      height: theme.spacing(14),
    },
    btn: {
      height: "40px",
    },
  }));

  const classes = useStyles();

  return (
    <div style={{ backgroundColor: "black" }}>
      <h1 style={{ margin: "2% 0% 1% 5%" }}>PROFILE</h1>
      <div
        style={{ display: "flex", margin: "2% 0% 2% 5%", alignItems: "center" }}
      >
        <Avatar src={props.userData.profilePic} className={classes.large} />
        <Button
          className={classes.btn}
          style={{ color: "white" }}
          onClick={() => {
            signOut().then(() => {
              props.reload(true);
              props.history.push("/");
            });
          }}
        >
          Sign Out
        </Button>
        <Button
          className={classes.btn}
          style={{ color: "white" }}
          onClick={() => {
            signOutAll().then(() => {
              props.reload(true);
              props.history.push("/");
            });
          }}
        >
          Sign Out All
        </Button>
      </div>
      <div
        style={{
          marginLeft: "5%",
          fontSize: "25px",
          display: "flex",
          marginBottom: "3%",
          color: "white",
        }}
      >
        <p>Email Id: {props.userData.email}</p>
        <p style={{ marginLeft: "15%" }}>
          First Name: {props.userData.firstName}
        </p>
        <p style={{ marginLeft: "15%" }}>
          Last Name: {props.userData.lastName}
        </p>
      </div>
      <hr />
    </div>
  );
}

function UpdateProfile(props) {
  const [email, changeEmail] = useState(props.userData.email);
  const [firstName, changeFirstName] = useState(props.userData.firstName);
  const [lastName, changeLastName] = useState(props.userData.lastName);
  const [phoneNumber, changePhoneNumber] = useState(props.userData.phoneNumber);
  const [newPassword, changeNewPassword] = useState("");
  const [valid, updateValid] = useState(false);

  function handleSubmit(event) {
    updateUser(email, firstName, lastName, phoneNumber).then((res) => {
      if (res) {
        props.reload();
        props.reloadComp();
      } else {
        updateValid(true);
      }
    });
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    updateUserPassword(newPassword).then(() => {
      props.reload();
      props.reloadComp();
      changeNewPassword("");
    });
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "black",
        }}
      >
        <div
          style={{ display: "flex", marginBottom: "20px", marginTop: "20px" }}
        >
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(event) => {
              changeEmail(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
            style={{
              margin: "4px 0px 4px 0px",
              marginBottom: "1%",
              width: "300px",
              marginRight: "50px",
            }}
          />
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(event) => {
              changeFirstName(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
            style={{
              margin: "4px 0px 4px 0px",
              marginBottom: "1%",
              width: "300px",
            }}
          />
        </div>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(event) => {
              changeLastName(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
            style={{
              margin: "4px 0px 4px 0px",
              marginBottom: "1%",
              width: "300px",
              marginRight: "50px",
            }}
          />
          <input
            placeholder="Phone Number"
            type="text"
            value={phoneNumber}
            onChange={(event) => {
              changePhoneNumber(event.target.value);
            }}
            onClick={() => {
              updateValid(false);
            }}
            style={{
              margin: "4px 0px 4px 0px",
              marginBottom: "1%",
              width: "300px",
            }}
          />
        </div>
        {valid && <p>email already taken</p>}
        {email && firstName && lastName && phoneNumber ? (
          <button
            onClick={() => {
              handleSubmit();
            }}
            style={{
              width: "200px",
              backgroundColor: " #ffe81f",
              color: "black",
              padding: "8px",
              borderRadius: "8px",
              fontSize: "17px",
              marginBottom: "20px",
            }}
          >
            Submit
          </button>
        ) : (
          <button
            disabled
            style={{
              width: "200px",
              backgroundColor: "grey",
              color: "black",
              padding: "8px",
              borderRadius: "8px",
              fontSize: "17px",
              marginBottom: "20px",
            }}
          >
            Submit
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "black",
        }}
      >
        <input
          placeholder="new password"
          type="text"
          value={newPassword}
          onChange={(event) => {
            changeNewPassword(event.target.value);
          }}
          style={{
            margin: "4px 0px 4px 0px",
            marginBottom: "15px",
            width: "300px",
          }}
        />
        {newPassword ? (
          <button
            onClick={() => {
              handlePasswordSubmit();
            }}
            style={{
              width: "200px",
              backgroundColor: " #ffe81f",
              color: "black",
              padding: "8px",
              borderRadius: "8px",
              fontSize: "17px",
              marginBottom: "20px",
            }}
          >
            Submit
          </button>
        ) : (
          <button
            disabled
            style={{
              width: "200px",
              backgroundColor: " grey",
              color: "black",
              padding: "8px",
              borderRadius: "8px",
              fontSize: "17px",
              marginBottom: "20px",
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default function Profile(props) {
  const useStyles = makeStyles({
    subcategory: {
      fontFamily: "'Goldman', cursive",
      fontSize: "20px",
      fontStyle: "bold",
      color: "#2f2f2f",
      marginLeft: "20px",
      marginRight: "20px",

      "&:hover": {
        color: "#b81c1c",
        textDecoration: "underline",
      },
    },
  });
  const [reload, changeReload] = useState(true);
  const classes = useStyles();
  const history = useHistory();
  const [userData, changeUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePic: "",
  });

  useEffect(() => {
    if (reload) {
      getUserInfo().then((userInfo) => {
        changeUserData(userInfo);
        changeReload(false);
      });
    }
  }, [reload]);

  function reloadComp() {
    changeReload(true);
  }

  if (props.user.firstName === "") {
    history.push("/");
  }

  return (
    <div>
      <Header user={props.user} />
      <ProfileInfoDisplay
        userData={userData}
        reload={props.reload}
        history={history}
      />
      <Router>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#ffe81f",
          }}
        >
          <Link to="/profile/userupdate" style={{ color: "#ffe81f" }}>
            <Button className={classes.subcategory}> Update Profile</Button>
          </Link>
          <Link to="/profile/bookings" style={{ textDecoration: "none" }}>
            <Button className={classes.subcategory}>Bookings</Button>
          </Link>
          <Link to="/profile/oldbookings" style={{ textDecoration: "none" }}>
            <Button className={classes.subcategory}>Old Bookings</Button>
          </Link>
        </div>
        <Switch>
          <Route path="/profile/userupdate" exact>
            <UpdateProfile
              userData={userData}
              reloadComp={reloadComp}
              reload={props.reload}
            />
          </Route>
          <Route path="/profile/bookings" exact>
            <DisplayBookings history={history} bookings={userData.bookings} />
          </Route>
          <Route path="/profile/oldbookings" exact>
            <DisplayOldBookings bookings={userData.bookings} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
