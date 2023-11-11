import React, { useState } from "react";
import "./NewMed.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMedicationContext } from "../MedicationContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const NewMed = () => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [type, setType] = useState("");
  const [instruction, setInstruction] = useState("");
  const [medicationPeriod, setMedicationPeriod] = useState("");
  const [medicationPeriodType, setMedicationPeriodType] = useState("");
  const [reminder, setReminder] = useState("");
  const [days, setDays] = useState([]);
  const [alarmSound, setAlarmSound] = useState("");
  const [alarmDuration, setAlarmDuration] = useState("");

  const { handleClick } = useMedicationContext();

  const handleDaySelect = (selectedDay) => {
    if (days.includes(selectedDay)) {
      setDays(days.filter((day) => day !== selectedDay));
    } else {
      setDays([...days, selectedDay]);
    }
  };
  const handleSubmitVoice = async () => {
    const formData = {
      name,
      dosage,
      type,
      instruction,
      medicationPeriod,
      medicationPeriodType,
      reminder,
      days,
      alarmSound,
      alarmDuration,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/medications",
        formData
      );
      toast.success("New Medication Added");
    } catch (error) {
      console.error("POST request error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      dosage,
      type,
      instruction,
      medicationPeriod,
      medicationPeriodType,
      reminder,
      days,
      alarmSound,
      alarmDuration,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/medications",
        formData
      );
      toast.success("New Medication Added");
    } catch (error) {
      console.error("POST request error:", error);
    }
  };

  useEffect(() => {
    alanBtn({
      key: "d2b1887ffe567565c7b49c2178ff13e22e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        console.log(commandData);
        if (commandData.command === "name") {
          console.log(commandData.data);
          setName(commandData.data);
        }
        if (commandData.command === "dose") {
          console.log(commandData.data);
          switch (commandData.data) {
            case "half":
              setDosage(".5");
              break;
            case "one":
              setDosage("1");
              break;
            case "two":
              setDosage("2");
              break;
            case "three":
              setDosage("3");
              break;
            case "four":
              setDosage("4");
              break;
            case "five":
              setDosage("5");
              break;
            case "six":
              setDosage("6");
              break;
            case "ten":
              setDosage("10");
              break;
            case "fifteen":
              setDosage("15");
              break;
            case "twenty":
              setDosage("20");
              break;
            default:
              setDosage("0");
          }
        }
        if (commandData.command === "type") {
          console.log(commandData.data);
          setType(commandData.data);
        }
        if (commandData.command === "instruction") {
          console.log(commandData.data);
          setInstruction(commandData.data);
        }
        if (commandData.command === "medperiod") {
          console.log(commandData.data);
          switch (commandData.data) {
            case "one":
              setMedicationPeriod(1);
              break;
            case "two":
              setMedicationPeriod(2);
              break;
            case "three":
              setMedicationPeriod(3);
              break;
            case "four":
              setMedicationPeriod(4);
              break;
            case "five":
              setMedicationPeriod(5);
              break;
            case "six":
              setMedicationPeriod(6);
              break;
            case "seven":
              setMedicationPeriod(7);
              break;
            case "eight":
              setMedicationPeriod(8);
              break;
            case "nine":
              setMedicationPeriod(9);
              break;
            case "ten":
              setMedicationPeriod(10);
              break;
            case "twelve":
              setMedicationPeriod(12);
              break;
            case "fifteen":
              setMedicationPeriod(15);
              break;
            case "twenty":
              setMedicationPeriod(20);
              break;
            default:
              setMedicationPeriod(0);
          }
        }
        if (commandData.command === "medduration") {
          console.log(commandData.data);

          setMedicationPeriodType(commandData.data);
        }
        if (commandData.command === "setDays") {
          console.log(commandData.TIME);
          console.log(commandData.DAYS);

          setReminder(commandData.TIME.value);
          setDays(commandData.DAYS);
        }
        if (commandData.command === "removeDay") {
          console.log(commandData.data);

          const dayToRemove = getAbbreviatedDay(commandData.data);
          const updatedDays = days.filter((day) => day !== dayToRemove);
          setDays(updatedDays);
        }
        if (commandData.command === "setTone") {
          console.log(commandData.data);
          setAlarmSound(commandData.data);
        }
        if (commandData.command === "setDuration") {
          console.log(commandData.data);
          switch (commandData.data) {
            case "two":
              setAlarmDuration("2");
              break;
            case "five":
              setAlarmDuration("5");
              break;
            case "ten":
              setAlarmDuration("10");
              break;
            case "fifteen":
              setAlarmDuration("15");
              break;
            default:
              setAlarmDuration(0);
          }
        }
        if (commandData.command === "submitForm") {
          handleSubmitVoice();
        }
      },
    });
  }, []);
  function getAbbreviatedDay(fullDayName) {
    switch (fullDayName.toLowerCase()) {
      case "monday":
        return "Mo";
      case "tuesday":
        return "Tu";
      case "wednesday":
        return "We";
      case "thursday":
        return "Th";
      case "friday":
        return "Fr";
      case "saturday":
        return "Sa";
      case "sunday":
        return "Su";
      default:
        return fullDayName; // Return as is if not recognized
    }
  }
  return (
    <>
      <ToastContainer />

      <form className="add_new_med" onSubmit={handleSubmit}>
        <h2>New</h2>
        {/* <FaTimes className="close" onClick={handleClick} /> */}
        <div className="form-fields">
          <div className="input-group">
            <div className="label-group">
              <label className={`label mandatory light`} htmlFor="name">
                Name
                <span>*</span>
              </label>
            </div>
            <input
              name="name"
              placeholder="Enter your pill name."
              className="inp-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <div className="label-group">
              <label className={`label mandatory light`} htmlFor="dosage">
                Dosage
                <span>*</span>
              </label>
            </div>
            <div className="sidebyside">
              <input
                name="dosage"
                className="inp-field"
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
              <select
                className="inp-field"
                value={type}
                onChange={(e) => setType(e.target.value)}
                name="type"
              >
                <option value="">Select</option>
                <option value="tablet">Tablet</option>
                <option value="ml">Syrup(ml)</option>
                <option value="teaspoon">Teaspoon</option>
                <option value="tablespoon">Tablespoon</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <div className="label-group">
              <label className={`label mandatory light`} htmlFor="instruction">
                Instructions
                <span>*</span>
              </label>
            </div>
            <input
              name="instruction"
              placeholder="Add some intake instructions."
              className="inp-field"
              type="text"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
          </div>
          <div className="input-group">
            <div className="label-group">
              <label
                className={`label mandatory light`}
                htmlFor="medicationPeriod"
              >
                Medication Period
                <span>*</span>
              </label>
            </div>
            <div className="sidebyside">
              <input
                name="medicationPeriod"
                className="inp-field"
                type="number"
                value={medicationPeriod}
                onChange={(e) => setMedicationPeriod(e.target.value)}
              />
              <select
                className="inp-field"
                value={medicationPeriodType}
                onChange={(e) => setMedicationPeriodType(e.target.value)}
                name="medicationPeriodType"
              >
                <option value="">Select</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <div className="label-group">
              <label className={`label mandatory light`} htmlFor="reminder">
                Set Reminder Time
                <span>*</span>
              </label>
            </div>
            <input
              name="reminder"
              className="inp-field"
              type="time"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
            />
          </div>
          <div className="input-group">
            <div className="days">
              <div
                className={`day ${days.includes("Mo") ? "selected-day" : ""}`}
                onClick={() => handleDaySelect("Mo")}
              >
                Mo
              </div>
              <div
                className={`day ${days.includes("Tu") ? "selected-day" : ""}`}
                onClick={() => handleDaySelect("Tu")}
              >
                Tu
              </div>
              <div
                className={`day ${days.includes("We") ? "selected-day" : ""}`}
                onClick={() => handleDaySelect("We")}
              >
                We
              </div>
              <div
                className={`day ${days.includes("Th") ? "selected-day" : ""}`}
                onClick={() => handleDaySelect("Th")}
              >
                Th
              </div>
              <div
                className={`day ${days.includes("Fr") ? "selected-day" : ""}`}
                onClick={() => handleDaySelect("Fr")}
              >
                Fr
              </div>
              <div
                className={`day ${days.includes("Sa") ? "selected-day" : ""}`}
                onClick={() => handleDaySelect("Sa")}
              >
                Sa
              </div>
              <div
                className={`day ${days.includes("Su") ? "selected-day" : ""}`}
                onClick={() => handleDaySelect("Su")}
              >
                Su
              </div>
            </div>
          </div>
          <div className="input-group">
            <select
              className="inp-field"
              value={alarmSound}
              onChange={(e) => setAlarmSound(e.target.value)}
              name="alarmSound"
            >
              <option value="">Select a alarm tone</option>
              <option value="chimes">Chimes</option>
              <option value="slow-morning">Slow Morning</option>
            </select>
          </div>
          <div className="input-group">
            <select
              className="inp-field"
              value={alarmDuration}
              onChange={(e) => setAlarmDuration(e.target.value)}
              name="alarmDuration"
            >
              <option value="">Select the alarm duration</option>
              <option value="2">2mins</option>
              <option value="5">5mins</option>
              <option value="10">10mins</option>
              <option value="15">15mins</option>
            </select>
          </div>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
      {/* <AlanContainer /> */}
    </>
  );
};

export default NewMed;
