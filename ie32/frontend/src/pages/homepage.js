import React from 'react';
import './homepage.css';
import Estimation from '../components/Estimation';
import WhyChooseUs from '../components/WhyChooseUs';

const Homepage = () => {
    return (
        <div className="homepage">
            <nav className="navbar">
                <ul className="brand">
                    <li><a href="/">Bytebusters</a></li>
                </ul>
                <ul className="nav-items">
                    <li><a href="/energy-analysis">Energy Analysis</a></li>
                    <li><a href="/insights">Insights</a></li>
                    <li><a href="/cost-saving">Cost-saving</a></li>
                </ul>
            </nav>
            <div className="hero">
                <h1>Empower your energy savings today.</h1>
                <p>Take control of your energy consumption with personalized insights, cost-saving tools, and tailored solutions. Make every watt count towards a greener, more affordable future.</p>
                <div className="arrow-down">
                    <span>&#9662;</span>
                </div>
            </div>

            <Estimation />
            <WhyChooseUs />

        </div>
    );
}

export default Homepage;
