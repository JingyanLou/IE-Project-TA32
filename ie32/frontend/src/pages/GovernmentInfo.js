import React from 'react';
import './governmentinfo.css';

const Section = ({ title, description, imageSrc, reverse }) => {
    return (
        <div className={`gov-info-section ${reverse ? 'gov-info-reverse' : ''}`}>
            <div className="gov-info-content">
                <h2>{title}</h2>
                <p>{description}</p>
                <button className="gov-info-button">Explore Now</button>
            </div>
            <div className="gov-info-image-container">
                <img src={`/images/${imageSrc}`} alt={title} />
            </div>
        </div>
    );
};

const GovernmentInfo = () => {
    return (
        <div className="government-info-wrapper">
            <div className="government-info-page">
                <header className="gov-info-header">
                    <h1>Government Program</h1>
                    <p>Explore more to understand your electricity benefits living in Melbourne</p>
                </header>
                <main>
                    <Section
                        title="Government Energy Bill Relief Fund"
                        description="Learn about the support available to help manage your energy costs."
                        imageSrc="family.jpg"
                    />
                    <Section
                        title="Victorian Energy Upgrade for Home"
                        description="Discover how you can improve your home's energy efficiency."
                        imageSrc="homeupgrade.jpg"
                        reverse
                    />
                    <Section
                        title="Victorian Solar Panel Rebate"
                        description="Find out how you can save on solar panel installation."
                        imageSrc="solar.jpg"
                    />
                </main>
                <footer className="gov-info-footer">
                    <p>More is coming...</p>
                </footer>
            </div>
        </div>
    );
};

export default GovernmentInfo;