import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {auth, provider, signInWithPopup} from '../firebase'
import '../styles/Login.css'
import googleBtn from '../assets/google.png'


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            // const result = await axios.post('http://localhost:4000/users/verify', {email, password});
            const result = await axios.post('https://chatvitus-backend.onrender.com/users/verify', {email, password});
            console.log(result);
            if(result.data.msg === "Success"){
                localStorage.setItem("user_id", result.data.user._id);
                navigate('/home');
            }
            else{
                alert('Login failed');
            }
        }catch(err){
            console.log(err);
        }
    };

    const handleGoogleLogin = async() => {
        try{
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);

            // const res = await axios.post('http://localhost:4000/users/googlelogin',{
            const res = await axios.post('https://chatvitus-backend.onrender.com/users/googlelogin',{
                email: user.email,
                name: user.displayName
            });

            console.log("Google Login Response:", res.data);

            if(res.data.success){
                localStorage.setItem("user_id", res.data.user._id);
                navigate('/home');
            }
            else{
                alert("Google login failed");
            }
        }catch(error){
            console.log("Google sign-in error: ", error);
        }
    };

    return (
        <div className="login-container">
        <div className="card">
            <div className="title">
                <p>Chat <span>VIT</span> Us</p>
            </div>
            <div className="credentials">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                    <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required id='ip-bar'/>
                    </div>
                    <div className="input">
                    <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="submit">
                    <input type="submit" id="reg" value="Login" />
                    </div>
                </form>
            </div>
            <div className="sign-up">
                <div className="text">
                <p>New user?</p>
                </div>
                <div className="hyper-link">
                <Link to="/signup" id='hyper-link'>Sign Up</Link>
                </div>
            </div>
            <div className="google-login" onClick={handleGoogleLogin}>
                <div className="google-icon">
                <img src={googleBtn} alt=""/>
                </div>
                <div className="text">
                <p>Sign in with Google</p>
                </div>
            </div>
            {/* <button onClick={handleGoogleLogin} className="google-login-btn">
                Sign in with Google
            </button> */}
        </div>
        </div>
    );
}

export default Login
