import React, { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './recommendationpage.css';

const rooms = {
    livingRoom: "/livingroom.glb",
    bedroom: "/bedroom.glb",
    bathroom: "/bathroom.glb",
    kitchen: "/kitchen.glb",
    studyroom: "/studyroom.glb",
    garden: "/garden.glb"
};

const modelPositionInitial = [0, -0.4, 0]; // Initial position for the model.
const initialCameraPosition = { x: 0.2, y: 1, z: 1.9 }; // Initial camera position.

function Model({ url }) {
    const { nodes } = useGLTF(url);
    return (
        <group position={modelPositionInitial}>
            {Object.keys(nodes).map((key) => (
                <mesh key={key} geometry={nodes[key].geometry} material={nodes[key].material} />
            ))}
        </group>
    );
}

function CameraController({ cameraPosition }) {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.updateProjectionMatrix();
    }, [cameraPosition]);

    return null;
}

export default function RecommendationsPage() {
    const [selectedRoom, setSelectedRoom] = useState(rooms.livingRoom); // Default to the living room
    const [cameraPosition, setCameraPosition] = useState(initialCameraPosition); // Set the initial camera position

    const handleRoomSelection = (room) => {
        setSelectedRoom(rooms[room]);
        setCameraPosition(initialCameraPosition); // Reset the camera to the initial position when a room is selected
    };

    return (
        <div className="recommendations-page">
            {/* Text Section */}
            <section className="text-section">
                <h1>Energy-Saving Tips for Every Room in Your Home</h1>
                <p>Navigate through your home, zoom into appliances, and learn quick and easy tips to reduce energy consumption.</p>
                <p>Start Exploring Rooms</p>
            </section>

            {/* Room Selection Buttons */}
            <div className="room-buttons">
                {Object.keys(rooms).map((room) => (
                    <button
                        key={room}
                        className={`room-button ${selectedRoom === rooms[room] ? 'selected' : ''}`}
                        onClick={() => handleRoomSelection(room)}
                    >
                        {room.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                ))}
            </div>

            {/* 3D Model Viewer */}
            <div className="model-view">
                <Canvas className="canvas">
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Model url={selectedRoom} />
                    <CameraController cameraPosition={cameraPosition} />
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                </Canvas>
            </div>
        </div>
    );
}
