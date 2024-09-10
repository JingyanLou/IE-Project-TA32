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
                <h1 className="page-title">Estimation User Guide</h1>

                <p className="page-description">
                    Welcome! If this is your first time using our website, we recommend reading this guide for a smoother experience with our estimator. Steps 1 through 3 involve simple data collection, with no personal information required. In Step 4, we'll use this data to generate a customized estimate for you.
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
                                <p>&#8226; Provide your appliance details.</p>
                                <p>&#8226; Adjust the daily hours usage of your appliance if require.</p>

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
                                <p>&#8226; Appliance will be ranked in descending order based on their energy consumption.</p>

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
                                <p>&#8226; Provide your home address.</p>
                                <p>&#8226; Melbourne CBD only.</p>
                                <p>&#8226; Provide your energy provider.</p>
                                <p>&#8226; Provide no. of people living in your household.</p>


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
                                <p>&#8226; Select "Estimate" button </p>
                                <p>&#8226; Your customised estimated electricity bills and energy consumption will be ready  </p>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="button-container">
                    <button className="back-button" onClick={handleBack}>
                        Back
                    </button>
                    <button className="proceed-button" onClick={handleProceed}>
                        Let's go
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EstimationIntroductionPage;
