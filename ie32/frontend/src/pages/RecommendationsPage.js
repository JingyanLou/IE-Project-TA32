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
            kitchenCameraPosition, //before click down button 
            { x: 0.9, y: 1, z: 0.7 }, //cam 1 kitchen overview
            { x: 1, y: 0, z: 0.1 },    //cam2 dishwasher
            { x: -0.1, y: 0, z: 0.1 },  //cam3 refrigerator
            { x: 0, y: 0, z: 0.1 },  //cam3 microwave
            { x: 0.1, y: 0, z: 0.9 },  //cam3 oven
            { x: 0.6, y: 0.5, z: 0.6 },  //cam3 range hoods
            { x: 0.3, y: 0, z: 0.3 },  //cam3 blender
        ],
        modelPositions: [
            [0, -0.4, 0],
            [0, 0, 0], //cam1 kitchen overview
            [0, 0, 0], //dishwasher
            [0, 0, 0], //refrigerator
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
                    "Skip the pre-rinse: If you find yourself rinsing dishes before you load your dishwasher in fear of scraps clogging up your filter, you're wasting both hot water and time.",
                    "Eco mode is your friend: A study found that default and quick-washing programs consume 20–30% more energy than eco modes, so you can expect to slash up to a third of your dishwasher's energy consumption just by going eco.",
                    "Run full loads at off-peak times: To really maximise savings, program your dishwasher to come on during off-peak hours when electricity rates may be lower.",
                    "Air-dry when possible: Since air-drying doesn't use heat, it not only saves energy but also reduces wear and tear on your dishwasher's heating element."
                ]
            },

            {
                title: "Refrigerator",
                content: [
                    "Check door seals regularly: The rubber seal is used for insulation purposes and prevents heat exchange between the ambient air and the refrigerator. It is important to regularly check that the seal is fully intact and sealing tightly.",
                    "Fill without overfilling: Keeping your fridge full means there’s less room for warm air to slip in when you open the door. So if you’ve got any big gaps, fill them with containers of water. But don’t jam things in – cool air still needs to be able to circulate around the whole fridge easily.",
                    "Let hot things cool first: Putting hot things in your fridge makes it work overtime to get back down to its normal temperature. To avoid this, leave hot food to cool on the bench before putting it in the fridge.",
                    "Don’t let frost build up: Frost can accumulate on the coils that remove heat from your freezer. Those coils need to be in contact with the warmer air in order to remove it, but if there’s ice in the way, it’s a lot harder – which means your freezer has to work harder, too.",
                    "Clean the coils: This is our top pick for a ‘weird staying at home activities’ bingo card. If you look behind or underneath your fridge, there’ll be the coils that help remove heat. Dust can settle on these and act as an insulator, so give them a brush or vacuum to help them release heat more efficiently.",
                    "Location is crucial: Never place your refrigerator next to a heat source such as an oven, hob or radiator, and avoid direct sunlight. Regardless of whether you have a freestanding appliance or a built-in one, always ensure that your refrigerator has sufficient ventilation so that the compressor does not end up running continuously.",
                    "Check your temperature settings: The optimum temperature for refrigerator operation is 5°C, and -18°C for freezer operation. As a rule of thumb, for each additional degree of refrigeration output about six percent more electricity is used. An accurate temperature setting can therefore directly save you money.",
                    "Defrost food in the refrigerator: When defrosting frozen food place it in the refrigerator. Not only does this ensure that the food is carefully defrosted, its presence cools down the refrigerator interior, reducing the amount of work that the compressor has to do, and therefore lowering energy consumption."
                ]
            },


            {
                title: "Microwave",
                content: [
                    "Choose the right-sized microwave: Select a microwave that suits your needs without being excessively large. Larger microwaves may consume more electricity to heat up their larger interior space.",
                    "Use microwave-safe cookware: Utilise microwave-safe containers and cookware that are designed for efficient heat transfer. Proper containers allow food to heat up faster and more evenly, reducing cooking time and energy usage.",
                    "Prep and defrost efficiently: Plan ahead and thaw frozen food items in the fridge or using other thawing methods before using the microwave. This reduces the time required for defrosting in the microwave.",
                    "Clean and maintain your oven regularly: Keep your microwave clean and well-maintained. Regular cleaning ensures optimal performance and prevents any issues that might affect energy efficiency.",
                    "Take advantage of preset functions: Many microwaves come with preset cooking functions tailored to specific food items. Utilise these functions to minimise cooking time and optimise energy usage.",
                    "Monitor standby power: Microwaves often consume a small amount of electricity even when not in use. Consider unplugging the microwave or using a power strip with an on/off switch to completely cut off standby power."
                ]
            },

            {
                title: "Oven",
                content: [
                    "Turn the oven off early: If you turn off your oven say five minutes before your dish is ready, the residual heat in the cavity will continue to cook your culinary creation without using energy. It doesn’t get more energy efficient than that!",
                    "Don’t open the oven door during cooking: Every time you open the door, you’re letting the heat out of the cavity. Your oven then has to work hard to get the cavity back up to the desired temperature.",
                    "Use ceramic or glass dishes: Glass and ceramic dishes retain heat a lot better than metal dishes, meaning you can use a slightly lower temperature. A lower temperature means lower energy consumption.",
                    "Time any self-cleaning programme wisely: If you’ve decided it’s time to clean your oven and want to use a pyrolytic self-cleaning feature, run this just after you’ve used the oven to cook. That way, the oven will already be hot and it’ll require less energy to the super-high temperature needed for pyrolytic cleaning.",
                    "Don’t put tin foil in the oven cavity: The reflective surface of the foil actually disrupts heat distribution inside the cavity. Not only this, it can also obstruct your oven’s fan, reducing its efficiency."
                ]
            },

            {
                title: "Range Hoods/Exhaust",
                content: [
                    "Regular Maintenance and Cleaning: Routine maintenance is the foundation of an energy-efficient exhaust system. Over time, grease and debris can accumulate in the ducts, reducing airflow and forcing the system to work harder.",
                    "Variable Speed Controllers: These devices adjust the fan speed based on the cooking load, reducing energy use during periods of low activity.",
                    "LED Lighting: Replace traditional lighting in the hood with LED lights, which use less energy and have a longer lifespan.",
                    "Balance Your HVAC System: An unbalanced HVAC system can cause your exhaust system to work harder, consuming more energy. Ensure that your kitchen’s heating, ventilation, and air conditioning systems are properly balanced to optimize airflow and reduce strain on the exhaust system.",
                    "Implement a Demand-Controlled Ventilation System: DCV systems use sensors to monitor cooking activity and adjust the exhaust fan speed accordingly. When cooking activity is low, the system reduces the fan speed, cutting down on energy use.",
                    "Regularly Inspect Ductwork and Seals: Leaky ducts and poor seals can lead to energy loss, causing the exhaust system to work harder than necessary. Regular inspections by professionals can identify and fix any issues with your ductwork, ensuring optimal performance."
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
            { top: '20%', left: '85%', transform: 'translateX(-50%)' },  // Text for refrigerator (cam 3)
            { top: '15%', left: '80%', transform: 'translateX(-50%)' },  // Text for microwave (cam 3)
            { top: '50%', left: '80%', transform: 'translateX(-50%)' },  // Text for oven (cam 3)
            { top: '10%', left: '20%', transform: 'translateX(-50%)' },  // Text for range hoods (cam 3)
            { top: '30%', left: '20%', transform: 'translateX(-50%)' }   // Text for blender (cam 3)
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
                    "Avoid using screen savers: Screen savers consume more energy; it’s better to turn off the monitor when not in use.",
                    "Reduce screen brightness: Lowering brightness and placing the monitor away from direct sunlight can minimize energy consumption and reduce glare.",
                    "Integrate occupancy sensors: Using occupancy sensors with smart home systems can detect when a room is unoccupied and automatically turn off monitors."
                ]
            },
            {
                title: "Printer/Scanner",
                content: [
                    "Enable sleep mode: Ensure the printer enters power-saving mode after a period of inactivity.",
                    "Batch print jobs together: Group print jobs to reduce the frequency of the printer powering up and down, thereby saving energy."
                ]
            },
            {
                title: "Modem",
                content: [
                    "Use a smart plug: Automate modem power management during off-hours with a smart plug or smart home system.",
                    "Place in a well-ventilated area: Ensure the modem is in a well-ventilated space to prevent overheating and reduce unnecessary power consumption."
                ]
            },

            {
                title: "Lights",
                content: [
                    "Use energy-efficient LED bulbs: LED bulbs can cut electricity consumption by up to 75%.",
                    "Turn off the lamp: Switch off lights when leaving the room or when they are no longer needed.",
                    "Use task lighting: Focus light only where it's needed to reduce energy waste compared to a ceiling full of downlights.",
                    "Additional Tip: Upgrading to LED bulbs not only reduces energy use but also extends bulb life by up to 10 times, making them a more efficient and cost-effective choice."
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
                    "Use ceiling or portable fans with air conditioning: Fans can make you feel cooler by 2-3°C, allowing you to set the AC at a higher temperature.",
                    "Fans use minimal power: Fans help reduce the need to lower the AC temperature, which increases energy use by 5-10% for each 1°C.",
                    "Turn off fans when leaving the room: Always switch off fans when the room is unoccupied to save energy."
                ]
            },
            {
                title: "Thermostat",
                content: [
                    "Cooling: Set the thermostat to 22-24°C, or slightly lower if needed, to maintain comfort while reducing energy consumption.",
                    "Heating: Set the thermostat to a higher temperature than the current room temperature to efficiently heat your space. Avoid excessive heating; each degree higher can increase costs by up to 15%.",
                    "Turn off the thermostat overnight: Switch off the thermostat when you're away or overnight to reduce unnecessary energy use."
                ]
            },
            {
                title: "TV",
                content: [
                    "Turn off the TV completely: Switch off the TV at the wall or use a smart home system to automatically turn it off when not in use to avoid additional power consumption.",
                    "Lower the TV’s brightness: Reduce brightness and explore power-saving modes to decrease energy use."
                ]
            },
            {
                title: "Phone Charging Station",
                content: [
                    "Unplug chargers when not in use: Chargers continue to draw power even after your phone is fully charged, so it's best to unplug them.",
                    "Unplug after charging: To save power, unplug your charger once the device is fully charged and switch to a low power setting if possible.",
                    "Prefer wired charging: Charging with a cable is more efficient than wireless methods, as wired connections lose less energy."
                ]
            },
            {
                title: "Lamp",
                content: [
                    "Replace incandescent bulbs with LEDs: Switching to LED bulbs can save up to 80% on lighting costs.",
                    "Turn off unnecessary lighting: Turn off lamps when not needed or before leaving the room to save energy.",
                    "Use task lighting: Disconnect lamps from multiple lamp fixtures and use task lighting where needed, such as for reading, to reduce energy use by up to 80%.",
                    "Install motion sensors: Automatically turn lights on when someone enters the room by installing motion sensors."
                ]
            },
            {
                title: "Electric Blanket",
                content: [
                    "Use an electric blanket over other heaters: Electric blankets consume significantly less energy—around four cents per hour compared to some space heaters, which can cost up to 15 cents per hour—while effectively warming your bed.",
                    "Use a timer: Preheat the bed for 10 to 30 minutes and then turn the electric blanket off before sleeping to save energy.",
                    "Avoid running the blanket all night: Even if it has an all-night mode, turn off the electric blanket when not in use to reduce energy consumption."
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

    //Text position for each camera angle
    const currentTextPosition = currentRoom.textPositions?.[currentStep] || { top: '12%', left: '50%', transform: 'translateX(-50%)' };

    return (
        <div className="recommendations-page">
            <div className={`text-section ${currentStep === 0 ? '' : 'hidden'}`}>
                <h1>Energy-Saving Tips for Every Room in Your Home</h1>
                <p>Explore each room to discover simple energy-saving tips that reduce consumption and cut costs. Learn how small changes in appliance usage, lighting, and heating can make your home more efficient and eco-friendly. Select a room model and click down to start the room tour!</p>

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
