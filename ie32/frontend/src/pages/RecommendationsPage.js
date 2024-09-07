import React, { useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import './recommendationpage.css';

const initialCameraPosition = { x: 0.2, y: 1, z: 1.9 };
const kitchenCameraPosition = { x: 0.2, y: 1.1, z: 1.9 };
const studyroomCameraPosition = { x: 0.2, y: 1, z: 2.3 };
const bedroomCameraPosition = { x: 0.2, y: 1, z: 3 };

const rooms = {
    livingRoom: {
        model: "/livingroom.glb",
        cameraPositions: [
            initialCameraPosition, // Landing page position
            { x: -0.1, y: 1, z: 1 },    // 1st 
            { x: 0, y: 0, z: 0.1 },    // 2nd 
            { x: -0.1, y: 0, z: 0.1 }, // 3rd 
        ],
        modelPositions: [
            [0, -0.2, 0],  // Initial position
            [0, 0, 0],  // Move model slightly for 1st view
            [0, 0, 0],  // Different position for 2nd view
            [0, 0, 0],  // Different position for 3rd view
        ],
        texts: [
            { title: "Living Room", content: "Explore energy-saving tips for your living room." },
            { title: "Living Room Overview", content: "Welcome to your energy-efficient living room! Every corner of this space is packed with potential savings." },
            { title: "Television", content: "Did you know that your TV can be an energy hog? Make sure to turn it off when not in use." },
            { title: "Fridge", content: "Fridges can be one of the biggest energy consumers in your home. Ensure it's energy-efficient." },
        ]
    },
    kitchen: {
        model: "/kitchen.glb",
        cameraPositions: [
            kitchenCameraPosition,
            { x: -0.1, y: 1, z: 1 },    // Kitchen Overview
            { x: 0, y: 0, z: 0.1 },    // Stove position
            { x: -0.1, y: 0, z: 0.1 }, // Dishwasher position
        ],
        modelPositions: [
            [0, -0.4, 0],  // Initial position
            [0, 0, 0],  // Adjusted model position
            [0, 0, 0],  // Stove position
            [0, 0, 0],  // Dishwasher position
        ],
        texts: [
            { title: "Kitchen", content: "Discover energy-saving tips for your kitchen." },
            { title: "Kitchen Overview", content: "Your kitchen is a hub of energy consumption. Let's explore ways to make it more efficient." },
            { title: "Stove", content: "Using lids on pots and pans can significantly reduce cooking time and energy use." },
            { title: "Dishwasher", content: "Only run your dishwasher when it's full to maximize energy and water efficiency." },
        ]
    },


    studyroom: {
        model: "/studyroom.glb",
        cameraPositions: [
            studyroomCameraPosition,  // Study Room Overview
            { x: -0.1, y: 1, z: 1 },   // Desk position
            { x: 0, y: 0.5, z: 0.5 },  // Bookshelf position
        ],
        modelPositions: [
            [0.3, -0.4, 0],  // Initial position
            [0, 0, 0],     // Desk position
            [0, 0, 0],   // Bookshelf position
        ],
        texts: [
            { title: "Study Room", content: "Learn about energy-saving strategies for your study area." },
            { title: "Study Room Overview", content: "A well-lit and energy-efficient study space can boost productivity and reduce energy bills." },
            { title: "Desk", content: "Use LED desk lamps for focused lighting that consumes less energy." },
            { title: "Bookshelf", content: "Consider using smart power strips to eliminate standby power consumption from electronics." },
        ]
    },

    bedroom: {
        model: "/bedroom.glb",
        cameraPositions: [
            bedroomCameraPosition,   // Bedroom Overview
            { x: -0.2, y: 1, z: 1 }, // Bed position
            { x: 0, y: 0.5, z: 0.4 }, // Closet position
        ],
        modelPositions: [
            [0, -0.3, 0],  // Initial position
            [0, 0, 0],     // Bed position
            [0, 0, 0], // Closet position
        ],
        texts: [
            { title: "Bedroom", content: "Explore energy-saving tips for a comfortable and efficient bedroom." },
            { title: "Bedroom Overview", content: "Your bedroom can be a haven of comfort and energy efficiency." },
            { title: "Bed", content: "Use smart power strips to easily turn off all standby power to devices near your bed." },
            { title: "Closet", content: "Install LED lights with motion sensors in closets to save energy." },
        ]
    },

    garden: {
        model: "/garden.glb",
        cameraPositions: [
            initialCameraPosition,  // Initial camera position for landing page
            { x: -0.2, y: 1, z: 1.2 },    // Garden Overview
            { x: 0, y: 0.5, z: 0.3 },     // Plant position
            { x: -0.2, y: 0.5, z: 0.4 },  // Outdoor lighting position
        ],
        modelPositions: [
            [0, -0.5, -0.7],  // Initial position
            [0, 0, 0],     // Garden Overview
            [0, 0.5, 0],   // Plant position
            [0.3, 0, 0],   // Outdoor lighting position
        ],
        texts: [
            { title: "Garden", content: "Discover energy-saving techniques for your outdoor spaces." },
            { title: "Garden Overview", content: "An energy-efficient garden can reduce your overall energy consumption and create a sustainable outdoor space." },
            { title: "Plants", content: "Strategic placement of trees and shrubs can provide natural cooling and reduce the need for air conditioning." },
            { title: "Outdoor Lighting", content: "Use solar-powered or LED outdoor lighting to illuminate your garden efficiently." },
        ]
    },



    // Add the rest of the rooms...
};

function Model({ url, modelPosition }) {
    const { nodes } = useGLTF(url);

    return (
        <group position={modelPosition}>
            {Object.keys(nodes).map((key) => (
                <mesh key={key} geometry={nodes[key].geometry} material={nodes[key].material} />
            ))}
        </group>
    );
}

function CameraController({ cameraPosition }) {
    const { camera } = useThree();

    useFrame(() => {
        camera.position.lerp(cameraPosition, 0.1); // Smoothly transition to the new camera position
        camera.lookAt(0, 0, 0); // Ensure the camera is always looking at the model (assuming the model's center is at (0, 0, 0))
    });

    return null;
}

export default function RecommendationsPage() {
    const [selectedRoom, setSelectedRoom] = useState('livingRoom'); // Ensure a default room exists
    const [currentStep, setCurrentStep] = useState(0);

    const handleRoomSelection = (room) => {
        setSelectedRoom(room);
        setCurrentStep(0); // Reset to the first step of the room
    };

    const handleNavigation = (direction) => {
        const newStep = direction === 'up' ? currentStep - 1 : currentStep + 1;
        const maxSteps = rooms[selectedRoom]?.cameraPositions.length || 0; // Fallback in case `selectedRoom` is invalid

        if (newStep >= 0 && newStep < maxSteps) {
            setCurrentStep(newStep);
        }
    };

    const currentRoom = rooms[selectedRoom] || {}; // Ensure `currentRoom` is always an object
    const currentCameraPosition = currentRoom.cameraPositions?.[currentStep] || initialCameraPosition; // Fallback to initial position
    const currentModelPosition = currentRoom.modelPositions?.[currentStep] || [0, 0, 0]; // Fallback to [0, 0, 0]

    return (
        <div className="recommendations-page">
            <div className={`text-section ${currentStep === 0 ? '' : 'hidden'}`}>
                <h1>Energy-Saving Tips for Every Room in Your Home</h1>
                <p>Navigate through your home, zoom into appliances, and learn quick and easy tips to reduce energy consumption.</p>
                <p>Start Exploring Rooms</p>
            </div>

            <div className={`room-buttons ${currentStep === 0 ? '' : 'hidden'}`}>
                {Object.keys(rooms).map((room) => (
                    <button
                        key={room}
                        className={`room-button ${selectedRoom === room ? 'selected' : ''}`}
                        onClick={() => handleRoomSelection(room)}
                    >
                        {room.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                ))}
            </div>

            <div className="model-view">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Model url={currentRoom.model} modelPosition={currentModelPosition} />
                    <CameraController cameraPosition={currentCameraPosition} />
                </Canvas>
            </div>

            {currentStep > 0 && currentRoom.texts?.[currentStep - 1] && (
                <section className="info-text visible">
                    <h2>{currentRoom.texts[currentStep - 1].title}</h2>
                    <p>{currentRoom.texts[currentStep - 1].content}</p>
                </section>
            )}

            <div className="navigation-buttons">
                <button
                    onClick={() => handleNavigation('up')}
                    disabled={currentStep === 0}
                    className="nav-button up-button"
                >
                    Up
                </button>
                <button
                    onClick={() => handleNavigation('down')}
                    disabled={currentStep === currentRoom.cameraPositions?.length - 1}
                    className="nav-button down-button"
                >
                    Down
                </button>
            </div>
        </div>
    );
}
