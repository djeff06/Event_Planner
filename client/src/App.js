import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login-signup/Login";
import Signup from "./pages/login-signup/Signup";
import { Auth } from "./contexts/Auth";
import React, { Profiler, useContext, useState } from "react";
import { MyProSidebarProvider } from "./components/sidebar/sidebarContext";
import Topbar from "./components/topbar/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

function App() {
  const { user } = useContext(Auth);
  const [theme, colorMode] = useMode();
  const [theme1, setTheme1] = useState("dark");

  return (
    <BrowserRouter>
      <>
        <div style={{ height: "100%", width: "100%" }}>
          {!user && <Navbar theme1={theme1} setTheme1={setTheme1} />}
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route>
                  <Route
                    path="/"
                    element={!user ? <Home /> : <Navigate to="/" />}
                  />{" "}
                  <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/dashboard" />}
                  />
                  <Route
                    path="/signup"
                    element={!user ? <Signup /> : <Navigate to="/dashboard" />}
                  />
                </Route>

                <Route
                  path="/dashboard"
                  element={
                    user ? (
                      <MyProSidebarProvider>
                        <div className="w-full">
                          <Topbar
                            theme1={theme1}
                            setTheme1={setTheme1}
                            className="h-100 w-100"
                          />
                          <Dashboard />
                        </div>
                      </MyProSidebarProvider>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/events"
                  element={
                    user ? (
                      <MyProSidebarProvider>
                        <div className="w-full">
                          <Topbar
                            theme1={theme1}
                            setTheme1={setTheme1}
                            className="h-100 w-100"
                          />
                          <Events />
                        </div>
                      </MyProSidebarProvider>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/profile"
                  element={
                    user ? (
                      <MyProSidebarProvider>
                        <div className="w-full">
                          <Topbar
                            theme1={theme1}
                            setTheme1={setTheme1}
                            className="h-100 w-100"
                          />
                          <Profile />
                        </div>
                      </MyProSidebarProvider>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Routes>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
