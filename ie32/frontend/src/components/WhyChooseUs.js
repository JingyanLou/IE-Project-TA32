import React, { useEffect, useRef } from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-whychooseus');
                        console.log('Why Choose Us section is visible'); // For debugging
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
        <div className="why-choose-us-container-custom" ref={sectionRef}>
            <div className="why-choose-us-section-custom">
                <div className="info-section-custom">
                    <div className="content-custom">
                        <div className="tech-item-custom">
                            <h2>AI-Driven Object Detection</h2>
                            <p>Utilizes the YOLO (You Only Look Once) algorithm for real-time, high-precision detection of appliances in your home photos.</p>
                        </div>
                        <div className="tech-item-custom">
                            <h2>Data driven Estimator</h2>
                            <p>Advanced machine learning to estimate the energy consumption of each detected device.</p>
                        </div>
                        <div className="tech-item-custom">
                            <h2>AWS Cloud</h2>
                            <p>Provides instant analysis of your images, delivering actionable insights and recommendations without any delay.</p>
                        </div>
                        <div className="tech-item-custom">
                            <h2>Continuous Improvement</h2>
                            <p>Our system continuously learns and improves, enhancing the accuracy and relevance of energy-saving suggestions over time.</p>
                        </div>
                    </div>
                </div>
                <div className="legend-section-custom">
                    <div className="legend-text-custom">
                        <div>Why</div>
                        <div>Choose</div>
                        <div>Us?</div>
                    </div>
                    <img src="images/toprightcorner.png" alt="Background Decoration" className="background-image-custom" />
                </div>
            </div>
        </div>
    );
}

export default WhyChooseUs;
