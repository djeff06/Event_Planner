import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../contexts/Auth";
import EventForm from "./EventForm";

import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../theme";
import { mockTransactions } from "../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../components/Header";


import StatBox from "../components/StatBox";
import ProgressCircle from "../components/ProgressCircle";

export default function EventCard() {
  const { user } = useContext(Auth);
  const [events, setEvents] = useState([]);

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchEvents = async () => {
      const response = await fetch("/api/events", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const events = await response.json();
      console.log(events)
      setEvents(events);
    };

    fetchEvents();
  }, [user]);

  return (
    <>
      <div className="flex flex-row gap-1 w-full ">
        {events.map((event) => {
          return <EventForm event={event} key={event._id} />;
        })}
      </div>
    </>
  );
}
