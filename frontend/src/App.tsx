import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import PromptInterface from "./components/PromptInterface";
import { Login, Signup } from "./components/AuthPages";

function App() {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />

        {/* Routes for navigation */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          
          <Route path="/prompt" element={<PromptInterface />} />
        </Routes>       <ToastContainer />

        {/* Floating button to toggle Prompt Interface */}
     

        {/* Conditional rendering for PromptInterface */}
        {showPrompt && (
          <div className="container mx-auto py-20">
            <PromptInterface />
          </div>
        )}
      </div>

      
    </Router>
  );
}

export default App;
