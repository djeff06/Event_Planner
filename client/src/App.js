import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login-signup/Login";
import Signup from "./pages/login-signup/Signup";
import { Auth } from "./contexts/Auth";
import React, { useContext, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import Profile from "./pages/Profile";

import UserPages from "./pages/UserPages";

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
                    element={!user ? <Home /> : <Navigate to="/user" />}
                  />{" "}
                  <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/user" />}
                  />
                  <Route
                    path="/signup"
                    element={!user ? <Signup /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/user/*"
                    element={user ? <UserPages /> : <Navigate to="/login" />}
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
