import React from "react";
import "./App.css";
import { Home } from "./components/Home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/login";
import { Register } from "./components/Register/register";
import { Gallery } from "./components/Gallery/gallery";
import { Navigation } from "./components/Navgation/navigation";
import { UpdateDetails } from "./components/Updateprofile/updateProfile";
import { GetUserDetails } from "./components/GetUserDetails/GetUserDetails";

const App = () => {

  return (
    <div className="home">
      <BrowserRouter>
        <div className="navigationBar">
        <Navigation />
        </div>
        <div className="mainContents">
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/update-profile" element={<UpdateDetails />} />
            <Route path="/get-user-info" element={<GetUserDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;