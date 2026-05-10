import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import LoginPage from './pages/Login';
import MentorDashboard from './pages/MentorDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
