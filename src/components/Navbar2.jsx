import React from "react";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom";
import "../SCSS/Navbar2.css";

function Navbar2({ cartItems, user, signOut }) {
  return (
    <div className="nav">
      <Link to="/">
        <img
          className="nav-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      <div className="nav-address">
        <p className="add-first">Deliver to</p>
        <div className="add-icon">
          <SlLocationPin />
          <p className="add-second">India</p>
        </div>
      </div>
      <div className="nav-search">
        <input className="nav-searchInput" type="text" />
        <IoIosSearch className="nav-searchIcon" />
      </div>
      <div className="nav-nav">
        <div className="nav-option">
          <span className="nav-optionLineOne">Hello</span>
          <span className="nav-optionLineTwo">
          </span>
        </div>

        <Link to="/orders">
          <div className="nav-option">
            <span className="nav-optionLineOne">Returns</span>
            <span className="nav-optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="nav-option">
          <span className="nav-optionLineOne">Your</span>
          <span className="nav-optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="nav-optionBasket">
            <FaShoppingCart />
            <span className="nav-optionLineTwo nav-basketCount">0</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar2;
