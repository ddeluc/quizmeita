// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import style from './style.css';
import * as api from "../../api/index.js";

function Auth() {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })   
        console.log(formData);     
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isSignup) {
            // handle signup
            try { 
                const { data } = await api.signUp(formData);

                const token = data.token

                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('profile', JSON.stringify(data.result));
                console.log("Signed Up!")
            } catch (error) {
                console.log(error);
            }           

        } else {
            // handle signin
            try {    
                const { data } = await api.signIn(formData);

                const token = data.token

                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('profile', JSON.stringify(data.result))
                console.log("Signed In!")
            } catch (error) {
                console.log(error);
            }           
        }
    };
    
    return(
        <div className="login-wrapper">
            <h1> {isSignup ? "Sign up" : "Log In"}</h1>
            <form>
                <label>
                    <p> {isSignup ? "Create " : ""} Username</p>
                    <input onChange={handleChange} type="text" name="username"/>
                </label>
                <label>
                    <p>Password</p>
                    <input onChange={handleChange} type="text" name="password" />
                </label>
                {
                    isSignup && (
                        <label>
                            <p>Confirm Password</p>
                            <input onChange={handleChange} type="text" name="confirmPassword"/>
                        </label>
                    )
                }
            <div>
                <button onClick={handleSubmit} type="submit">Submit</button>
            </div>
          </form>
          <button onClick={() => {setIsSignup(!isSignup)}}>{ isSignup ? "Log In" : "Sign Up" }</button>
        </div>
      )
}

export default Auth;