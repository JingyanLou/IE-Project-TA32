import React, { useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './recommendationpage.css';

function Model({ url, cameraPosition }) {
    const { nodes } = useGLTF(url);
    const { camera } = useThree();

    // Use the frame hook to adjust the camera position smoothly
    useFrame(() => {
        camera.position.lerp(cameraPosition, 0.1);
    });

    return (
        <group>
            {Object.keys(nodes).map((key) => (
                <mesh key={key} geometry={nodes[key].geometry} material={nodes[key].material} />
            ))}
        </group>
    );
}

export default function RecommendationsPage() {
    const [scrollProgress, setScrollProgress] = useState(0); // Use this to track progress through sections

    const cameraPositions = [
        { x: 0.2, y: 1, z: 1 },   // Living Room Overview camera position
        { x: 0, y: 0, z: 0.1 }, //tv position
        { x: -0.1, y: 0, z: 0.1 }, //fridge position

    ];

    // Capture scroll interactions
    const handleScroll = (event) => {
        const scroll = event.deltaY; // Scroll direction and intensity
        setScrollProgress((prev) => Math.min(Math.max(prev + scroll * 0.001, 0), 1)); // Clamping scrollProgress between 0 and 1
    };

    useEffect(() => {
        // Add wheel listener to capture scroll events
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    const currentCameraPosition = cameraPositions[Math.floor(scrollProgress * (cameraPositions.length - 1))]; // Pick camera position based on progress

    return (
        <div className="recommendations-page">
            <Canvas className="canvas">
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Model url="/3dmodel.glb" cameraPosition={currentCameraPosition} />
                <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
            </Canvas>

            {/* First Text Section - Reveals at the start */}
            <section className={`text-section ${scrollProgress < 0.25 ? 'visible' : ''}`}>
                <h1>1. Living Room Overview:</h1>
                <p>Welcome to your energy-efficient living room! </p>
                <p>Every corner of this space is packed with potential savings.</p>
            </section>

            {/* Second Text Section - Reveals when scrolling further */}
            <section className={`text-section ${scrollProgress >= 0.25 && scrollProgress <= 0.9 ? 'visible' : ''} right`}>
                <h1>2. Television:</h1>
                <p>Did you know that your TV can be an energy hog?</p>
            </section>

            {/* Third Text Section - Reveals when scrolling even further */}
            <section className={`text-section ${scrollProgress >= 0.9 ? 'visible' : ''} mid`}>
                <h1>3. Fridge:</h1>
                <p>Fridges can be one of the biggest energy consumers in your home. Ensure that it's energy-efficient and consider upgrading to a more efficient model to save on electricity costs.</p>
            </section>



        </div>
    );
}
