import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../contexts/Auth";
import EventCard from "./EventForm";

export default function Events() {
  const { user } = useContext(Auth);
  const [events, setEvents] = useState([]);

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
      <div>
        {events.map((event) => {
          return <EventCard event={event} key={event._id} />;
        })}
      </div>
    </>
  );
}
