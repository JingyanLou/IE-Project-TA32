import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import './recommendationpage.css';

const initialCameraPosition = { x: 0.2, y: 1, z: 1.9 };

const rooms = {
    livingRoom: {
        model: "/livingroom.glb",
        cameraPositions: [
            initialCameraPosition,
            { x: -0.1, y: 1, z: 1 },    // Living Room Overview
            { x: 0, y: 0, z: 0.1 },    // TV position
            { x: -0.1, y: 0, z: 0.1 }, // Fridge position
        ],
        texts: [
            { title: "Start ", content: "Explore energy-saving tips for your living room." },
            { title: "Living Room Overview", content: "Welcome to your energy-efficient living room! Every corner of this space is packed with potential savings." },
            { title: "Television", content: "Did you know that your TV can be an energy hog? Make sure to turn it off when not in use." },
            { title: "Fridge", content: "Fridges can be one of the biggest energy consumers in your home. Ensure it's energy-efficient." },
        ]
    },
    kitchen: {
        model: "/kitchen.glb",
        cameraPositions: [
            initialCameraPosition,
            { x: -0.1, y: 1, z: 1 },    // Kitchen Overview
            { x: 0, y: 0, z: 0.1 },    // Stove position
            { x: -0.1, y: 0, z: 0.1 }, // Dishwasher position
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
            initialCameraPosition,
            { x: -0.1, y: 1, z: 1 },    // Study Room Overview
            { x: 0, y: 0, z: 0.1 },    // Desk position
            { x: -0.1, y: 0, z: 0.1 }, // Bookshelf position
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
            initialCameraPosition,
            { x: -0.1, y: 1, z: 1 },    // Bedroom Overview
            { x: 0, y: 0, z: 0.1 },    // Bed position
            { x: -0.1, y: 0, z: 0.1 }, // Closet position
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
            initialCameraPosition,
            { x: -0.1, y: 1, z: 1 },    // Garden Overview
            { x: 0, y: 0, z: 0.1 },    // Plant position
            { x: -0.1, y: 0, z: 0.1 }, // Outdoor lighting position
        ],
        texts: [
            { title: "Garden", content: "Discover energy-saving techniques for your outdoor spaces." },
            { title: "Garden Overview", content: "An energy-efficient garden can reduce your overall energy consumption and create a sustainable outdoor space." },
            { title: "Plants", content: "Strategic placement of trees and shrubs can provide natural cooling and reduce the need for air conditioning." },
            { title: "Outdoor Lighting", content: "Use solar-powered or LED outdoor lighting to illuminate your garden efficiently." },
        ]
    },
};

function Model({ url, cameraPosition, modelPosition }) {
    const { nodes } = useGLTF(url);
    const { camera } = useThree();

    useFrame(() => {
        camera.position.lerp(cameraPosition, 0.1);
    });

    return (
        <group position={modelPosition}>
            {Object.keys(nodes).map((key) => (
                <mesh key={key} geometry={nodes[key].geometry} material={nodes[key].material} />
            ))}
        </group>
    );
}

export default function RecommendationsPage() {
    const [selectedRoom, setSelectedRoom] = useState('livingRoom');
    const [currentStep, setCurrentStep] = useState(0);

    const handleRoomSelection = (room) => {
        setSelectedRoom(room);
        setCurrentStep(0);
    };

    const handleNavigation = (direction) => {
        const newStep = direction === 'up' ? currentStep - 1 : currentStep + 1;
        const maxSteps = rooms[selectedRoom].cameraPositions.length;

        if (newStep >= 0 && newStep < maxSteps) {
            setCurrentStep(newStep);

            const currentRoom = rooms[selectedRoom];
            const cameraPosition = currentRoom.cameraPositions[newStep];
            const modelPosition = newStep > 0 ? [0, 1, 0] : [0, 0.7, 0];
            const title = currentRoom.texts[newStep]?.title || 'N/A';

            console.log(`Navigation ${direction}:`);
            console.log('Camera Position:', cameraPosition);
            console.log('Model Position:', modelPosition);
            console.log('Current Title:', title);
        }
    };

    const currentRoom = rooms[selectedRoom];
    const currentCameraPosition = currentRoom.cameraPositions[currentStep];
    const modelPosition = currentStep > 0 ? [0, 1, 0] : [0, 0.7, 0];

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
                    <Model url={currentRoom.model} cameraPosition={currentCameraPosition} modelPosition={modelPosition} />
                </Canvas>
            </div>

            {currentRoom.texts.map((text, index) => (
                <section
                    key={index}
                    className={`info-text ${currentStep === index + 1 ? 'visible' : ''}`}
                >
                    <h2>{text.title}</h2>
                    <p>{text.content}</p>
                </section>
            ))}

            <div className="navigation-buttons">
                <button
                    onClick={() => handleNavigation('up')}
                    disabled={currentStep === 0}
                >
                    Up
                </button>
                <button
                    onClick={() => handleNavigation('down')}
                    disabled={currentStep === currentRoom.cameraPositions.length - 1}
                >
                    Down
                </button>
            </div>
        </div>
    );
}