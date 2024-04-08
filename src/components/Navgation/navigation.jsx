import React from "react";
import './navigation.css';
import { Link, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const redirect = useNavigate();
  const handleLogout = () =>{
    sessionStorage.clear();
    redirect("/login");
  }
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-left">
            <li>
              <Link to="/" >
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" >
                Register
              </Link>
            </li>
            <li>
              <a href="#portfolio" >
                Gallery
              </a>
            </li>
            <li>
              <a to="#testimonials" >
                Zone
              </a>
            </li>
            <li>
              <Link to='/login'>
              Membership
              </Link>
            </li>
            <li>
              <a href="#contact">
                Contact
              </a>
            </li>
            <li>
              <a onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
