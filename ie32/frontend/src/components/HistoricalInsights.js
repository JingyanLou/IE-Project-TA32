import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './historicalinsights.css';

const HistoricalInsights = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentSectionRef = sectionRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal');
                        console.log('Historical Insights section is visible');
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

    const handleLearnMoreClick = () => {
        navigate('/insight');
    };

    return (
        <div className="section-historical-insights" ref={sectionRef}>
            <div className="image-historical-insights"></div>
            <div className="info-historical-insights">
                <div className="content">
                    <h1>Discover Energy Trends and Insights</h1>
                    <div className="stats">
                        <div className="stat-item">
                            <h2>Analyze Past Usage</h2>
                            <p>Up to 5 Years of Data</p>
                        </div>
                        <div className="stat-item">
                            <h2>Identify Consumption Patterns</h2>
                            <p>15% Potential Savings</p>
                        </div>
                    </div>
                    <p className="description">Explore electricity consumption patterns, seasonal trends, and carbon emissions data to understand your energy usage better. Gain valuable insights into how these factors impact your bills and the environment, empowering you to make informed decisions for a more sustainable future..</p>
                    <button className="learn-more-button" onClick={handleLearnMoreClick}>
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoricalInsights;