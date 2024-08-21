import React from 'react';
import Navbar from './components/Navbar'; // Import the Navbar component
import Homepage from './pages/homepage';

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Navbar will be used across all pages */}
      <Homepage />
    </div>
  );
}

export default App;
