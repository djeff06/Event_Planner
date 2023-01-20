import React, { useState } from "react";
import { MyProSidebarProvider } from "../components/sidebar/sidebarContext";
import Topbar from "../components/topbar/Topbar";
import EventsPage from "../components/EventsPage";

export default function Events() {
  const [theme1, setTheme1] = useState("dark");

  return (
    <div>
      <MyProSidebarProvider>
        <div className="w-full">
          <Topbar
            theme1={theme1}
            setTheme1={setTheme1}
            className="h-100 w-100"
          />
          <EventsPage />
        </div>
      </MyProSidebarProvider>
    </div>
  );
}
