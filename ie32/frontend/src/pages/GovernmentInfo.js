import React, { useEffect, useRef, useState } from 'react';
import './governmentinfo.css';

const Section = ({ title, description, imageSrc, reverse }) => {
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

    return (
        <div
            ref={sectionRef}
            className={`gov-info-section ${reverse ? 'gov-info-reverse' : ''} ${isVisible ? 'fade-in' : ''}`}
        >
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
                <header className="gov-info-header fade-in">
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
                <footer className="gov-info-footer fade-in">
                    <p>More is coming...</p>
                </footer>
            </div>
        </div>
    );
};

export default GovernmentInfo;