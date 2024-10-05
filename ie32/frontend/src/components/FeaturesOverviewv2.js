import React from 'react';
import './featuresoverviewv2.css';

const FeaturesOverviewv2 = () => {
    const features = [
        {
            icon: 'calculator.png',
            tag: 'Identify',
            title: "Identify Your Home's Energy Consumption",
            description: "Upload details about your appliances to identify which ones drive up your energy bill. Receive a personalised estimate for your household, compare your usage with benchmarks, and see how it measures up against neighbouring homes."
        },
        {
            icon: 'teach.png',
            tag: 'Educate',
            title: "Discover appliance saving tips",
            description: "Explore your home in an interactive 3D room tour and discover how each appliance contributes to your overall energy consumption. Learn ways to reduce usage through practical tips."
        },
        {
            icon: 'insight.png',
            tag: 'Educate',
            title: "Discover historical Insights",
            description: "Replace outdated, inefficient appliances with energy-efficient models. Our guide helps you find the best replacements, reducing your energy consumption while improving performance."
        }
    ];

    return (
        <div className="features-overview">
            <h1 className="main-title">Guide to Energy Efficient Household</h1>
            <div className="cards-container">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="icon-container">
                            <img src={`/images/${feature.icon}`} alt={feature.title} className="feature-icon" />
                        </div>
                        <span className="feature-tag">{feature.tag}</span>
                        <h2 className="feature-title">{feature.title}</h2>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesOverviewv2;