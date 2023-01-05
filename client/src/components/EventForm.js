import React, { useContext } from "react";
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

import { Auth } from "../contexts/Auth";
import Moment from "moment";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

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

export default function EventForm({ event }) {
  const [expanded, setExpanded] = React.useState(false);

  const { user } = useContext(Auth);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }
  const participants = event.participants;

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
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`Organizer:  ${user.username}`}
          subheader={`created At: ${Moment(event.createdAt).format(
            "DD-MM-YYYY"
          )}`}
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
                      <li key={participant.id}>{participant.username}</li>
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
