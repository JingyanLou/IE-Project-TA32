import React from 'react';
import './homepage.css';
import Estimation from '../components/Estimation';
import WhyChooseUs from '../components/WhyChooseUs';
import Savingtips from '../components/Savingtips';
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient';
import * as fiber from '@react-three/fiber';
import * as drei from '@react-three/drei';

const Homepage = () => {
    const scrollToEstimation = () => {
        const estimationSection = document.getElementById('estimation-section');
        if (estimationSection) {
            estimationSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="homepage">
            <div className="hero">
                <ShaderGradientCanvas
                    importedFiber={{ ...fiber, ...drei }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        pointerEvents: 'none',
                    }}
                >
                    <ShaderGradient
                        control="query"
                        urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.7&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23cb19df&color2=%236f0b7a&color3=%237c00e4&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false"
                    />
                </ShaderGradientCanvas>
                <div className="hero-content">
                    <h1>Improving Your Energy Efficiency.</h1>
                    <p>Our site offers Melbourne residents insights into high-energy-consuming appliances, provides affordable energy-saving strategies, and connects you with government subsidies for renewable energy. Navigate your way to lower bills and sustainable living with our comprehensive tools.</p>
                    <div className="arrow-down-container" onClick={scrollToEstimation}>
                        <div className="scroll-down-text">Scroll Down</div>
                        <div className="arrow-down">
                            <span>&#9662;</span>
                        </div>
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