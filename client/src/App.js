import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Navbar from "./Navbar/Navbar";
import Home from "./main/Home";
import Login from "./login-signup/Login";
import Signup from "./login-signup/Signup";
import { Auth } from "./contexts/Auth";
import { useContext } from "react";



function App() {
  const { user } = useContext(Auth);
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={!user ?( <Login />) :( <Navigate to="/"/>)} />
        <Route path="/signup" element={!user ?( <Signup />) :( <Navigate to="/"/>)} />
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
