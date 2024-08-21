import React, { useEffect, useRef } from 'react';
import './Estimation.css';

const Estimation = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal');
                        console.log('Estimation section is visible');  // This confirms the section is being revealed
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the section is visible
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
        <div className="section-two" ref={sectionRef}>
            <div className="image-section"></div>
            <div className="info-section">
                <div className="content">
                    <h1>Identify Your Home’s Energy Consumption</h1>
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
                    <p className="description">Upload images of your home to discover which appliances are driving up your energy bills. Our advanced image detection tool will analyze your energy consumption and provide tailored tips to help you save.</p>
                    <button className="start-button">Start Now</button>
                </div>
            </div>
        </div>
    );
}

export default Estimation;
