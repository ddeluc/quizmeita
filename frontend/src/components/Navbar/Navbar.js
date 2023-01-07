import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Router, Route, Routes} from 'react-router';

import HomePage from '../../pages/HomePage/HomePage';
import QuizPage from '../../pages/QuizPage/QuizPage';
import Auth from '../Auth/Auth';

function Navbar({ userData, setToken, setUserData }) {
    // const [isSignedIn, setIsSignedIn] = useState(false);
    // const [user, setUser] = useState();
    
    useEffect(() => {
        console.log(userData);
    }, [])

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUserData(null);
    };
    
    return (
        <div>   
            <Link to="/">Quizshare</Link> 
            <button onClick={logout}>Logout</button>       
            <Routes>      
                <Route path="/" element={<HomePage userData={userData} />} />
                <Route path="/quiz/:username/:id" element={<QuizPage />} />
            </Routes>
        </div>
    ); 
}

export default Navbar;
