import React, { useEffect, useRef, useState } from "react";
import "./Prescription.css";
import MedCard from "../MedCard/MedCard";
import AddMed from "../AddMed/AddMed";
import { useMedicationContext } from "../MedicationContext";
import axios from "axios";
import Sound from "react-sound";
import { useNavigate } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
// import Song from "../../static/slow_morning.mp3";

const Prescription = () => {
  // const audioRef = useRef(null);
  const rootElRef = useRef(null);

  const [meds, setMeds] = useState([]);
  const medGet = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/medications");
      console.log(response.data);
      setMeds(response.data);
    } catch (error) {
      console.error("GET request error:", error);
    }
  };
  useEffect(() => {
    medGet();
  }, []);
  const { showMed, handleClick } = useMedicationContext();

  useEffect(() => {
    alanBtn({
      key: "d2b1887ffe567565c7b49c2178ff13e22e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "openForm") {
          handleClick();
        }
      },
    });
  }, [handleClick]);

  return (
    <div className="container prescription-container">
      <div className="sidebyside">
        <h2>Prescription</h2>
        <div className="alan-btn-container">
          <div ref={rootElRef}></div>
        </div>

        {showMed && <AddMed />}
        <p className="btn show-btn" onClick={handleClick}>
          {!showMed ? "Add Prescription" : "Close"}
        </p>
      </div>
      {/* <audio src="../public/static/slow_morning.mp3" autoPlay={true} controls /> */}
      <div className="prescription-list">
        {meds.map((item) => (
          <MedCard key={item.id} props={item} />
        ))}
      </div>
    </div>
  );
};

export default Prescription;
