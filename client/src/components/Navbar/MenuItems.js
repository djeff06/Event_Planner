import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Link } from "react-router-dom";

const MenuItems = ({ showMenu, active }) => {
  return (
    <ul
      className={
        active
          ? "flex-col flex items-center fixed inset-0 left-2/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-0 md:hidden"
          : "hidden"
      }
    >
      <CloseIcon onClick={showMenu} className="cursor-pointer ml-5" />
      <li>
        <Link onClick={showMenu} to="/">
          Home
        </Link>
      </li>

      <li>
        <Link
          className="btn btn-ghost text-white normal-case mr-2"
          onClick={showMenu}
          to="/login"
        >
          Login
        </Link>
      </li>
    </ul>
  );
};

export default MenuItems;
