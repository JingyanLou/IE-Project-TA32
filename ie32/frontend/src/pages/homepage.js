import React from 'react';
import './homepage.css';

import Estimation from '../components/Estimation';
import WhyChooseUs from '../components/WhyChooseUs';

const Homepage = () => {
    const scrollToEstimation = () => {
        const estimationSection = document.getElementById('estimation-section');
        if (estimationSection) {
            estimationSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="homepage">

            <div className="hero">
                <h1>Redefining Your Energy Efficiency.</h1>
                <p>Our site offers Melbourne residents insights into high-energy-consuming appliances, provides affordable energy-saving strategies, and connects you with government subsidies for renewable energy. Navigate your way to lower bills and sustainable living with our comprehensive tools.</p>
                <div className="arrow-down-container" onClick={scrollToEstimation}>
                    <div className="scroll-down-text">Scroll Down</div>
                    <div className="arrow-down">
                        <span>&#9662;</span>
                    </div>
                </div>

            </div>

            <div id="estimation-section">
                <Estimation />
            </div>

            <div id="why-choose-us-section">
                <WhyChooseUs />
            </div>


        </div>
    );
}

export default Homepage;
