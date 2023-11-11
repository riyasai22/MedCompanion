import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
const Dashboard = () => {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    // Fetch medication data from your API
    const medGet = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/medications"
        );
        setMeds(response.data);
      } catch (error) {
        console.error("GET request error:", error);
      }
    };
    medGet();
    getUpcomingAlarms();
  }, []);
  // Function to filter and sort the upcoming alarms
  const getUpcomingAlarms = () => {
    const now = new Date();
    const currentDay = now
      .toLocaleDateString("en-US", { weekday: "short" })
      .slice(0, 2); // Current day in short format (e.g., "Mon")

    // Filter medications for the current day
    const filteredAlarms = meds.filter((medication) =>
      medication.days.includes(currentDay)
    );

    // Sort filtered medications by reminder time
    filteredAlarms.sort((a, b) => {
      const timeA = new Date(`2000-01-01T${a.reminder}`);
      const timeB = new Date(`2000-01-01T${b.reminder}`);
      return timeA - timeB;
    });

    return filteredAlarms;
  };

  const upcomingAlarms = getUpcomingAlarms();

  return (
    <div className="dashboard_container">
      <div className="section-left">
        <div className="section-top">
          <p>
            Welcome to MedCompanion, the cutting-edge Medication Management
            Application designed exclusively for our cherished senior citizens.
          </p>
          <p>
            At <strong>MedCompanion</strong>, our mission is to revolutionize
            the way our seniors manage their medications and healthcare needs.
            In an era where our senior population is growing rapidly, it's
            imperative that we provide them with the tools and support they need
            to lead healthier, more independent lives.
          </p>
        </div>
        <div className="side_by_side">
          <div className="side-left">
            <strong>Our Commitment to Seniors:</strong>
            <ul>
              <li>
                <strong>User-Friendly Interface:</strong> We understand the
                importance of simplicity. MedCompanion offers an intuitive and
                easy-to-navigate interface, ensuring that our seniors can
                effortlessly manage their medications and appointments.
              </li>
              <li>
                <strong> Medication Reminders: </strong>
                Say goodbye to missed doses. MedCompanion's robust medication
                reminder system ensures that every dose is taken on time,
                promoting better health outcomes.
              </li>
              <li>
                <strong> Dosage History Sharing with Doctors: </strong>
                Seamless communication with your healthcare team. MedCompanion
                allows you to share your medication history with your doctors,
                enabling them to provide more personalized care.
              </li>
            </ul>
          </div>
          <div className="side-right">
            <strong> Who Can Benefit from MedCompanion?</strong>
            <ul>
              <li>
                <strong>Senior Citizens:</strong> Our primary focus, providing
                seniors with the support they need for healthier lives.
              </li>
              <li>
                <strong>Professional Caregivers: </strong>Simplifying the
                caregiving process for professionals.
              </li>
              <li>
                <strong>Family Members:</strong> Peace of mind for families,
                knowing their loved ones are cared for.
              </li>
              <li>
                <strong>Doctors and Nurses:</strong> Enhanced communication and
                patient care.
              </li>
              <li>
                <strong> Pharmacists: </strong>Streamlining medication
                management for better patient outcomes.
              </li>
              <li>
                <strong> Old Age Homes:</strong> Improving the quality of life
                for residents.
              </li>
              <li>
                <strong>Healthcare Startups:</strong> A valuable addition to
                your healthcare services.
              </li>
            </ul>
          </div>
        </div>
        <div className="section-bottom">
          <p>
            Join us in this journey to empower our seniors and enhance their
            quality of life.
          </p>
          <p>
            <strong>MedCompanion</strong> is not just an app; it's a lifeline to
            better health and well-being.
          </p>
        </div>
      </div>
      <div className="section-right">
        <div className="intro">
          <div className="text">
            <h3>Welcome to</h3>
            <h2>MedCompanion</h2>
            <p>Your trusted Medication Management Solution</p>
          </div>
          <div className="intro-img">
            <img src="/static/med.png" alt="img" />
          </div>
        </div>
        <div className="upcoming-alarms">
          <p className="heading">Upcoming Alarms</p>
          <div className="alarm-list">
            {upcomingAlarms.map((medication) => (
              <div
                className="alarm-detail"
                key={medication._id}
                style={{ marginBottom: "20px" }}
              >
                <p className="name">{medication.name}</p>
                <p className="dosage">
                  {medication.dosage}
                  {medication.type === "Syrup" ? "ml" : medication.type} |{" "}
                  {medication.medicationPeriod}{" "}
                  {medication.medicationPeriodType}
                </p>
                <p className="reminder">{medication.reminder}</p>
                <p className="instruction">{medication.instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
