// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

import React, { useState } from 'react';
import * as api from "../../api/index.js";

function Auth({ setUserData, setToken }) {
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        if(isSignup) {
            // handle signup
            try { 
                const { data } = await api.signUp(formData);
                const token = data.token;

                // Setup user data and token
                setUserData(data.result);
                setToken(token);
                localStorage.setItem('token', JSON.stringify(token));

                console.log("Signed Up!")
            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
            }           

        } else {
            // handle signin
            try {    
                const { data } = await api.signIn(formData);
                console.log(data);
                const token = data.token

                // Setup user data and token
                setUserData(data.result);
                setToken(token);
                localStorage.setItem('token', JSON.stringify(token));

                console.log("Signed In!")
            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
            }           
        }
    };
    
    return(
        <div className="login-wrapper">
            <h1> {isSignup ? "Sign up" : "Log In"}</h1>
            <form>
                <label>
                    <p> {isSignup ? "Create " : ""} Username</p>
                    <input onChange={handleChange} type="text" name="username" minLength={5} maxLength={12} required/>
                </label>
                <label>
                    <p>Password</p>
                    <input onChange={handleChange} type="text" name="password" minLength={8} required/>
                </label>
                {
                    isSignup && (
                        <label>
                            <p>Confirm Password</p>
                            <input onChange={handleChange} type="text" name="confirmPassword" minLength={8} required/>
                        </label>
                    )
                }
            <div>
                <button onClick={handleSubmit} type="submit">Submit</button>
            </div>
            {error ? <div>{error}</div> : null }
          </form>
          <button onClick={() => {setIsSignup(!isSignup)}}>{ isSignup ? "Log In" : "Sign Up" }</button>
        </div>
      )
}

export default Auth;