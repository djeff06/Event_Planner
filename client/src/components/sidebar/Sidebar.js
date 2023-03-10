// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useContext, useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { useSidebarContext } from "./sidebarContext";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventIcon from "@mui/icons-material/Event";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { Auth } from "../../contexts/Auth";
import axios from "axios";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        backgroundColor: selected === title ? colors.blueAccent[500] : "transparent",
        
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("");
  const [avatar, setAvatar] = useState("");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const { user } = useContext(Auth);

  const uploadImg = async (e) => {
    // data for submit
    const image = e.target.files[0];

    if (!image) {
      return null;
    }
    const newTitle = image.name.replaceAll(" ", "").toLowerCase();

    const response = await fetch(`api/uploadURL/${newTitle}`, {
      method: "GET",
    });
    const data = await response.json();
    const { put, key } = data;
    await axios.put(put, image);

    try {
      await axios.post(
        `/api/users/`,
        { key },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
    try {
      const userInfo = await axios.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const image_url = userInfo.data.user.image_url;
      setAvatar(image_url);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const userInfo = await axios.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const image_url = userInfo.data.user.image_url;
      setAvatar(image_url);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  //
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        margin: 0,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .MenuItem": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} `,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} `,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
        width="177px"
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? (
                <SwitchLeftOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              ) : (
                <SwitchRightOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            backgroundColor: "transparent",

            }}
            
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
                ml="15px"
              >
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <div id="circle-avatar" className="text-center mx-auto mb-4">
                  <div
                    as="label"
                    htmlFor="inputImg"
                    className={`bg-slate-400 flex justify-center items-center m-0 absolute rounded-full mt-20 hover:scale-150 transition ease-in-out duration-300 ml-20`}
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="image/png"
                        type="file"
                        onChange={uploadImg}
                      />
                      <AddAPhotoIcon />
                    </IconButton>
                  </div>
                  {avatar ? (
                    <img id="circle-avatar" src={avatar && avatar} alt=""></img>
                  ) : (
                    <span className="uppercase">{user.username[0]}</span>
                  )}
                </div>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  textTransform="uppercase"
                >
                  {user.username}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "0%"}>
            <Item className="& ::hover"
              title="Dashboard"
              to=".../dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Events"
              to=".../events"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Calendar"
              to=".../calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
