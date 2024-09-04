import React from 'react';
import './recommendationpage.css';
import ModelViewer from '../components/ModelViewer';

const RecommendationsPage = () => {
    return (
        <div className="recommendations-page">
            <header className="recommendations-header">
                <h1>Energy-Saving Recommendations</h1>
            </header>

            <section className="model-viewer-section">
                <ModelViewer />
            </section>

            <section className="recommendations-content">
                <p>Discover expert recommendations for optimizing your energy use and finding more efficient appliances.</p>
                <ul>
                    <li>Replace old appliances with energy-efficient models.</li>
                    <li>Use smart devices to monitor and control your energy consumption.</li>
                    <li>Explore renewable energy sources like solar power.</li>
                    <li>Adopt energy-saving habits like turning off unused electronics.</li>
                </ul>
            </section>
        </div>
    );
};

export default RecommendationsPage;
