import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const Emergency = ({ onClick }) => {
  return (
    <div className="floating-button">
      <button onClick={onClick}>
        <FaExclamationTriangle />
        <div className="info-box">
          <p>Emergency Button</p>
          <p>
            On clicking this button, all your emergency contacts will be
            notified. Keep Calm.
          </p>
        </div>
      </button>
    </div>
  );
};

export default Emergency;
