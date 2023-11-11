import React from "react";
import "./Appointments.css";
const Appointments = () => {
  // Dummy appointments data
  const dummyAppointments = [
    {
      id: 1,
      date: "2023-10-10",
      time: "10:30 AM - 11:00 AM",
      doctorName: "Dr. John Doe",
      speciality: "General Physician",
    },
    {
      id: 2,
      date: "2023-10-15",
      time: "2:00 PM - 2:30 PM",
      doctorName: "Dr. Jane Smith",
      speciality: "Dermatologist",
    },
    {
      id: 3,
      date: "2023-10-20",
      time: "3:30 PM - 4:00 PM",
      doctorName: "Dr. Michael Johnson",
      speciality: "Cardiologist",
    },
    // Add more dummy appointments as needed
  ];

  return (
    <div className="appointments_container">
      <h2>Appointments</h2>
      <div className="appointment-cards">
        {dummyAppointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Time:</strong> {appointment.time}
            </p>
            <p>
              <strong>Doctor:</strong> {appointment.doctorName}
            </p>
            <p>
              <strong>Speciality:</strong> {appointment.speciality}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
