import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "./firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../SCSS/SignIn.css";
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useModal } from "../../ModalContext";
import SignUp from "./SignUp";
import user_icon from "../../components/Assets/person.png";
import email_icon from "../../components/Assets/email.png";
import password_icon from "../../components/Assets/password.png";

function SignIn() {
  const { openModal, closeModal, modalContent } = useModal();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const nav = useNavigate();

  function signInUser() {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signInwithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    // <div className="login">
    //   <h1>Login</h1>
    //   <form className="login-container">
    //     <button className="login-button-one" onClick={signInwithGoogle}>
    //       SignIn With <FcGoogle size={30} />
    //     </button>
    //     <div className="login-pipe">OR</div>
    //     <input type="email,number" placeholder="Enter Email or Phone Number" />
    //     <input type="password" placeholder="Password" />
    //     <button>Login</button>
    //     <a href="#">REGISTER</a>
    //     <a href="#">Forgot Password?</a>
    //   </form>
    // </div>
    <div className="login">
      <div className="header">
        <div className="text">SignUp</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="forgot-password">Forgot Password?</div>
      <div className="submit-container">
        <div className="submit" onClick={() => openModal(<SignUp />)}>
          SignUp?
        </div>
        <div className="submit">Login</div>
      </div>
      <button className="login-button" onClick={signInwithGoogle}>
        SignIn With <FcGoogle size={30} />
      </button>
    </div>
  );
}

export default SignIn;
