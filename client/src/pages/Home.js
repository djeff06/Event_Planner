import React from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import heroImage from "../assets/eventcard.png";

const Home = () => {
  return (
    <div className="flexGrow-1 p-20px">
      <section id="hero-section">
        <div className="flex flex-col md:flex-row items-center justify-center py-10">
          <div className="md:w-2/3 px-20">
            <h1 className="text-4xl font-bold mb-4">Plan Your Event with us</h1>
            <p className="mb-4">
              Enter your email to start planning your perfect event with our
              event planner tool.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-600 rounded-l py-2 px-3 bg-gray-800 text-white outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 rounded-r py-2 px-4 ml-2"
              >
                Get Started
              </button>
            </form>
          </div>
          <div className="md:w-1/3 px-10">
            <img
              src={heroImage}
              alt="Event planner"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom>
            We plan, You party
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
      
          </Card>
        </Grid>
        <Grid item sm={12}  >
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
            Address: 06000 Bejaia, Algeria
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
