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
        navigate('/compare');
    };

    return (
        <div className="section-saving-tips" ref={sectionRef}>
            <div className="image-saving-tips"></div>
            <div className="info-saving-tips">
                <div className="content">

                    <h1>Uncover Energy-Saving Secrets and Transform Your Home </h1>
                    <div className="stats">
                        <div className="stat-item">
                            <h2>Cut Annual Energy</h2>
                            <p>30% Lower</p>
                        </div>
                        <div className="stat-item">
                            <h2>Reduce Consumption</h2>
                            <p>20% Lower</p>
                        </div>
                    </div>
                    <p className="description">Using our interactive 3D storytelling, learn how small changes can make a big difference in your energy consumption. Our tips are designed to help you reduce energy usage, lower your bills, and contribute to a greener planet</p>
                    <button className="discover-button" onClick={handleDiscoverClick}>Discover</button>
                </div>
            </div>
        </div>
    );
};

export default SavingTips;
