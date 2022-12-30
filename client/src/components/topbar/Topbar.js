import React from "react";
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
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import { useLogout } from "../../hooks/UseLogout";
import "./dropDownMenu.css";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();

  // profile menu
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dummyMenuItems = [
    {
      id: 1,
      title: (
        <div className="d-grid">
          <button className="btn btn-secondary ">
            <big>Profile</big>
          </button>
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

  return (
    <div className="w-full">
      <Box display="flex" justifyContent="space-between" p={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          ml="15px"
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
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            aria-label="Open to show more"
            title="Open to show more"
          >
            <PersonOutlinedIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {dummyMenuItems.map((item) => (
              <MenuItem onClick={handleClose} key={item.id} value={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Menu>
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
