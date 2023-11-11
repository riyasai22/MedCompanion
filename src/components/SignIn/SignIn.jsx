// SignIn.js

import React from "react";
import "./SignIn.css"; // Import the CSS file
import { Link } from "react-router-dom";

function Button({ value }) {
  return (
    <button className="button">
      {" "}
      {/* Apply the "button" class */}
      {value}
    </button>
  );
}

function Input({ type, id, name, label, placeholder, autofocus }) {
  return (
    <label className="input">
      {label}
      <input
        autoFocus={autofocus}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </label>
  );
}

const SignIn = () => {
  return (
    <div className="container-1">
      <div className="form-container-1">
        <h1 className="form-title">Log In</h1>
        <form>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email Address"
            placeholder="me@example.com"
            autofocus={true}
          />
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="••••••••••"
          />
          <Link to="/dashboard">
            <Button value="Submit" />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
