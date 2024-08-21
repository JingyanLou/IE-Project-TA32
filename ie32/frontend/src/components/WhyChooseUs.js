import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    return (
        <div className="why-choose-us-container">
            <div className="why-choose-us-section">
                <div className="info-section">
                    <div className="content">
                        <div className="tech-item">
                            <h2>AI-Driven Object Detection</h2>
                            <p>Utilizes the YOLO (You Only Look Once) algorithm for real-time, high-precision detection of appliances in your home photos.</p>
                        </div>
                        <div className="tech-item">
                            <h2>Data driven Estimator</h2>
                            <p>Advanced machine learning to estimate the energy consumption of each detected device.</p>
                        </div>
                        <div className="tech-item">
                            <h2>AWS Cloud</h2>
                            <p>Provides instant analysis of your images, delivering actionable insights and recommendations without any delay.</p>
                        </div>
                        <div className="tech-item">
                            <h2>Continuous Improvement</h2>
                            <p>Our system continuously learns and improves, enhancing the accuracy and relevance of energy-saving suggestions over time.</p>
                        </div>
                    </div>
                </div>
                <div className="legend-section">
                    <div className="legend-text">
                        <div>Why</div>
                        <div>Choose</div>
                        <div>Us?</div>
                    </div>
                    <img src="images/toprightcorner.png" alt="Background Decoration" className="background-image" />
                </div>
            </div>
        </div>
    );
}

export default WhyChooseUs;
