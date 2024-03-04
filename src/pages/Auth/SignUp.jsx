import React, { useState } from 'react';
import { auth, db, storage } from './firebase.config';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
//import Home from './Home';
import { useNavigate, Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import { setDoc, doc} from 'firebase/firestore';
import { RiImageAddFill } from "react-icons/ri";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import '../../SCSS/SignUp.css'
import { useModal } from '../../ModalContext';
import SignIn from './SignIn';
import user_icon from '../../components/Assets/person.png'
import email_icon from '../../components/Assets/email.png'
import password_icon from '../../components/Assets/password.png'

function SignUp() {
  const { openModal, closeModal, modalContent } = useModal();
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [showpassword, setshowpassword] = useState(false);

    const navigate = useNavigate();

    const createUser = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
              sendEmailVerification(res.user)            

                const date = new Date().getTime();
                const storageRef = ref(storage, `${displayName + date}`);
          
                await uploadBytesResumable(storageRef, file).then(() => {
                  getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                      await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                      });
                      await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                      });
          
                      //create empty user chats on firestore
                      //await setDoc(doc(db, "userChats", res.user.uid), {});
                      navigate("/");
                    } catch (err) {
                      console.error(err);
                      setErr(true);
                      setLoading(false);
                    }
                  });
                });
        } catch (err) {
            console.log(err)
        }
    }

    return ( 
    <div className='signup'>
      <div className="header">
        <div className="text">SignUp</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={createUser} className='inputs'>
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Name"/>
        </div>
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email"/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password"/>
        </div>
      </form>
      <div className="submit-container">
        <div className="submit">SignUp</div>
        <div className="submit"><span onClick={() => openModal(<SignIn/>)}>Login?</span></div>
      </div>
    </div>
    );
}
 // <div className="formContainer">
        //     <div className="formWrapper">
        //         <span className="logo">QuickRent</span>
        //         <span className="title">Register</span>
        //         <form onSubmit={createUser}>
        //             <input required type="text" placeholder="display name" />
        //             <input required type="email" placeholder="email" />
        //             <input required type="password" placeholder="password" />
        //             <input required style={{ display: "none" }} type="file" id="file" />
        //             <label htmlFor="file">
        //                 <RiImageAddFill />
        //                 <span>Add an avatar</span>
        //             </label>
        //             <button disabled={loading}>Sign up</button>
        //             {loading && "Uploading and compressing the image please wait..."}
        //             {err && <span>Something went wrong</span>}
        //         </form>
        //         <p>
        //             You do have an account? <Link to="/signin">Login</Link>
        //         </p>
        //     </div>
        // </div>
export default SignUp;