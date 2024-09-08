import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/homepage';
import Upload from './pages/uploadpage';
import RecommendationsPage from './pages/RecommendationsPage';
import EstimationIntroductionPage from './pages/EstimationIntroductionPage';
import SelectionPage from './pages/SelectionPage'; // Import the new SelectionPage component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar will be used across all pages */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/estimation-introduction" element={<EstimationIntroductionPage />} />
          <Route path="/selection" element={<SelectionPage />} /> {/* New route for the selection page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;