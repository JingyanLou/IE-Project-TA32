import React from 'react';
import './featuresoverviewv2.css';

const FeaturesOverviewv2 = () => {
    const features = [
        {
            icon: 'calculator.png',
            tag: 'Identify',
            title: "Identify Energy Consumption in more detailed way and explain from appliances perspective",
            description: "Upload details about your appliances to identify which ones drive up your energy bill. Receive a personalised estimate for your household, compare your usage with benchmarks, and see how it measures up against neighbouring homes.",
            scrollTo: "estimation-section"
        },
        {
            icon: 'teach.png',
            tag: 'Educate',
            title: "Discover appliance energy saving tips and enhance your energy literacy",
            description: "Explore your home in an interactive 3D room tour and discover how each appliance contributes to your overall energy consumption. Learn ways to reduce usage through practical tips.Information about government programs.",
            scrollTo: "saving-tips"
        },
        {
            icon: 'insight.png',
            tag: 'Educate',
            title: "Victorian Energy Consumption Historical Insights for the 17 years and future predictions",
            description: "Explore electricity consumption patterns, seasonal trends, and carbon emissions data to understand your energy usage better. Gain valuable insights into how these factors impact your bills and the environment",
            scrollTo: "hisorical-scrollto"
        }
    ];

    const handleCardClick = (scrollTo) => {
        const element = document.getElementById(scrollTo);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div className="features-overview">
            <div className="background-images">
                <img src="/images/decolight.png" alt="Decorative Light 1" className="deco-light light-1" />
                <img src="/images/decolight.png" alt="Decorative Light 2" className="deco-light light-2" />
                <img src="/images/decolight.png" alt="Decorative Light 3" className="deco-light light-3" />
                <img src="/images/decolight.png" alt="Decorative Light 4" className="deco-light light-4" />
            </div>
            <h1 className="main-title">Our Solutions</h1>
            <div className="cards-container">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card" onClick={() => handleCardClick(feature.scrollTo)} >
                        <div className="icon-container">
                            <img src={`/images/${feature.icon}`} alt={feature.title} className="feature-icon" />
                        </div>
                        <span className="feature-tag">{feature.tag}</span>
                        <h2 className="feature-title">{feature.title}</h2>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default FeaturesOverviewv2;