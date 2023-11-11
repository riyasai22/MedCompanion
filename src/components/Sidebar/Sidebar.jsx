import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
// import {
//   BsBagCheckFill,
//   BsCardChecklist,
//   BsFillCartCheckFill,
// } from "react-icons/bs";
import { RiHandbagFill, RiPriceTag2Fill } from "react-icons/ri";
import {
  FaIndustry,
  FaFileInvoice,
  FaHistory,
  FaUserFriends,
  FaShoppingBag,
} from "react-icons/fa";
import {
  MdDashboard,
  MdPrecisionManufacturing,
  MdSettings,
} from "react-icons/md";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

import "./Sidebar.css";
import {
  BsAlarmFill,
  BsCalendarDay,
  BsList,
  BsListCheck,
  BsPenFill,
  BsShop,
} from "react-icons/bs";
const sidebarLinks = [
  {
    icon: <MdDashboard />,
    title: "DASHBOARD",
    path: "/dashboard",
  },
  {
    icon: <BsCalendarDay />,
    title: "CALENDAR",
    path: "/user/view",
  },
  {
    icon: <BsPenFill />,
    title: "PRESCRIPTION",
    path: "/user/prescription",
  },
  {
    icon: <FaShoppingBag />,
    title: "ORDER",
    path: "/user/order",
  },
  {
    icon: <FaHistory />,
    title: "HISTORY",
    path: "/user/history",
  },
  {
    icon: <BsAlarmFill />,
    title: "ADD REMINDER",
    path: "/user/newmed",
  },
  {
    icon: <FaUserFriends />,
    title: "EMERGENCY",
    path: "/user/emergency",
  },
  {
    icon: <BsListCheck />,
    title: "APPOINTMENTS",
    path: "/user/appointments",
  },
  {
    icon: <MdSettings />,
    title: "SETTINGS",
    path: "/user/settings",
  },
];

const Sidebar = () => {
  const theme = "light";
  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={`
      sidebar-container ${theme === "light" ? " light" : "dark"} ${
        collapse && "collapse"
      }
      `}
    >
      <div className="sidebar-list">
        <AiOutlineDoubleLeft
          className={` collapse-btn ${!collapse && "collapse"}`}
          onClick={() => setCollapse(!collapse)}
        />
        <AiOutlineDoubleRight
          className={` collapse-btn ${collapse && "collapse"}`}
          onClick={() => setCollapse(!collapse)}
        />

        {sidebarLinks.map((link, index) => (
          <Link
            key={index}
            className="sidebar-list-item"
            to={link.path}
            style={{
              color: theme === "light" ? `var(--white)` : `var(--purple)`,
            }}
          >
            {link.icon}
            <h3>{link.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
