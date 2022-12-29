import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home";
import Login from "./pages/login-signup/Login";
import Signup from "./pages/login-signup/Signup";
import { Auth } from "./contexts/Auth";
import { useContext, useEffect, useState } from "react";

function App() {
  const { user } = useContext(Auth);
  const [theme1, setTheme1] = useState("dark");
  useEffect(() => {
    document.body.className = theme1;
  }, [theme1]);

  return (
    <BrowserRouter>
      <div className={`${theme1}`}>
        {!user && <Navbar theme1={theme1} setTheme1={setTheme1} />}{" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
