import React, { useState, useEffect, useContext } from "react";
import { MyProSidebarProvider } from "../components/sidebar/sidebarContext";
import Topbar from "../components/topbar/Topbar";
import DashboardPage from "../components/DashboardPage";
import { useLocation } from "react-router-dom";
import EventsPage from "../components/EventsPage";
import CalendarPage from "../components/CalendarPge";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Auth } from "../contexts/Auth";

export default function UserPages() {
  const { user } = useContext(Auth);
  const [theme1, setTheme1] = useState("dark");
  const location = useLocation();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await fetch("/api/send-invitations/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const notifications = await response.json();
        console.log("notification", notifications);
        // Process the notifications
        notifications.map((notification) => {
          if (notification.read === false) {
            return toast(
              <ToastifyNotification
                title={notification.message.notification.title}
                body={notification.message.notification.body}
              />
            );
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    getNotifications();
  }, []);

  const ToastifyNotification = ({ title, body }) => (
    <div className="push-notification">
      <h2 className="push-notification-title">{title}</h2>
      <p className="push-notification-text">{body}</p>
    </div>
  );

  return (
    <div>
      <MyProSidebarProvider>
        <div className="w-full">
          <div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
          <Topbar
            theme1={theme1}
            setTheme1={setTheme1}
            className="h-100 w-100"
          />

          {location.pathname === "/user/.../dashboard" && <DashboardPage />}
          {location.pathname === "/user/.../events" && <EventsPage />}
          {location.pathname === "/user/.../calendar" && <CalendarPage />}
        </div>
      </MyProSidebarProvider>
    </div>
  );
}
