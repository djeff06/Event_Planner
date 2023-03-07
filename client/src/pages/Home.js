import React from "react";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
/* import { makeStyles } from "@mui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "20px",
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}); */

const Home = () => {
  // const classes = useStyles();
  // console.log("classes", classes)

  return (
    <div className="flexGrow-1 p-20px">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom>
            Event Planner
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className="maxWidht-345">
            <CardActionArea>
              <CardMedia
                className="h-140"
                image="https://source.unsplash.com/featured/?event"
                title="Event"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Your Dream Event
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Let us help you plan the perfect event. From weddings to
                  corporate events, we've got you covered.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Learn More
              </Button>
              <Button size="small" color="primary">
                Book Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className="maxWidht-345">
            <CardActionArea>
              <CardMedia
                className="h-140"
                image="https://source.unsplash.com/featured/?party"
                title="Party"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Unforgettable Parties
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Make your next party one to remember. We can help with
                  everything from decorations to catering.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Learn More
              </Button>
              <Button size="small" color="primary">
                Book Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            At Event Planner, we're passionate about creating unforgettable
            events. We work closely with our clients to ensure that every detail
            is taken care of, from start to finish. Whether you're planning a
            wedding, corporate event, or private party, we've got you covered.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Email: info@eventplanner.com
          </Typography>

          <Typography variant="body1" align="center" gutterBottom>
            Phone: 555-555-5555
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Address: 123 Main St, Anytown USA
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
