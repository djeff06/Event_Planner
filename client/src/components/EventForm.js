import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PopupDelete from "./PopupDelete";

import { Auth } from "../contexts/Auth";
import Moment from "moment";
import { List, ListItem, ListItemText, Menu, MenuItem } from "@mui/material";
import PopupUpdateEvent from "./PopupUpdateEvent";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function EventForm({ event, setEvents }) {
  const { user } = useContext(Auth);
  const participants = event.participants;
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /*   function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  } */

  // profile menu

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
          <button
            onClick={() => setShowModal2(true)}
            className="btn btn-secondary "
          >
            <big>Edit</big>
          </button>
        </div>
      ),
    },
    {
      id: 2,
      title: (
        <div className="d-grid">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-secondary "
          >
            <big>Delete</big>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card sx={{ minWidth: 345, maxWidth: 345, bgcolor: "transparent" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user.username[0]}
            </Avatar>
          }
          action={
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              aria-label="settings"
              title="Settings"
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={`Organizer:  ${user.postedBy}`}
          subheader={`created At: ${Moment(event.createdAt).format(
            "DD-MM-YYYY"
          )}`}
        />
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
        <PopupDelete
          event={event}
          setEvents={setEvents}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <PopupUpdateEvent
          event={event}
          showModal={showModal2}
          setShowModal={setShowModal2}
          setEvents={setEvents}
        />
        <Typography marginLeft={2} variant="body1" color="text.primary">
          {event.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Date : {Moment(event.date).format("DD-MM-YYYY")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration : {event.duration}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>Description :</Typography>
            <Typography paragraph>{event.description}</Typography>
            <Typography>Participants :</Typography>

            <List>
              {/* {generate( */}
              <ListItem
              /* secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  } */
              >
                {/* <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar> */}
                <ListItemText
                  primary={participants.map((participant) => (
                    <span className="text-sm" key={participant.id}>{participant.username}</span>
                  ))}
                />
              </ListItem>
              {/* )} */}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
