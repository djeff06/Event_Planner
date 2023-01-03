import React from "react";

import EventForm from "./EventForm";


export default function EventCard({events}) {



  return (
    <>
      <div className="flex flex-row gap-2 w-full flex-wrap  ">
        {events.map((event) => {
          return <EventForm event={event} key={event._id} />;
        })}
      </div> 
    </>
  );
}
