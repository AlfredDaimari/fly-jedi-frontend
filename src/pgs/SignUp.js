import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { signUp, signUsingGoogle } from "../lib/sign";

const useStyles = makeStyles({
  btn: {
    background: "#b81c1c",
    width: "270px",
    paddingTop: "5px",
    paddingBottom: "5px",
    color: "white",
    borderRadius: "4px",
    border: "#27ae60 1px solid",
    textAlign: "center",
    marginLeft: "60px",
    marginTop: "20px",
    marginBottom: "5px",
    fontWeight: "800",
    fontSize: "1em",
    "&:hover": {
      background: "#8a1616",
    },
  },
});

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, updateValid] = useState(false);
  const classes = useStyles();

  function check() {
    signUp(email, firstName, lastName, password, phoneNumber).then((res) => {
      if (res) {
        props.reload(true);
        props.history.push("/");
      } else {
        updateValid(true);
      }
    });
  }

  return (
    <div>
      <p className="signp">Sign Up</p>
      <input
        type="text"
        placeholder="Enter Email"
        onClick={() => updateValid(false)}
        onChange={(event) => setEmail(event.target.value)}
        className="field"
      ></input>
      <br />
      <input
        type="text"
        placeholder="Enter First Name"
        onClick={() => updateValid(false)}
        onChange={(event) => setFirstName(event.target.value)}
        className="field"
      ></input>
      <br />
      <input
        type="text"
        placeholder="Enter Last Name"
        onClick={() => updateValid(false)}
        onChange={(event) => setLastName(event.target.value)}
        className="field"
      ></input>
      <br />
      <input
        type="text"
        placeholder="Enter Phone Number"
        onClick={() => updateValid(false)}
        onChange={(event) => setPhoneNumber(event.target.value)}
        className="field"
      ></input>
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        onClick={() => updateValid(false)}
        onChange={(event) => setPassword(event.target.value)}
        className="field"
      ></input>
      <br />
      {valid && <p className="signp">Invalid Email</p>}
      <br />
      {email && firstName && lastName && password ? (
        <Button onClick={check} className={classes.btn}>
          Sign Up
        </Button>
      ) : (
        <div>
          <p className="signp">Enter all fields</p>
          <Button onClick={check} className={classes.btn} disabled>
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}

export default function SignUp(props) {
  const history = useHistory();

  return (
    <div>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100vw",
          left: "0%",
          top: "0%",
          objectFit: "cover",
          zIndex: "-1",
          height: "auto",
        }}
      >
        <source src={"/img/spacy.mp4"} type="video/mp4" />
      </video>
      <div className="signupbox">
        <Signup reload={props.reload} history={history} />
        <div className="pad">
          <p className="signp">
            Have an account yet? <Link to="/signin">Sign In</Link>
          </p>
        </div>
        <div className="btn2">
          <GoogleLogin
            buttonText="Sign Up"
            clientId="-- add google client id here --"
            onSuccess={(response) => {
              signUsingGoogle(response).then(() => {
                props.reload(true);
                history.push("/");
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
