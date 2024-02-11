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



function SignUp() {
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
      <div className="form-wrapper">
      <form action="">
        <h2>Sign Up</h2>
        <div className="input-group">
          <input type="text" required/>
          <label for="">Username</label>
        </div>
        <div className="input-group">
          <input type="email" required/>
          <label for="">Email</label>
        </div>
        <div className="input-group">
          <input type="password" required/>
          <label for="">Password</label>
        </div>
        <div className="remember">
          <label><input type="checkbox"/> I agree to the terms & conditions</label>
        </div>
        <button className='button' type="submit">Sign Up</button>
        <div className="signUp-link">
          <p>Already have an account? <a href='./signin' className="signInBtn-link">Sign In</a></p>
        </div>
      </form>
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