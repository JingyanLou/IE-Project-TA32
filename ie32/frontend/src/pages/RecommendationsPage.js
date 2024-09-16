import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this correct import
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import './recommendationpage.css';

const initialCameraPosition = { x: 0.2, y: 1, z: 1.9 };
const kitchenCameraPosition = { x: 0.2, y: 1.1, z: 1.9 };
const studyroomCameraPosition = { x: 0.2, y: 1, z: 2.3 };
const bedroomCameraPosition = { x: 0.2, y: 1, z: 3 };

const livingRoomCameraPosition = { x: 0.2, y: 1, z: 2 };

const rooms = {


    kitchen: {
        model: "/kitchen.glb",
        cameraPositions: [
            kitchenCameraPosition, //before click down button 
            { x: 0.9, y: 1, z: 0.7 }, //cam 1 kitchen overview
            { x: 1.3, y: 0, z: 1 },    //cam2 dishwasher
            { x: -0.1, y: 0, z: 0.1 },  //cam3 refrigerator
            { x: 0, y: 0, z: 0.1 },  //cam3 microwave
            { x: 0, y: 0.1, z: 0.1 },  //cam3 oven
            { x: 0.2, y: 0.1, z: 0.6 },  //cam3 range hoods
            { x: 0.2, y: 0.1, z: 0.1 },  //cam3 blender
        ],
        modelPositions: [
            [0, -0.4, 0],
            [0, 0, 0], //cam1 kitchen overview
            [0.9, 0.2, 0], //dishwasher
            [-0.4, 0, 0], //refrigerator
            [0, 0.2, 0], //microwave
            [-0.2, 0.2, 0], //oven
            [0.4, -0.3, 0.3], //exhaust
            [0.3, 0, 0.3],
        ],
        texts: [
            {
                title: "Kitchen Overview", content: [
                    "Dishwasher",
                    "Refrigerator",
                    "Microwave",
                    "Oven",
                    "Range Hoods/ Exhaust",
                    "Blender"
                ]
            },

            {
                title: "Dishwasher", content: [
                    " Eco mode is better than quick-washing programs. Quick-washing programs consume 20–30% more energy than eco modes.",
                    " Always run your dishwasher with full loads, preferably during off-peak hours (9pm-12am daily)",
                    "Whenever possible, use the air-dry function instead of heat drying to save energy and reduce wear on your appliance.",

                ]
            },

            {
                title: "Refrigerator",
                content: [
                    " Keep your fridge stocked but not overcrowded because it takes more energy for the engine to lower the temperature due to the limited airflow within the unit.",
                    "Position your fridge away from heat sources like the oven or direct sunlight because the additional heat may force the engine of the freezer to work harder.",
                    "Set it to the optimal temperature (5°C for the fridge and -18°C for the freezer) to avoid unnecessary energy consumption",
                ]
            },


            {
                title: "Microwave",
                content: [
                    "Many microwaves come with preset cooking functions tailored to specific food items. Utilise these functions to minimise cooking time and optimise energy usage..",
                    " Always use microwave-safe containers that promote efficient heat transfer, allowing your food to heat more evenly and quickly, which reduces energy consumption.",

                ]
            },

            {
                title: "Oven",
                content: [
                    "Don’t put tin foil in the oven cavity: The reflective surface of the foil actually disrupts heat distribution inside the cavity. Not only this, it can also obstruct your oven’s fan, reducing its efficiency.",
                    " Turn your oven off a few minutes before your dish is ready and let the residual heat finish the cooking, saving energy in the process.",
                    "Use glass or ceramic dishes, which retain heat better than metal ones, allowing you to cook at slightly lower temperatures without compromising the result.",
                    "Time any self-cleaning programme wisely: If you’ve decided it’s time to clean your oven and want to use a pyrolytic self-cleaning feature, run this just after you’ve used the oven to cook. That way, the oven will already be hot and it’ll require less energy to the super-high temperature needed for pyrolytic cleaning.",
                    "Don’t put tin foil in the oven cavity: The reflective surface of the foil actually disrupts heat distribution inside the cavity. Not only this, it can also obstruct your oven’s fan, reducing its efficiency."
                ]
            },

            {
                title: "Range Hoods/Exhaust",
                content: [
                    "Demand-Controlled Ventilation System use sensors to monitor cooking activity and adjust the exhaust fan speed accordingly. When cooking activity is low, the system reduces the fan speed, cutting down on energy use.",

                ]
            },

            {
                title: "Blender",
                content: [
                    "Lower wattage: Use a blender with a lower wattage. Lower-wattage blenders use less energy overall, which can help to reduce costs.",
                    "Make larger batches: Preparing larger batches of smoothies or soups at one time can help to reduce the average energy usage per use.",
                    "Use room temperature ingredients: Frozen ingredients require more energy to blend, so using room-temperature ingredients can help to reduce energy consumption.",
                    "Use a power strip: Using a power strip can help to reduce standby power usage by turning off the blender when it’s not in use.",
                    "Clean the blender regularly: A clean blender can work more efficiently, which can help to reduce energy consumption."
                ]
            },


            // ... other texts
        ],

        textPositions: [
            { top: '50%', left: '50%', transform: 'translateX(-50%)' },  // this is no used...
            { top: '50%', left: '18%', transform: 'translateX(-50%)' },  // Text for kitchen overview (cam 1)
            { top: '20%', left: '18%', transform: 'translateX(-50%)' },  // Text for dishwasher (cam 2)
            { top: '20%', left: '80%', transform: 'translateX(-50%)' },  // Text for refrigerator (cam 3)
            { top: '15%', left: '80%', transform: 'translateX(-50%)' },  // Text for microwave (cam 3)
            { top: '30%', left: '80%', transform: 'translateX(-50%)' },  // Text for oven (cam 3)
            { top: '10%', left: '20%', transform: 'translateX(-50%)' },  // Text for range hoods (cam 3)
            { top: '15%', left: '25%', transform: 'translateX(-50%)' }   // Text for blender (cam 3)
        ]
    },

    studyroom: {
        model: "/studyroom.glb",
        cameraPositions: [
            studyroomCameraPosition,
            { x: -0.1, y: 1, z: 1 },   // Overview Cam1
            { x: 0.2, y: 0, z: 0.3 },  // Cam2 Monitor
            { x: 0.5, y: 0, z: 0.1 }, // Cam3 Printer/Scanner
            { x: -0.1, y: 0.1, z: 0.1 }, // Cam4 Modem
            { x: -0.3, y: 0.1, z: 0.1 }, // Cam5 Lights
        ],
        modelPositions: [
            [0.3, -0.4, 0],  // Initial position
            [0, 0, 0],     // 1st cam overview
            [0, 0, 0],   // monitor
            [0.5, 0, 0], // printer/scanner
            [0, 0, 0], // modem
            [-0.2, 0, 0], // lights
        ],
        texts: [
            {
                title: "Studyroom Overview", content: [
                    "Montior",
                    "Printer/Scanner",
                    "Modem",
                    "Lights"
                ],
            },

            {
                title: "Monitor",
                content: [
                    "Avoid using screen savers as they consume more energy; the more efficient energy saving method is to turn off the monitor instead.",
                    "Integrating occupancy sensors with smart home systems can detect when a room is unoccupied and automatically turn off monitors.",
                ]
            },
            {
                title: "Printer/Scanner",
                content: [
                    "Enable sleep mode to ensure the printer enters power-saving mode after a period of inactivity.",
                    "Batch print jobs together to reduce the frequency of the printer powering up and down."
                ]
            },
            {
                title: "Modem",
                content: [
                    "Use a smart plug or smart home system to automate modem power management during off-hours.",
                    "Place the modem in a well-ventilated area to prevent overheating and reduce unnecessary power consumption."
                ]
            },

            {
                title: "Lights",
                content: [
                    "To replace the light bulb with LEDs. The US Department of Energy highlighted that LEDs use up to 75% less energy and last 25 times longer than halogen and fluorescent bulbs.",
                    "Install smart home systems and smart switches for automate scheduling, remote control, and automatically turn off lights when no one is detected, preventing lights from staying on in empty rooms.",

                ]
            },




        ],
        textPositions: [
            { top: '50%', left: '50%', transform: 'translateX(-50%)' },  // this is no used...
            { top: '50%', left: '80%', transform: 'translateX(-50%)' },  // Text for Overview (cam 1)
            { top: '20%', left: '18%', transform: 'translateX(-50%)' },  // Text for monitor
            { top: '25%', left: '25%', transform: 'translateX(-50%)' },  // Text for printer/scanner
            { top: '30%', left: '64%', transform: 'translateX(-50%)' },  // Text for modem
            { top: '20%', left: '75%', transform: 'translateX(-50%)' },  // Text for lights

        ]

    },

    bedroom: {
        model: "/bedroom.glb",
        cameraPositions: [
            bedroomCameraPosition,
            { x: -0.9, y: 0.5, z: 2 }, // Overview Cam1
            { x: 0, y: -0.3, z: 0.2 }, // cam2 fan
            { x: 0, y: 0, z: 0.5 }, // cam3 thermostat
            { x: 0, y: 0, z: 0.5 }, // cam4 TV
            { x: -0.1, y: 0.3, z: 0.1 }, // cam5 Phone Charging Station
            { x: -0.1, y: 0.15, z: 0.1 }, // cam6 Lamp
            { x: 0, y: 0.6, z: 0.1 }, // cam7 Electric Blanket
        ],
        modelPositions: [
            [0, -0.3, 0],  // no use
            [-0.3, 0.4, 0],     // overview
            [0, 0, 0], // fan
            [0.5, 0, 0.8], // thermostat
            [0.5, -0.2, 0.8], // tv
            [-0.5, 0, 0.4], // phone charging station
            [-0.8, 0.1, 0.5], // lamp
        ],
        texts: [
            {
                title: "Bedroom Overview", content: [
                    "Fan",
                    "Thermostat",
                    "TV",
                    "Phone Charging Station",
                    "Lamp",
                    "Electric Blanket"
                ],
            },
            {
                title: "Fan",
                content: [
                    " Fans consume only about 15-90 watts per hour, which is a fraction of the energy used by an air conditioner and by using fans with AC you can cut energy consumption by up to 76% compared to using the AC alone.",

                ]
            },
            {
                title: "Thermostat",
                content: [
                    "Winter: Set your heater between 18-20°C to keep warm and save on costs. Every degree above this can increase your gas bill by around 15%.",
                    "Summer: Keep your air conditioner set between 23-26°C is the optimal energy saving degree  to maintain a cool home while keeping energy costs down.",

                ]
            },
            {
                title: "TV",
                content: [
                    "Use smart home system or smart home apps to automatically turn off the TV when it is not in used to avoid additional power consumption",
                    " Lower the TV's brightness to around 50-60% to reduce energy consumption and ease eye strain. This simple adjustment can also cut down on electricity costs, as televisions account for an average of 13% of household energy use."
                ]
            },
            {
                title: "Phone Charging Station",
                content: [
                    "Prefer charging with a cable over wireless methods, as wired connections are more efficient (lesser charging time) and lose less energy.",

                ]
            },
            {
                title: "Lamp",
                content: [
                    " Replace standard incandescent light bulbs with LED bulbs to save up to 80% on lighting costs.",
                ]
            },
            {
                title: "Electric Blanket",
                content: [
                    "Use an electric blanket over other heaters, as it consumes significantly less energy—around four cents per hour compared to some space heaters, which can cost up to 15 cents per hour—while effectively warming your bed.",
                    "Remember to disable its defaulted all-night mode, and turn it off when not in use to reduce energy consumption.",
                ]
            },

        ],
        textPositions: [
            { top: '50%', left: '50%', transform: 'translateX(-50%)' },  // this is no used...
            { top: '20%', left: '80%', transform: 'translateX(-50%)' },  // Text for Overview (cam 1)
            { top: '30%', left: '80%', transform: 'translateX(-50%)' },  // Text for fan
            { top: '25%', left: '29%', transform: 'translateX(-50%)' },  // Text for Thermostat
            { top: '25%', left: '70%', transform: 'translateX(-50%)' },  // Text for TV
            { top: '35%', left: '75%', transform: 'translateX(-50%)' },  // Text for Phone Charging Station
            { top: '20%', left: '75%', transform: 'translateX(-50%)' },  // Text for Lamp
            { top: '30%', left: '85%', transform: 'translateX(-50%)' },  // Text for Electric Blanket

        ]
    },
    garden: {
        model: "/garden.glb",
        cameraPositions: [
            initialCameraPosition,  // Initial camera position for landing page
            { x: -0.7, y: 1, z: 2 },    // Garden Overview
            { x: -0.9, y: 1, z: 1 },     // Solar Panels
            { x: 0.3, y: 0.2, z: 1 },  // Swimming Pool Pump
            { x: 0.4, y: 0.4, z: 1 },   // Ventilation Pump
        ],
        modelPositions: [
            [0, -0.5, -0.7],  // Initial position
            [-0.6, 0.3, 0],     // Garden Overview
            [-0.7, 0.1, 0.4],   // solar panels
            [0.3, 0.3, 0],   // swimming pool pump
            [0.7, 0.5, 0],   // Ventilation Pump
        ],
        texts: [
            {
                title: "Garden Overview", content: [
                    "Solar Panels",
                    "Swimming Pool Pump",
                    "Ventilation Pump",
                ],
            },

            {
                title: "Solar Panels",
                content: [
                    " It can save you about 30 to 40% on your yearly electricity bill",
                ]
            },
            {
                title: "Swimming Pool Pump",
                content: [
                    "Install a pool cover to reduce heat loss and evaporation, which can lessen the workload on the pump.",
                    "Install a pool pump timer to run the pump during off-peak hours and for optimal durations, such as 4-6 hours per day, depending on pool size and usage.",

                ]
            },

            {
                title: "Ventilation Pump",
                content: [
                    "Ventilation fan can reduce energy consumption by up to 30% compared using air conditioner where it improves the air quality and removes odours by constantly introducing and circulating purified air into your home.",
                ]
            },


        ],
        textPositions: [
            { top: '50%', left: '50%', transform: 'translateX(-50%)' },  // this is no used...
            { top: '50%', left: '80%', transform: 'translateX(-50%)' },  // Text for Overview (cam 1)
            { top: '25%', left: '80%', transform: 'translateX(-50%)' },  // Text for solar panels
            { top: '15%', left: '25%', transform: 'translateX(-50%)' },  // Text for Swimming Pool Pump
            { top: '30%', left: '%', transform: 'translateX(-50%)' },  // Text for Ventilation Pump
        ]
    },

    livingRoom: {
        model: "/livingroom.glb",
        cameraPositions: [
            livingRoomCameraPosition, // Landing page position
            { x: 1.2, y: 1, z: 1 },    // overview
            { x: 0.3, y: 0, z: 0 },    // tv
            { x: 0.3, y: 0, z: -0.1 }, // home theater
            { x: 0.3, y: 0, z: 0.4 }, // heater
            { x: 0.4, y: 0, z: 0.1 }, // gaming console
            { x: 0.2, y: 0, z: 0.1 }, // table lamp
            { x: -0.9, y: 0, z: 1 }, // Electric Fireplace
            { x: 0.4, y: 0, z: -0.1 }, // DVD/Blu-ray Player
        ],
        modelPositions: [
            [0, -0.05, 0],  // Initial position
            [0, 0.4, 0],  // overview
            [0, 0, 0],  // tv
            [0.7, 0.3, 0],  // home theater
            [-0.3, 0.2, -0.9], //heater
            [0.8, 0.3, 0.3], //gaming console
            [0.8, 0.1, 0.4], //table lamp
            [0.5, 0.2, 0.8], //Electric Fireplace
            [0.7, 0.3, -0.5], //Electric Fireplace
        ],
        texts: [
            {
                title: "Livingroom Overview", content: [
                    "Televison",
                    "Home Theater System",
                    "Heater",
                    "Gaming Console",
                    "Table Lamp",
                    "Electric Fireplace",
                    "Smart Speakers",
                ]
            },
            {
                title: "Televison", content: [
                    "Set up the BroadLink RM4 Mini with the app to learn TV commands, including the power-off function, then automate a shutdown timer to turn off your TV after inactivity.",
                    "Create an energy-saving scene to manage multiple devices (TV, AC, lights) simultaneously, enhancing energy efficiency",

                ]
            },
            {
                title: "Home Theater System", content: [
                    "Disabling subwoofers and other components when not required can reduce energy consumption by 20-40%, as subwoofers consume significant power during bass amplification",
                    "Soundbars are more energy-efficient than full surround sound systems, consolidating multiple components into a single unit, which reduces power consumption during regular TV use",

                ]
            },
            {
                title: "Heater", content: [
                    " Remember to clean the filters regularly. This is because dirty filters reduce energy efficiency. When airflow is restricted, the system's fan motor run longer to circulate air, consuming more energy.",
                    "Integrate a smart thermostat into your home automation system to control temperature settings remotely and automatically adjust based on your daily routines. Smart thermostats can learn your preferences and reduce energy consumption by optimising heating and cooling when you're away.",

                ]
            },
            {
                title: "Gaming Console", content: [
                    "Gaming consoles like the Xbox Series X/S and PlayStation offer instant-on or similar standby modes to allow faster startup times. However, these modes keep certain components, such as network connectivity and power to the console's memory, active to ensure the system is ready for quick use.",
                    " Many consoles download game updates, patches, and system firmware while in standby mode to keep the system up to date. While convenient, this process draws additional power because the system must keep network components and storage devices active.",

                ]
            },
            {
                title: "Table Lamp", content: [
                    "Use LED bulbs: They use up to 80% less energy and last longer than incandescent bulbs.",
                    "Add motion sensors: Install motion sensors or timers to automatically turn off lamps when not in use.",


                ]
            },
            {
                title: "Electric Fireplace", content: [
                    "Use zone heating: Only use the fireplace in the room where it's needed, rather than heating the entire house.",
                    "Keep the doors closed: Prevent drafts to make your fireplace more energy-efficient.",

                ]
            },

            {
                title: "DVD/Blu-ray Player", content: [
                    " Switch off when not in use: Avoid keeping the player in standby mode, as it continues to draw power.",
                    "Use streaming services with efficient devices: Instead of using a player for physical media, consider a more energy-efficient streaming device.",


                ]
            },


        ],
        textPositions: [
            { top: '50%', left: '50%', transform: 'translateX(-50%)' },  // this is no used...
            { top: '30%', left: '18%', transform: 'translateX(-50%)' },  // Text for overview (cam 1)
            { top: '20%', left: '80%', transform: 'translateX(-50%)' },  // Text for tv
            { top: '20%', left: '70%', transform: 'translateX(-50%)' },  // Text for home theater
            { top: '15%', left: '25%', transform: 'translateX(-50%)' },  // Text for heater
            { top: '30%', left: '80%', transform: 'translateX(-50%)' },  // Text for  gaming console
            { top: '10%', left: '20%', transform: 'translateX(-50%)' },  // Text for    table lamp
            { top: '15%', left: '25%', transform: 'translateX(-50%)' },  // Text for  Electric Fireplace
            { top: '15%', left: '20%', transform: 'translateX(-50%)' }    // Text for  DVD/Blu-ray Player
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

    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate('/selection'); // Adjust this path as needed
    };



    const [selectedRoom, setSelectedRoom] = useState('kitchen'); // Ensure a default room exists
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

    //Text position for each camera angle
    const currentTextPosition = currentRoom.textPositions?.[currentStep] || { top: '12%', left: '50%', transform: 'translateX(-50%)' };

    return (
        <div className="recommendations-page">
            <button className="nav-link-button" onClick={handleBackToDashboard}>
                Back
            </button>

            <div className={`text-section ${currentStep === 0 ? '' : 'hidden'}`}>
                <h1>Energy-Saving Tips for Every Room in Your Home</h1>
                <p>Implement simple tips to make your home’s energy consumption more efficient and sustainable. Choose a room model and start the tour!</p>

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
                <section
                    className="info-text visible"
                    style={{
                        top: currentTextPosition.top,
                        left: currentTextPosition.left,
                        transform: currentTextPosition.transform
                    }}
                >
                    <h2>{currentRoom.texts[currentStep - 1].title}</h2>
                    <ul>
                        {currentRoom.texts[currentStep - 1].content.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </section>
            )}

            <div className="navigation-buttons">
                <button
                    onClick={() => handleNavigation('up')}
                    disabled={currentStep === 0}
                    className="nav-button up-button"
                >
                    Previous Appliance
                </button>
                <button
                    onClick={() => handleNavigation('down')}
                    disabled={currentStep === currentRoom.cameraPositions?.length - 1}
                    className="nav-button down-button"
                >
                    Next Appliance
                </button>
            </div>
        </div>
    );
}
