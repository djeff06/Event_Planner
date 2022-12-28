import MenuIcon from "@mui/icons-material/Menu";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import { Auth } from "../contexts/Auth";
import { useLogout } from "../hooks/UseLogout";
import { PopupMenu } from "react-simple-widgets";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import "./navbar.css";

const Navbar = ({ theme1, setTheme1 }) => {
  const { user } = useContext(Auth);
  const { logout } = useLogout();
  const [active, setActive] = useState(false);

  const showMenu = () => {
    setActive(!active);
  };

  const handleLogout = () => {
    logout();
  };

  const toggleTheme = () => {
    if (theme1 === "light") {
      setTheme1("dark");
    } else {
      setTheme1("light");
    }
  };

  const [isDarkMode, setDarkMode] = useState(true);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };
  return (
    <div className="fixed w-full flex justify-between pt-0 pr-4 pl-4  items-center">
      <div className="text-2xl font-bold  ">
        <Link to="/">
          <h1>
            {" "}
            <span className=" block text-2xl">Event Planner</span>
          </h1>
        </Link>
      </div>

      <nav>
        <div className="absolute right-6 md:hidden top-6 scale-150">
          <MenuIcon onClick={showMenu} className="scale-150 cursor-pointer" />
        </div>

        <ul className="hidden md:flex gap-10 p-6 uppercase ">
          {user && (
            <>
              <li>
                <div className="form-control mr-0 h-7">
                  <input
                    type="search"
                    className="cursor-pointer relative z-10 h-7 w-12 rounded-full  bg-transparent pl-12 outline-none transition ease-in-out delay-150 focus:-translate-y-0 focus:scale-100 duration-500 focus:w-full focus:h-8 focus:cursor-text focus:border-red-500 focus:border-4 focus:pl-16"
                    placeholder="Search"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-y-0 my-auto h-8 w-12  border-transparent stroke-gray-500 px-3.5 peer-focus:border-red-500 peer-focus:stroke-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 23l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </li>
              <li
                className="light: transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-150 duration-300 before:content-['']
                before:absolute
                before:-bottom-0
                before:left-0
                before:w-0
                before:h-1
                before:rounded-full
                before:opacity-0
                before:transition-all
                before:duration-500
                before:bg-gradient-to-r
                before:from-red-400
                before:via-rose-900
                before:to-red-500
                hover:before:w-full
                hover:before:opacity-100"
              >
                <Link to="/">Home</Link>
              </li>

              <li
                className="light: transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-150 duration-300 before:content-['']
                before:absolute
                before:-bottom-0
                before:left-0
                before:w-0
                before:h-1
                before:rounded-full
                before:opacity-0
                before:transition-all
                before:duration-500
                before:bg-gradient-to-r
                before:from-red-400
                before:via-rose-900
                before:to-red-500
                hover:before:w-full
                hover:before:opacity-100"
              >
                <Link to="/movies">Events</Link>
              </li>
              <li
                className="light: transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-150 duration-300 before:content-['']
                before:absolute
                before:-bottom-0
                before:left-0
                before:w-0
                before:h-1
                before:rounded-full
                before:opacity-0
                before:transition-all
                before:duration-500
                before:bg-gradient-to-r
                before:from-red-400
                before:via-rose-900
                before:to-red-500
                hover:before:w-full
                hover:before:opacity-100"
              >
                <Link to="/series">Categories</Link>
              </li>

              {/* dropdown menu user profile */}

              <div className="text-black text-end">
                <PopupMenu>
                  <button id="profile-picture" className="btn btn-primary">
                    <small>{user.username[0]}</small>
                  </button>

                  <div className="card text-start bg-slate-50 mt-10 mr-5">
                    <div className="card-body px-4 py-4">
                      <div
                        id="circle-avatar"
                        className="text-center mx-auto mb-4"
                      >
                        <span>{user.username[0]}</span>
                      </div>

                      <h5 className="text-center mb-0 ">{user.username}</h5>
                      <p className="text-center mb-2  normal-case">
                        {user.email}
                      </p>

                      <hr />

                      <p className="mb-0 font-bold  text-xs">ROLES</p>
                      <p className="" style={{ fontSize: 12 }}>
                        {[
                          "Submitter",
                          "Project manager",
                          "Change control board",
                        ].join(", ")}
                      </p>

                      <hr className="mb-0" style={{ margin: "0 -0px 0" }} />

                      <div
                        className="list-group list-group-flush"
                        style={{ margin: "0 -0 0" }}
                      >
                        <button className="list-group-item list-group-item-action mb-2 ">
                          <big>Notification</big>
                        </button>
                        <button className="list-group-item list-group-item-action  ">
                          <big>Profile settings</big>
                        </button>
                      </div>

                      <hr style={{ margin: "0 0px 24px" }} />
                      <Link className="btn btn-ghost normal-case mr-2" to="/login">
                      <div className="d-grid">
                        <button
                          onClick={handleLogout}
                          className="btn btn-secondary "
                        >
                          <big>Logout</big>
                        </button>
                      </div>
                      </Link>
                    </div>
                  </div>
                </PopupMenu>
              </div>
            </>
          )}
          {
            <Link className="btn btn-ghost normal-case mr-2" to="/login">
              <li className=" transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 cursor-pointer">
                {!user && <div>Login</div>}
              </li>
            </Link>
          }
          <li className=" transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 cursor-pointer">
            <button onClick={toggleTheme}>
              <DarkModeSwitch
                style={{ marginBottom: ".1rem" }}
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={20}
              />
            </button>
          </li>
        </ul>

        <MenuItems showMenu={showMenu} active={active} />
      </nav>
    </div>
  );
};

export default Navbar;
