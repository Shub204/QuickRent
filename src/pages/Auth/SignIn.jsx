import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from './firebase.config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../../SCSS/SignIn.css'
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useModal } from '../../ModalContext';
import SignUp from './SignUp';

function SignIn() {
    const { openModal, closeModal, modalContent } = useModal();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const nav = useNavigate();

    function signInUser() {

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                nav('/');
            })
            .catch((err) => {
                console.log(err);
            })

    }

    function signInwithGoogle() {

        signInWithPopup(auth, googleProvider)
            .then(() => {
                nav('/');
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <div className='login'>
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder='Username..' required/>
                <FaUser className='icon'/>
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password..' required/>
                <FaLock className='icon'/>
            </div>
            <div className="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot Passsword?</a>
            </div>
            <button onClick={signInUser}>Submit</button>
            <button onClick={signInwithGoogle}>SignIn With <FcGoogle size={30}/></button>
            <div className="register-link">
                <p>Don't have any account?<button onClick={() => openModal(<SignUp/>)}>Sign Up</button></p>
            </div>
        </form>
    </div>
    );
}

export default SignIn;