import React, { useState } from "react";
import { MyProSidebarProvider } from "../components/sidebar/sidebarContext";
import Topbar from "../components/topbar/Topbar";
import DashboardPage from "../components/DashboardPage";

export default function Dashboard() {
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
          <DashboardPage />
        </div>
      </MyProSidebarProvider>
    </div>
  );
}
