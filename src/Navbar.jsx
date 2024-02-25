import React, { useState } from "react";
import "./Navbar.css";
import { IoIosSearch } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { IoIosArrowDropdown } from "react-icons/io";
import logo from './logo.png'
import Dropdown from "./DropDown";

const Navbar = () => {


  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={logo} alt="" />
        <div className="nav-locat">
          <SlLocationPin className="nav-locationicon" />
          <input type="text" placeholder="Set Location.." />
          <button className="nav-dropdown">
            <IoIosArrowDropdown />
          </button>
        </div>
      </div>
      <div className="nav-mid">
        <Dropdown/>
        <input
          type="text"
          placeholder="Find Cars, Mobile Phones and many more"
        />
        <button>
          <IoIosSearch />{" "}
        </button>
      </div>
      <div className="nav-right">
        <select className="nav-lang">
          <option>English</option>
        </select>
        <button className="nav-log">Login</button>
        <button className="nav-button">rentify</button>
      </div>
    </div>
  );
};

export default Navbar;
