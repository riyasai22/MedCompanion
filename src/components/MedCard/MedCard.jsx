import React from "react";
import "./MedCard.css";
import Pill from "../../media/pill.png";

const MedCard = ({ props }) => {
  return (
    <div className="medcard" key={props.id}>
      <div className="medimage">
        <img src={Pill} alt="img" />
      </div>
      <p className="detail">{props.name}</p>

      <div className="separation">
        <p className="detail small">
          {props.medicationPeriod} {props.medicationPeriodType} | {props.dosage}{" "}
          {props.type}
        </p>
        <p className="detail small spl">{props.instruction}</p>
        <p className="detail small">{props.days.join(", ")}</p>
      </div>
    </div>
  );
};

export default MedCard;
