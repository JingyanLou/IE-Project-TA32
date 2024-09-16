import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './savingtips.css';

const SavingTips = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentSectionRef = sectionRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal');
                        console.log('Saving Tips section is visible');
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

    const handleDiscoverClick = () => {
        navigate('/selection');
    };

    return (
        <div className="section-saving-tips" ref={sectionRef}>
            <div className="image-saving-tips"></div>
            <div className="info-saving-tips">
                <div className="content">
                    <h1>Uncover Energy-Saving Secrets and Transform Your Home</h1>
                    <div className="stats">

                        <div className="stat-item">
                            <h2>Access Government Rebates</h2>
                            <p>Up to $500 Savings</p>
                        </div>
                        <div className="stat-item">
                            <h2>Upgrade to Energy-Efficient Appliances</h2>
                            <p>20% Lower Energy Bills</p>
                        </div>

                    </div>
                    <p className="description">Learn how to optimise your current appliances for better efficiency and sustainability. Find out how replacing outdated, inefficient models with star-rated devices, along with leveraging government support, can reduce your consumption and lower your carbon footprint.</p>
                    <button className="discover-button" onClick={handleDiscoverClick}>
                        Discover Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SavingTips;