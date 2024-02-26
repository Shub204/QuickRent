import React, { useState } from "react";
import "./Navbar.css";
import { IoIosSearch } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { IoIosArrowDropdown } from "react-icons/io";
import logo from "./logo.png";
import Dropdown from "./DropDown";

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

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
          <select
            value={selectedOption}
            onChange={(e) => handleSelect(e.target.value)}
            className={`custom-dropdown ${
              selectedOption !== "" ? "expanded" : ""
            }`}
          >
            <option value="" disabled>
              All
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        <input
          className="searchbox"
          type="text"
          placeholder="Find Cars, Mobile Phones and many more"
        />
        <button>
          <IoIosSearch className="nav-icon" />{" "}
        </button>
      </div>
      <div className="nav-right">
        <div className="nav-lang">
          <span>ENGLISH</span>
          <button>
            <IoIosArrowDropdown />
          </button>
        </div>
        <button className="nav-log">
          <a href="">Login</a>
        </button>
        <button className="nav-button"><a href="">Rentify</a></button>
      </div>
    </div>
  );
};

export default Navbar;
