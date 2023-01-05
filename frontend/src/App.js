import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './pages/HomePage/HomePage';
import QuizPage from './pages/QuizPage/QuizPage';
import FlashPage from './pages/FlashPage/FlashPage';

function App() {
  return (
    <Routes>      
      <Route path="/" element={<HomePage/>} />
      <Route path="/quiz/:username/:id" element={<QuizPage />} />
      <Route path="/flash/:id" element={<FlashPage />} />
    </Routes>
  );
}

export default App;
