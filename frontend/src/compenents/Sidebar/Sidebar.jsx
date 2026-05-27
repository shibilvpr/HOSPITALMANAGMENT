import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  UserRound,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import "./Sidebar.css";

const Sidebar = () => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

  // GET USER

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role =
    user?.role;

  const menus = [

    {
      name: "Dashboard",

      path: "/dashboard",

      icon: (
        <LayoutDashboard
          size={20}
        />
      ),

      roles: [
        "admin",
        "receptionist",
      ],
    },

    {
      name: "Patients",

      path: "/patients",

      icon: (
        <Users size={20} />
      ),

      roles: [
        "admin",
        "receptionist",
      ],
    },

    {
      name: "Appointments",

      path: "/appointments",

      icon: (
        <CalendarCheck
          size={20}
        />
      ),

      roles: [
        "admin",
        "receptionist",
        "doctor",
      ],
    },

    {
      name: "Doctors",

      path: "/doctors",

      icon: (
        <UserRound
          size={20}
        />
      ),

      roles: ["admin"],
    },

    {
      name: "Receptionist Management",

      path: "/receptionists",

      icon: (
        <Users
          size={20}
        />
      ),

      roles: ["admin"],
    },
  ];

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (

    <>

      {/* MOBILE BUTTON */}

      <button
        className="menu-btn"
        onClick={() =>
          setOpen(!open)
        }
      >

        {open ? <X /> : <Menu />}

      </button>

      {/* SIDEBAR */}

      <div
        className={`sidebar ${
          open ? "show" : ""
        }`}
      >

        {/* LOGO */}

        <div className="sidebar-logo">

          <div className="logo-box">
            C
          </div>

          <div>

            <h2>
              CareWell
            </h2>

            <p>
              Hospital System
            </p>

          </div>

        </div>

        {/* USER */}

        <div className="sidebar-user">

          <div className="user-avatar">

            {user?.name
              ?.charAt(0)
              .toUpperCase()}

          </div>

          <div>

            <h4>
              {user?.name}
            </h4>

            <p>
              {user?.role}
            </p>

          </div>

        </div>

        {/* MENU */}

        <div className="sidebar-menu">

          {menus

            .filter((item) =>
              item.roles.includes(
                role?.toLowerCase()
              )
            )

            .map((item) => (

              <Link
                key={item.name}

                to={item.path}

                className={`sidebar-link ${
                  location.pathname ===
                  item.path
                    ? "active"
                    : ""
                }`}

                onClick={() =>
                  setOpen(false)
                }
              >

                <div className="icon-box">
                  {item.icon}
                </div>

                <span>
                  {item.name}
                </span>

              </Link>
            ))}

        </div>

        {/* LOGOUT */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

      {/* OVERLAY */}

      {open && (

        <div
          className="sidebar-overlay"
          onClick={() =>
            setOpen(false)
          }
        />

      )}

    </>
  );
};

export default Sidebar;