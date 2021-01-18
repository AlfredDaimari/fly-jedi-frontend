import React from "react";
import "../css/BB8.css";

export default function BB8() {
  return (
    <div class="droid">
      <div>
        <div class="bubble bubble-bottom-left" contenteditable>
          Hey there traveller! May the force be with you!
        </div>
      </div>
      <div class="droid-head">
        <div class="droid-head__eye"></div>
        <div class="droid-head__eye--small"></div>
        <div class="droid-head__eye--tiny"></div>
      </div>
      <div class="droid-neck"></div>

      <div class="droid-body">
        <div class="droid-body__panel--left"></div>
        <div class="droid-body__panel--left-rotate"></div>
        <div class="droid-body__panel-decor"></div>
        <div class="droid-body__panel--center"></div>
        <div class="droid-body__panel--center-rotate"></div>
        <div class="droid-body__panel--right"></div>
        <div class="droid-body__panel--right-rotate"></div>
      </div>
    </div>
  );
}
