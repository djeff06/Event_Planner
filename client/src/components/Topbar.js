import React from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import { useTheme, Box, IconButton, InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/UseLogout";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const dropMenu = () => {
    console.log("profile icon clicked");
    return (
      <>
      
        <div className="d-grid">
          <button onClick={handleLogout} className="btn btn-secondary ">
            <big>Logout</big>
          </button>
        </div>
      
      </>
    );
  };

  return (
    <div className="w-full">
      <Box display="flex" justifyContent="space-between" p={3}>
        <Box display="flex" p={2}>
          {broken && !rtl && (
            <IconButton
              sx={{ margin: "0 6 0 2" }}
              onClick={() => toggleSidebar()}
            >
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            p={0.2}
            borderRadius={1}
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
            <IconButton type="button">
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton onClick={dropMenu}>
            <PersonOutlinedIcon />
            
          </IconButton>
          {broken && rtl && (
            <IconButton
              sx={{ margin: "0 6 0 2" }}
              onClick={() => toggleSidebar()}
            >
              <MenuOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Topbar;
