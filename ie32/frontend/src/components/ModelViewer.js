import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './modelviewer.css'; // Importing the CSS for styling

function Model({ url }) {
    const { nodes } = useGLTF(url);
    return (
        <group>
            {Object.keys(nodes).map((key) => (
                <mesh
                    key={key}
                    geometry={nodes[key].geometry}
                    material={nodes[key].material}
                />
            ))}
        </group>
    );
}


function ZoomAndRotateControls({ clickState }) {
    const { camera } = useThree();
    const controlsRef = useRef();

    // Use a ref to store the last logged position
    const lastPosition = useRef({ x: null, y: null, z: null });



    // Original positions
    const positions = [
        { x: 0.1, y: 0.3, z: 0.8 },  // First position: Low and close-up
        { x: -0.4, y: -0.3, z: -0.8 }, // Second position: 180 degrees from the first position
        { x: -1, y: 1, z: 1 }  // Third position: Another perspective
    ];

    useFrame(() => {
        if (controlsRef.current) {
            // Lerp to the position based on the current clickState
            camera.position.lerp(positions[clickState], 0.1);
            controlsRef.current.update();


            // Check if the camera position has changed
            const { x, y, z } = camera.position;
            if (x !== lastPosition.current.x || y !== lastPosition.current.y || z !== lastPosition.current.z) {
                // Log the position if it's different from the last logged position
                console.log(`Camera position: x=${x}, y=${y}, z=${z}`);
                lastPosition.current = { x, y, z };  // Update the last logged position
            }


        }
    });

    return <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} enableRotate={true} />;
}

export default function ModelViewer() {
    const [clickState, setClickState] = useState(0);

    const handleClick = () => {
        // Cycle through 0 -> 1 -> 2 -> 0 on clicks
        setClickState((prevState) => (prevState + 1) % 3);
    };

    return (
        <div className="model-viewer-container" onClick={handleClick}>
            <Canvas className="canvas">
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Model url="/3dmodel.glb" />
                <ZoomAndRotateControls clickState={clickState} />
            </Canvas>
        </div>
    );
}
