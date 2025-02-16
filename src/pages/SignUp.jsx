import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import{useNavigate} from "react-router-dom";
import "../styles/Signup.css"

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate()

    const handleSubmit = (event) => {
        let inputObj = {name, email, password};
        // let url = 'http://localhost:4000/users/adduser';
        let url = 'https://chatvitus-backend.onrender.com/users/adduser';

        try{
            axios
            .post(url, inputObj)
            .then((res) => {
                console.log(res);
                navigate('/')
            })
        }catch(err){
            console.log(err);
        };
        event.preventDefault();
    };

    return (
        <div className='login-container'>
            <div className="card">
                <div className="title">
                    <p>Chat <span>VIT</span> Us</p>
                </div>
                <div className="credentials">
                    <form onSubmit = {handleSubmit}>
                        <div className="input">
                            <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div className="input">
                            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="input">
                            <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="submit">
                            <input type="submit" id='reg' value='Sign Up'/>
                        </div>
                    </form>
                </div>
                <div className="login">
                    <div className="text">
                        <p>Already have an account?</p>
                    </div>
                    <div className="hyper-link">
                        <Link to="/" id='hyper-link'>Login</Link>
                    </div>
                </div>
            </div>
      
        </div>
    )
}

export default SignUp
