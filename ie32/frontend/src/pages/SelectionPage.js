import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';
import './selectionpage.css';
import { useNavigate } from 'react-router-dom';

const SelectionPage = () => {
    const navigate = useNavigate();

    const handleExplore = (route) => {
        if (route === '/recommendations') {
            navigate(route);
        } else if (route === '/governmentinfo') {
            navigate(route);
        } else if (route === '/buynew') {
            navigate(route);
        } else {
            // Disable navigation for other buttons
            console.log('This feature is not available yet');
        }
    };
    return (
        <div className="selection-page">
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

            <div className="header-container">
                <h1 className="page-title">Find Out Energy-Efficient and Sustainable Solutions</h1>
                <p>Learn practical tips to optimise your current appliances, explore options for upgrading to energy-saving models, and find out how government programs can support your journey toward a greener and more efficient home.
                </p>
            </div>


            <div className="content-container">
                <div className="card-grid">


                    <div className="card">
                        <div className="face face1">
                            <div className="content">
                                <img src="/images/roomtour.png" alt="Room Tour" className="icon" />
                                <h3>Implement Energy-Saving Tips</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Learn practical ways to enhance the efficiency of your existing appliances.</p>
                                <button onClick={() => handleExplore('/recommendations')}>Explore More</button>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="face face1">
                            <div className="content">
                                <img src="/images/goverment.png" alt="Government Programs" className="icon" />
                                <h3>Leverage Government Support</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Find out about programs and incentives that can help you achieve a greener and more efficient home.</p>
                                <button onClick={() => handleExplore('/governmentinfo')}>Explore More</button>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="face face1">
                            <div className="content">
                                <img src="/images/newappliances.png" alt="New Appliances" className="icon" />
                                <h3>Upgrade to Energy-Saving Models</h3>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p>Explore options for replacing outdated appliances with star-rated, energy-efficient devices.</p>
                                <button onClick={() => handleExplore('/buynew')}>Explore More</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SelectionPage;