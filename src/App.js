import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Prescription from "./components/Prescription/Prescription";
import History from "./components/History/History";
import Apoointments from "./components/Appointments/Appointments";
import Setting from "./components/Setting/Setting";
import "@zach.codes/react-calendar/dist/calendar-tailwind-no-reset.css";
import MyMonthlyCalendar from "./components/MyMonthlyCalendar/MyMonthlyCalendar";
import { useEffect, useState } from "react";
import { setRecurringAlarm } from "./alarmUtils";
import axios from "axios";
import { useRef } from "react";
import Sound from "react-sound";
import { FaTimes } from "react-icons/fa";
import Pill from "./media/pill.png";
import AddMed from "./components/AddMed/AddMed";
import NewMed from "./components/NewMed/NewMed";
import AlanContainer from "./AlanContainer";
import Game from "./components/TicTac";
import SignIn from "./components/SignIn/SignIn";
import Emergency from "./components/Emergency/Emergency";
import AddEmergencyContact from "./components/AddEmergencyContact/AddEmergencyContact";
import OrderMeds from "./components/OrderMeds/OrderMeds";

function App() {
  const [formData, setFormData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shutDown, setShutDown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [medName, setMedName] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleNotifyClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/medications/notify"
      );
      if (response.status === 200) {
        alert("Emergency notification sent successfully.");
      } else {
        alert("Failed to send emergency notification.");
      }
    } catch (error) {
      console.error("Error sending emergency notification:", error);
    }
  };

  const closeAlarmFunction = () => {
    setShutDown(true);
    setShowPopup(false);
    setIsPlaying(false);
  };
  const medGet = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/medications");
      //   console.log(response.data);
      setFormData(response.data); // Update state with the fetched data
      callAlarms();
    } catch (error) {
      console.error("GET request error:", error);
    }
  };

  const callAlarms = () => {
    formData.forEach((item) =>
      setRecurringAlarm(
        item.reminder, // Reminder time (HH:MM format)
        item.days, // Selected days
        () => {
          console.log("Alarm triggered in App.js!");
          console.log(`Medicine Name: ${item.name}`);
          console.log(`Instructions: ${item.instruction}`);
          setMedName(item.name);
          setInstructions(item.instruction);
          //       console.log(parseInt(item.alarmDuration) * 1000 * 60);

          setIsPlaying(true);
          setShowPopup(true);
          setTimeout(
            () => {
              setIsPlaying(false);
              setShowPopup(false);
            },
            shutDown === true ? 0 : parseInt(item.alarmDuration) * 1000 * 60
          );
        }
      )
    );
  };
  useEffect(() => {
    medGet();
  }, [formData]);

  return (
    <div className="App" style={{ overflowX: "hidden" }}>
      <Emergency onClick={handleNotifyClick} />

      <Sound
        url="/static/slow_morning.mp3"
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
      />

      {showPopup && (
        <div className="popup_container">
          <div className="popup" style={{ padding: "20px 40px" }}>
            <img src={Pill} alt="img" />

            <FaTimes className="i" onClick={() => setShowPopup(false)} />

            <p className="popup-text">{medName}</p>
            <p className="popup-text" style={{ fontSize: "11px" }}>
              {instructions}
            </p>

            <button
              type="button"
              className="accept"
              onClick={closeAlarmFunction}
            >
              Completed
            </button>
          </div>
        </div>
      )}
      <Sidebar />
      <Navbar />
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/user/newmed" element={<NewMed />} />
        <Route exact path="/user/prescription" element={<Prescription />} />
        <Route exact path="/user/order" element={<OrderMeds />} />
        <Route exact path="/user/history" element={<History />} />
        <Route exact path="/user/emergency" element={<AddEmergencyContact />} />
        <Route exact path="/user/appointments" element={<Apoointments />} />
        <Route exact path="/user/settings" element={<Setting />} />
        <Route exact path="/user/view" element={<MyMonthlyCalendar />} />
        <Route exact path="/" element={<SignIn />} />
        {/* <Route exact path="/user/tictac" element={<Game />} /> */}
      </Routes>
      {/* <AlanContainer /> */}
    </div>
  );
}

export default App;
