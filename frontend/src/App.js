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

  // return (
  //   <Routes>      
  //     <Route path="/" element={<HomePage/>} />
  //     <Route path="/quiz/:username/:id" element={<QuizPage />} />
  //     <Route path="/flash/:id" element={<FlashPage />} />
  //   </Routes>
  // );
}

export default App;
