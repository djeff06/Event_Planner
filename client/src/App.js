import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login-signup/Login";
import Signup from "./pages/login-signup/Signup";
import { Auth } from "./contexts/Auth";
import React, {  useContext, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Events from "./pages/Events";
// import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user } = useContext(Auth);
  const [theme, colorMode] = useMode();
  const [theme1, setTheme1] = useState("dark");

  return (
    <BrowserRouter>
      <>
        <div style={{ height: "100%", width: "100%" }}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <main>
                {!user && <Navbar theme1={theme1} setTheme1={setTheme1} />}
                <Routes>
                  <Route
                    path="/"
                    element={!user ? <Home /> : <Navigate to="/dashboard" />}
                  />{" "}
                  <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/dashboard" />}
                  />
                  <Route
                    path="/signup"
                    element={!user ? <Signup /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/dashboard"
                    element={
                      user ? <Dashboard /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="/events"
                    element={
                      user ? <Events /> : <Navigate to="/login" />
                    }
                  />
                  <Route
                    path="/calendar"
                    element={
                      user ? <Calendar /> : <Navigate to="/login" />
                    }
                  />
                </Routes>
              </main>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
