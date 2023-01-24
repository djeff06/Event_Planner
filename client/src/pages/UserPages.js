import React, { useState } from "react";
import { MyProSidebarProvider } from "../components/sidebar/sidebarContext";
import Topbar from "../components/topbar/Topbar";
import DashboardPage from "../components/DashboardPage";
import { useLocation } from "react-router-dom";
import EventsPage from "../components/EventsPage";
import CalendarPage from "../components/CalendarPge";

export default function UserPages() {
  const [theme1, setTheme1] = useState("dark");
  const location = useLocation()

  return (
    <div>
      <MyProSidebarProvider>
        <div className="w-full">
          <Topbar
            theme1={theme1}
            setTheme1={setTheme1}
            className="h-100 w-100"
          />
          {location.pathname === "/user/.../dashboard" &&
          <DashboardPage />
          }
          {location.pathname === "/user/.../events" &&
          <EventsPage />
          }
          {location.pathname === "/user/.../calendar" &&
          <CalendarPage />
          }
        </div>
      </MyProSidebarProvider>
    </div>
  );
}
