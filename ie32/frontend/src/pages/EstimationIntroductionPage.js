import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';
import './estimationIntroductionPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const EstimationIntroductionPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleProceed = () => {
        // Navigate to the Upload page
        navigate('/upload');
    };

    const handleBack = () => {
        // Navigate to the Homepage
        navigate('/');
    };

    return (
        <div className="estimation-intro-page">
            <ShaderGradientCanvas
                importedFiber={{ ...fiber, ...drei, ...reactSpring }}
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

            {/* Page Title and Guide Description */}
            <div className="header-container">
                <h1 className="page-title">EnergiseSmart: Your Estimation Guide</h1>
                <p className="page-description">
                    This guide will walk you through the steps to estimate your monthly electricity bill, track appliance consumption, and provide suggestions to reduce your energy usage. Follow the steps below to get started.
                </p>
            </div>

            {/* Page content */}
            <div className="content-container">
                <div className="card-grid">
                    <div className="card">
                        <div className="face face1">
                            <div className="content">
                                <img src="/images/fill-in.png" alt="Card 1 Icon" className="icon" />
                                <h3>Step 1: Enter Appliances</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Fill in the details for each appliance, including its default daily hours and quantity. You can adjust the daily hours as needed. Once added, the appliance will appear in your list.</p>
                                <a href="#" type="button">Read More</a>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="face face1">
                            <div className="content">
                                <img src="/images/ranking.png" alt="Card 2 Icon" className="icon" />
                                <h3>Step 2: Appliance Ranking</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>We will rank your entered appliances based on their energy consumption using average values. This will help you identify the most energy-consuming appliances in your home.</p>
                                <a href="#" type="button">Read More</a>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="face face1">
                            <div className="content">
                                <img src="/images/address.png" alt="Card 3 Icon" className="icon" />
                                <h3>Step 3: Home Information</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Provide your home address (Melbourne CBD only), energy provider, and the number of people in your home. This information will be combined with your appliance data for further analysis.</p>
                                <a href="#" type="button">Read More</a>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="face face1">
                            <div className="content">
                                <img src="/images/report.png" alt="Card 4 Icon" className="icon" />
                                <h3>Step 4: Energy Estimation</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Estimate your monthly electricity bill, compare it to government benchmarks, and view a block-level map showing energy consumption. See how much each appliance contributes and get suggestions for new, energy-efficient replacements.</p>
                                <a href="#" type="button">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="button-container">
                    <button className="back-button" onClick={handleBack}>
                        Back
                    </button>
                    <button className="proceed-button" onClick={handleProceed}>
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EstimationIntroductionPage;
