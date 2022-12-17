import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./Navbar/Navbar";
import Home from "./main/Home";
import Login from "./login-signup/Login";
import Signup from "./login-signup/Signup";



function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
