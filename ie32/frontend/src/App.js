import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/homepage';
import Upload from './pages/uploadpage';
import RecommendationsPage from './pages/RecommendationsPage';
import EstimationIntroductionPage from './pages/EstimationIntroductionPage';
import SelectionPage from './pages/SelectionPage';
import GovernmentInfo from './pages/GovernmentInfo';
import BuyNew from './pages/BuyNew';
import Insight from './pages/insightpage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/estimation-introduction" element={<EstimationIntroductionPage />} />
          <Route path="/selection" element={<SelectionPage />} />
          <Route path="/governmentinfo" element={<GovernmentInfo />} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/buynew" element={<BuyNew />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;