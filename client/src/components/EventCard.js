import React from "react";

import EventForm from "./EventForm";


export default function EventCard({events,setEvents}) {



  return (
    <>
      <div className="flex flex-row gap-2 w-full flex-wrap  ">
        {events.map((event) => {
          return <EventForm setEvents={setEvents} event={event} key={event._id} />;
        })}
      </div> 
    </>
  );
}
