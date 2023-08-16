import "./App.css";
import React, {useState} from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import { Routes, Route } from "react-router-dom";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
export default function App(){
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
      setAlert({
        msg: message,
        type: type,
      });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    };
     return (
      <>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </>
    );
}
