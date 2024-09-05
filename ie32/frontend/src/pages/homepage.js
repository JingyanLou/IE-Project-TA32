import React, { useEffect, useRef } from 'react';
import './homepage.css';
import Estimation from '../components/Estimation';
import WhyChooseUs from '../components/WhyChooseUs';
import * as THREE from 'three'; // Import THREE.js
import HALO from 'vanta/dist/vanta.halo.min'; // Import Vanta.js HALO effect

import Savingtips from '../components/Savingtips';


const Homepage = () => {
    const vantaRef = useRef(null);

    useEffect(() => {
        let vantaEffect;

        try {
            vantaEffect = HALO({
                el: vantaRef.current,
                THREE: THREE,  // Explicitly pass the THREE object here
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                baseColor: 0x340059, // Base color for the halo effect
                amplitudeFactor: 0.80, // Amplitude factor for the wave effect
                xOffset: 0.08, // Horizontal offset
                yOffset: 0.18, // Vertical offset
                size: 0.6, // Size of the halo effect
            });
        } catch (error) {
            console.error('[VANTA] Init error', error);
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    const scrollToEstimation = () => {
        const estimationSection = document.getElementById('estimation-section');
        if (estimationSection) {
            estimationSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="homepage">
            <div ref={vantaRef} className="hero">
                <h1>Improving Your Energy Efficiency.</h1>
                <p>Our site offers Melbourne residents insights into high-energy-consuming appliances, provides affordable energy-saving strategies, and connects you with government subsidies for renewable energy. Navigate your way to lower bills and sustainable living with our comprehensive tools.</p>
                <div className="arrow-down-container" onClick={scrollToEstimation}>
                    <div className="scroll-down-text">Scroll Down</div>
                    <div className="arrow-down">
                        <span>&#9662;</span>
                    </div>
                </div>
            </div>

            <div id="estimation-section">
                <Estimation />
            </div>

            <div id="why-choose-us-section">
                <WhyChooseUs />
            </div>

            <div id="saving-tips">
                <Savingtips />
            </div>

        </div>
    );
}

export default Homepage;
