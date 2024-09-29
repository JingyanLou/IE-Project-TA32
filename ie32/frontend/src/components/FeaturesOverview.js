import React from 'react';
import './featuresoverview.css';

const FeatureCard = ({ icon, tag, title, description }) => (
    <div className="feature-card">
        <div className="icon-container">
            <img src={`/images/${icon}`} alt={title} className="feature-icon" />
        </div>
        <span className="feature-tag">{tag}</span>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
    </div>
);

const FeaturesOverview = () => {
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
            icon: 'governmentmoney.png',
            tag: 'Educate',
            title: "Discover government programs",
            description: "Access a range of government programs designed to help you save energy and reduce costs. From rebates to energy-efficiency grants, find out what's available to support your journey."
        },
        {
            icon: 'replacenew.png',
            tag: 'Educate',
            title: "Replace your appliance to enhance energy savings",
            description: "Replace outdated, inefficient appliances with energy-efficient models. Our guides help you find the best replacements, reducing your energy consumption while improving performance."
        },
        {
            icon: 'insight.png',
            tag: 'Educate',
            title: "Discover historical Insights",
            description: "Review historical, in-depth appliance and energy efficiency trends for your home. These insights help you find the best improvements to further reduce your energy consumption while improving performance."
        }
    ];

    return (
        <section className="features-overview">
            <div className="content-wrapper">
                <div className="brand-content">
                    <h1 className="brand-title">Energise Smart</h1>
                    <div className="brand-description">
                        <p>At EnergiseSmart, our dedicated team and partners are committed to providing user-centric, customized solutions to tackle Melbourne's energy crisis. We deliver innovative strategies tailored to your unique energy needs, while implementing standardized processes across your home or business.</p>
                        <p>Our approach ensures consistent, high-quality outcomes, setting a new standard for energy efficiency and sustainability management in Melbourne, helping to reduce energy consumption and costs for a more sustainable future.</p>
                    </div>
                </div>
                <div className="feature-cards">
                    <div className="empty-space"></div>
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesOverview;