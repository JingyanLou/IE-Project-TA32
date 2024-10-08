import React, { useEffect, useRef, useState } from 'react';
import './governmentinfo.css';
import { useNavigate } from 'react-router-dom'; // Add this correct import

const Section = ({ title, description, imageSrc, reverse, link }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handleExploreClick = () => {
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            ref={sectionRef}
            className={`gov-info-section ${reverse ? 'gov-info-reverse' : ''} ${isVisible ? 'fade-in' : ''}`}
        >
            <div className="gov-info-content">
                <h2>{title}</h2>
                <p>{description}</p>
                <button className="gov-info-button" onClick={handleExploreClick}>Explore Now</button>
            </div>
            <div className="gov-info-image-container">
                <img src={`/images/${imageSrc}`} alt={title} />
            </div>
        </div>
    );
};

const GovernmentInfo = () => {

    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate('/selection'); // Adjust this path as needed
    };

    return (
        <div className="government-info-wrapper">

            <div className="government-info-page">
                <button className="nav-link-button-recom" onClick={handleBackToDashboard}>
                    Back
                </button>
                <header className="gov-info-header fade-in">
                    <h1>Government Program</h1>
                    <p>Explore more to understand your electricity benefits living in Melbourne</p>
                </header>
                <main>
                    <Section
                        title="Government Energy Bill Relief Fund"
                        description="Learn about the support available to help manage your energy costs."
                        imageSrc="family.jpg"
                        link="https://www.revenue.act.gov.au/community-assistance/energy-bill-relief-fund"
                    />
                    <Section
                        title="Victorian Energy Upgrade for Home"
                        description="Discover how you can improve your home's energy efficiency."
                        imageSrc="homeupgrade.jpg"
                        reverse
                        link="https://www.energy.vic.gov.au/victorian-energy-upgrades/homes"
                    />
                    <Section
                        title="Victorian Solar Panel Rebate"
                        description="Find out how you can save on solar panel installation."
                        imageSrc="solar.jpg"
                        link="https://www.solar.vic.gov.au/solar-panel-rebate"
                    />
                    <Section
                        title="Annual Electricity Concession"
                        description="Discover how you can improve your home's energy efficiency."
                        imageSrc="support.jpg"
                        reverse
                        link="https://services.dffh.vic.gov.au/annual-electricity-concession"
                    />
                </main>
                <footer className="gov-info-footer fade-in">
                    <p>More is coming...</p>
                </footer>
            </div>
        </div>
    );
};

export default GovernmentInfo;