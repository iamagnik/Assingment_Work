import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import Onboarding2 from './components/Onboarding2';
import Onboarding3 from './components/Onboarding3';
import Login from './components/Login';
import Signup from './components/Signup';
import ClockPage from './components/ClockPage';
import LoginSuccess from './components/LoginSuccess';


function App() {
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <main className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Onboarding />} />
          <Route exact path="/onboarding2" element={<Onboarding2 />} />
          <Route exact path="/onboarding3" element={<Onboarding3 />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/track" element={<ClockPage />} />
          <Route exact path="/login-success" element={<LoginSuccess />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
