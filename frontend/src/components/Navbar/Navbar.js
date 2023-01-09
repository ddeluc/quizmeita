import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Router, Route, Routes} from 'react-router';

import { 
    Container,
    colors,
    Paper,
    Link as MaterialLink,
    TextField, 
    Typography, 
    Button, 
    Grid, 
    Box,
    FormControl, 
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton
} from '@mui/material';
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
        // <div>   
        //     <Link to="/">Quizshare</Link> 
        //     <button onClick={logout}>Logout</button>       
        // <Routes>      
        //     <Route path="/" element={<HomePage userData={userData} />} />
        //     <Route path="/quiz/:username/:id" element={<QuizPage />} />
        // </Routes>
        // </div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <MaterialLink component={RouterLink} to="/">home</MaterialLink>   
                <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Quizshare 
                </Typography>
                <MaterialLink component={RouterLink} to="/"></MaterialLink>             
                <Button onClick={logout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            <Routes>      
                <Route path="/" element={<HomePage userData={userData} />} />
                <Route path="/quiz/:username/:id" element={<QuizPage />} />
            </Routes>
        </Box>
    ); 
}

export default Navbar;
