import React from 'react';
import './appliancebarchart.css';

const mockData = [
    { name: 'Air Condition', value: 30 },
    { name: 'Phone Charger', value: 15 },
    { name: 'Fridge', value: 60 },
    { name: 'Lift', value: 10 },
    { name: 'Laptop', value: 20 },
    { name: 'Lamp', value: 25 },
    { name: 'Monitor', value: 18 },
    { name: 'Oven', value: 40 },
    { name: 'Dishwasher', value: 22 },
    { name: 'Label', value: 35 },
    { name: 'Label', value: 12 },
    { name: 'Label', value: 35 },
    { name: 'Label', value: 12 },
    { name: 'Label', value: 35 },
    { name: 'Label', value: 12 },
    { name: 'Label', value: 35 },
    { name: 'Label', value: 12 },
    { name: 'Label', value: 35 },
    { name: 'Label', value: 12 },
    { name: 'Label', value: 35 },
    { name: 'Label', value: 12 },
    { name: 'Label', value: 35 },
    { name: 'Label', value: 12 },

];

const ApplianceBarChart = () => {
    return (
        <div className="barchart-container">

            <div className="barchart">
                {mockData.map((item, index) => (
                    <div key={index} className="barchart-item">
                        <div className={`barchart-bar ${item.name === 'Fridge' ? 'highlight' : ''}`}
                            style={{ height: `${item.value * 2}px` }}>
                        </div>
                        <div className="barchart-label">{item.name.substring(0, 6)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplianceBarChart;
