import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import {
  useTheme,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
  Popover,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import { useLogout } from "../../hooks/UseLogout";
import "./dropDownMenu.css";

import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Link } from "react-router-dom";
import Notification from "../Notification";

const Topbar = ({ theme1, setTheme1 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();

  useEffect(() => {
    document.body.className = theme1;
  }, [theme1]);

  const toggleTheme = () => {
    if (theme1 === "light") {
      setTheme1("dark");
      colorMode.toggleColorMode();
    } else {
      setTheme1("light");
      colorMode.toggleColorMode();
    }
  };

  const [isDarkMode, setDarkMode] = useState(true);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  // profile menu
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  // notification & profile

  const dummyMenuItems = [
    {
      id: 1,
      title: (
        <div className="d-grid">
          <Link to="/profile">
            <button className="btn btn-secondary ">
              <big>Profile</big>
            </button>
          </Link>
        </div>
      ),
    },
    {
      id: 2,
      title: (
        <div className="d-grid">
          <button onClick={handleLogout} className="btn btn-secondary ">
            <big>Logout</big>
          </button>
        </div>
      ),
    },
  ];

  const notifications = [<Notification />];
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [personAnchorEl, setPersonAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handlePersonClick = (event) => {
    setPersonAnchorEl(event.currentTarget);
  };

  const handlePersonClose = () => {
    setPersonAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleNotificationsClose();
  };

  return (
    <div className="w-full">
      <Box display="flex" justifyContent="space-between" p={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          ml="15px"
          mr="auto"
        >
          <Typography fontWeight="bold" variant="h1" color={colors.grey[100]}>
            Event Planner
          </Typography>
        </Box>
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

        {/* notification */}
        <Box display="flex">
          <IconButton
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleNotificationsClick}
            aria-label="Open to show more"
            title="Open to show more"
          >
            <NotificationsOutlinedIcon />
          </IconButton>
          <Menu
            id="notification-menu"
            anchorEl={notificationsAnchorEl}
            open={Boolean(notificationsAnchorEl)}
            onClose={handleNotificationsClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List component="nav">
              <ListItem button onClick={handleMenuItemClick}>
                <ListItemText
                  primary="Notifications"
                  secondary={notifications[selectedIndex]}
                />
              </ListItem>
            </List>
            {notifications.map((option, index) => (
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>

          {/* profile  */}
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton
            aria-controls="person-menu"
            aria-haspopup="true"
            onClick={handlePersonClick}
            aria-label="Open to show more"
            title="Open to show more"
          >
            <PersonOutlinedIcon />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={personAnchorEl}
            keepMounted
            open={Boolean(personAnchorEl)}
            onClose={handlePersonClose}
          >
            {dummyMenuItems.map((item) => (
              <MenuItem
                onClick={handlePersonClose}
                key={item.id}
                value={item.title}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>

          <button
            onClick={toggleTheme}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className={"pl-5"}
          >
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={20}
            />
          </button>
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