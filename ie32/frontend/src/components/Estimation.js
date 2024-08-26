import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import './Estimation.css';

const Estimation = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate(); // useNavigate for navigation

    useEffect(() => {
        const currentSectionRef = sectionRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal');
                        console.log('Estimation section is visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
        };
    }, []);

    const handleStartClick = () => {
        navigate('/upload'); // Use navigate to go to the upload page
    };

    return (
        <div className="section-two" ref={sectionRef}>
            <div className="image-section"></div>
            <div className="info-section">
                <div className="content">
                    <h1>Analyse Your Home's Energy Consumption</h1>
                    <div className="stats">
                        <div className="stat-item">
                            <h2>Average Home Consumption</h2>
                            <p>3000Kwh/M</p>
                        </div>
                        <div className="stat-item">
                            <h2>Average Bill Cost</h2>
                            <p>$542.27/M</p>
                        </div>
                    </div>
                    <p className="description">Upload details about your appliances to identify which ones drive up your energy bill. Recieve a personalised estimate for your household, compare your usage with benchmarks, and see how it measures up against neighbouring homes..</p>
                    <button className="start-button" onClick={handleStartClick}>Analyse Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Estimation;
