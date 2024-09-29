import React from 'react';
import './homepage.css';
import Estimation from '../components/Estimation';
import WhyChooseUs from '../components/WhyChooseUs';
import Savingtips from '../components/Savingtips';
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient';
import * as fiber from '@react-three/fiber';
import * as drei from '@react-three/drei';
import MissionSection from '../components/MissionSection';
import HorizontalScroll from '../components/HorizontalScroll';
import TextRevealSection from '../components/TextRevealSection';
import FeaturesOverview from '../components/FeaturesOverview';

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="hero">
                <ShaderGradientCanvas
                    importedFiber={{ ...fiber, ...drei }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                    }}
                >
                    <ShaderGradient
                        control="query"
                        urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.7&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23cb19df&color2=%236f0b7a&color3=%237c00e4&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false"
                    />
                </ShaderGradientCanvas>
                <div className="hero-content">
                    <h1>Make your Energy Visible and Sustainable.</h1>
                    <p>Our goal is to make Melbourne one of the world's most sustainable cities by empowering residents to control their energy costs and reduce consumption. We're committed to driving energy efficiency and sustainability for a greener future.</p>
                </div>
            </div>

            <MissionSection />

            <HorizontalScroll />

            <TextRevealSection />

            <FeaturesOverview />


            <div id="estimation-section">
                <Estimation />
            </div>

            <div id="saving-tips">
                <Savingtips />
            </div>

            <div id="why-choose-us-section">
                <WhyChooseUs />
            </div>
        </div>
    );
}

export default Homepage;