import React from "react";
import "../../css/Payment.css";
import Cookies from "js-cookie";

export default function Payment() {
  const totalPrice = Cookies.get("totalPrice");
  let spCharges = (totalPrice * (40 / 100)).toFixed(2);
  let taxCharges =(totalPrice * (15 / 100)).toFixed(2);
  let seatCharges =(totalPrice * (35 / 100)).toFixed(2);
  let convCharges =(totalPrice * (10 / 100)).toFixed(2);
  return (
    <div style={{ background: "black" }}>
      <h1
        style={{
          color: "white",
          marginLeft: "30px",
          borderBottom: "3px #ffe81f solid",
        }}
      >
        Payment:
      </h1>

      <div className="row">
        <label for="card" className="method-payment">
          <div style={{ display: "flex", marginLeft: "2px" }}>
            <img src="/img/starwars_ccard.jpg" alt=""/>
            <input id="card" type="radio" name="payment"></input>
            <div
              style={{ color: "white", marginLeft: "2px", fontSize: "20px" }}
            >
              Pay with Credit card
            </div>
          </div>
        </label>
        <label for="nanot" className="method-payment">
          <div style={{ display: "flex" }}>
            <img src="/img/currency_2.jpg" alt="" />
            <input id="nanot" type="radio" name="payment"></input>
            <div style={{ color: "white", fontSize: "20px" }}>
              Pay with Nano-transfer
            </div>
          </div>
        </label>
      </div>
      <div style={{ display: "flex" }}>
        <div className="container-2">
          <table>
            <h2>Price Summary</h2>
            <tr></tr>
            <tr>
              <td>Space Flight Charges</td>
              <td className="price" rowSpan="3">
                {spCharges} IC
              </td>
            </tr>
            <tr>
              <td>Intergalactic travel tax</td>
              <td className="price">{taxCharges} IC</td>
            </tr>
            <h2>Services fee</h2>
            <tr>
              <td>Seat fee</td>
              <td className="price">{seatCharges} IC</td>
            </tr>
            <tr>
              <td>Convenience fee</td>
              <td className="price">{convCharges} IC</td>
            </tr>
            <hr />
            <tr>
              <td>Total</td>
              <td className="price">{totalPrice}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
