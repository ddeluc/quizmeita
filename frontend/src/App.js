import { HashRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import LoginPage from './pages/Login/LoginPage';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [userData, setUserData] = useState();
  const [token, setToken] = useState();

  if (!token) {
    return (<LoginPage setToken={setToken} setUserData={setUserData} ></LoginPage>)
  } else {
    return (
      <>
      <HashRouter>
        <Navbar userData={userData} setUserData={setUserData} setToken={setToken}></Navbar>
      </HashRouter>
      </>
    );
  }
}

export default App;

// *** HOW TO MAKE IT LOOK GOOD ***
// Use a modern, responsive design framework like Bootstrap or Material-UI to create a clean and professional look.
// Use high-quality images and graphics to add visual interest to your application.
// Use custom styles and CSS to create a unique and personalized look.
// Use animations and transitions to add depth and interactivity to your application.
// Use colors and typography effectively to create a cohesive design.
