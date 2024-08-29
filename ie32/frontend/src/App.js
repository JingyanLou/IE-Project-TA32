import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import the Navbar component
import Homepage from './pages/homepage';
import Upload from './pages/uploadpage'; // Import the Upload component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar will be used across all pages */}
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* Route for homepage */}
          <Route path="/upload" element={<Upload />} /> {/* Route for upload page */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;