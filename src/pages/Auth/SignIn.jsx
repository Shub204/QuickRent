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
    <div className="login">
      <h1>Login</h1>
      <form className="login-container">
        <button className="login-button-one" onClick={signInwithGoogle}>
          SignIn With <FcGoogle size={30} />
        </button>
        <div className="login-pipe">OR</div>
        <input type="email,number" placeholder="Enter Email or Phone Number" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <a href="#">REGISTER</a>
        <a href="#">Forgot Password?</a>
      </form>
    </div>
  );
}

export default SignIn;
