import React, { useEffect, useRef, useState } from "react";
import "./AddMed.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMedicationContext } from "../MedicationContext";
import { FaTimes } from "react-icons/fa";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../FromDataContext";

const AddMed = () => {
  // const { formData, setFormData } = useFormData();
  // console.log(formData);
  const [formData, setFormData] = useState({
    icon: "",
    name: "",
    dosage: "",
    type: "",
    instruction: "",
    medicationPeriod: "",
    medicationPeriodType: "",
    reminder: "",
    days: "",
    alarmSound: "",
    alarmDuration: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { showMed, handleClick } = useMedicationContext();

  const handleSelect = (e) => {
    const selectedDay = e.target.textContent; // Get the text content of the clicked day
    const currentDays = formData.days || [];

    // Check if the clicked day is already selected
    if (currentDays.includes(selectedDay)) {
      // If selected, remove it from the array
      const updatedDays = currentDays.filter((day) => day !== selectedDay);
      e.target.classList.remove("selected-day");

      setFormData({
        ...formData,
        days: updatedDays,
      });
    } else {
      // If not selected, add it to the array
      const updatedDays = [...currentDays, selectedDay];
      e.target.classList.add("selected-day");

      setFormData({
        ...formData,
        days: updatedDays,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(formData);
      // Send the data to the backend
      const response = await axios.post(
        "http://localhost:5000/api/medications",
        formData
      );
      //   console.log(response.data);
      toast.success("New Medication Added");
      handleClick();
    } catch (error) {
      console.error("POST request error:", error);
    }
  };
  return (
    <>
      <ToastContainer />

      <form className="add_new" onSubmit={handleSubmit}>
        <h2>New</h2>
        <FaTimes className="close" onClick={handleClick} />
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
              value={formData.name}
              onChange={handleInputChange}
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
                value={formData.dosage}
                onChange={handleInputChange}
              />
              <select
                className="inp-field"
                value={formData.type}
                onChange={handleInputChange}
                name="type"
              >
                <option value="">Select</option>
                <option value="Tablet">Tablet</option>
                <option value="Syrup">Syrup(ml)</option>
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
              value={formData.instruction}
              onChange={handleInputChange}
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
                value={formData.medicationPeriod}
                onChange={handleInputChange}
              />
              <select
                className="inp-field"
                value={formData.medicationPeriodType}
                onChange={handleInputChange}
                name="medicationPeriodType"
              >
                <option value="">Select</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
                <option value="Years">Years</option>
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
              value={formData.reminder}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <div className="days">
              <div className="day" onClick={handleSelect}>
                Mo
              </div>
              <div className="day" onClick={handleSelect}>
                Tu
              </div>
              <div className="day" onClick={handleSelect}>
                We
              </div>
              <div className="day" onClick={handleSelect}>
                Th
              </div>
              <div className="day" onClick={handleSelect}>
                Fr
              </div>
              <div className="day" onClick={handleSelect}>
                Sa
              </div>
              <div className="day" onClick={handleSelect}>
                Su
              </div>
            </div>
          </div>
          <div className="input-group">
            <select
              className="inp-field"
              value={formData.alarmSound}
              onChange={handleInputChange}
              name="alarmSound"
            >
              <option value="">Select a alarm tone</option>
              <option value="Chimes">Chimes</option>
              <option value="Slow Morning">Slow Morning</option>
            </select>
          </div>
          <div className="input-group">
            <select
              className="inp-field"
              value={formData.alarmDuration}
              onChange={handleInputChange}
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
    </>
  );
};

export default AddMed;
