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
  ListItemText,
  ListItem,
  List,
  Badge,
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
import { Auth } from "../../contexts/Auth";

const Topbar = ({ theme1, setTheme1 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const { user } = useContext(Auth);

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

  // notification
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("/api/send-invitations/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((notifications) => {
        setNotifications(notifications);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const notifications = [<Notification NmbrOfNotification={NmbrOfNotification} setNmbrOfNotification={setNmbrOfNotification}/>];
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
  const handleMenuItemClick = (id, index) => {
    setSelectedIndex(index);
    fetch(`/api/send-invitations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ read: true }),
    })
      .then((res) => {
        // Disable notification item in frontend
        setNotifications((prevNotifications) => {
          const updatedNotifications = prevNotifications.map((notification) => {
            if (notification._id === id) {
              return {
                ...notification,
                read: true,
                disabled: true,
              };
            } else {
              return notification;
            }
          });
          return updatedNotifications;
        });
      })
      .catch((err) => {
        console.error(err);
      });
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
            <IconButton sx={{ margin: "0 6 0 2" }} onClick={toggleSidebar}>
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
            <Badge
              padding="0"
              badgeContent={notifications.filter((item) => !item.read).length}
              color="secondary"
            >
              <NotificationsOutlinedIcon />
            </Badge>
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
              <ListItem onClick={handleMenuItemClick}>
                <ListItemText
                  primary="Notifications"
                  // secondary={notifications[selectedIndex]}
                />
              </ListItem>

              {notifications.slice().reverse().map((notif, index) => (
                <MenuItem
                  key={notif._id}
                  disabled={notif.read}
                  selected={index === selectedIndex}
                  divider={true}
                  onClick={() => handleMenuItemClick(notif._id, index)}
                >
                  <div className="menu-item-heading">
                    <h2>{notif.message.notification.title}</h2>
                    <div>{notif.message.notification.body}</div>
                  </div>
                </MenuItem>
              ))}
            </List>
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
