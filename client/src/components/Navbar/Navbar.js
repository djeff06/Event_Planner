import MenuIcon from "@mui/icons-material/Menu";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import { Auth } from "../../contexts/Auth";
import "./navbar.css";

import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Box, IconButton, useTheme } from "@mui/material";

const Navbar = ({ theme1, setTheme1 }) => {
  const { user } = useContext(Auth);
  const [active, setActive] = useState(false);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const showMenu = () => {
    setActive(!active);
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
            </>
          )}
          {
            <Link className="btn btn-ghost normal-case mr-2" to="/login">
              <li className=" transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 duration-300 cursor-pointer">
                {!user && <div>Login</div>}
              </li>
            </Link>
          }
          <Box>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
        </ul>

        <MenuItems showMenu={showMenu} active={active} />
      </nav>
    </div>
  );
};

export default Navbar;
