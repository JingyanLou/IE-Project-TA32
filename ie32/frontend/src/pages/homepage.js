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
                <h1>Empower your energy savings today.</h1>
                <p>Take control of your energy consumption with personalized insights, cost-saving tools, and tailored solutions. Make every watt count towards a greener, more affordable future.</p>
                <div className="arrow-down" onClick={scrollToEstimation}>
                    <span>&#9662;</span>
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
