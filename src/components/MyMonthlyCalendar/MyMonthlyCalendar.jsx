import React from "react";
import "./MyMonthlyCalendar.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import events from "./events";
export default function MyMonthlyCalendar() {
  return (
    <div className="calendar">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
        displayEventEnd="true"
        eventColor={"#2765d8"}
      />
    </div>
  );
}

// import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// {/* <FullCalendar
//   defaultView="dayGridMonth"
//   header={{
//     left: "prev,next",
//     center: "title",
//     right: "dayGridMonth,timeGridWeek,timeGridDay",
//   }}
//   themeSystem="Simplex"
//   plugins={[dayGridPlugin]}
//   events={events}
// /> */}
// themeSystem="Simplex"
// header={{
//   left: "prev,next",
//   center: "title",
//   right: "dayGridMonth,timeGridWeek,timeGridDay",
// }}
