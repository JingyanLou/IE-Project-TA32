import React from 'react';
import './step2container.css';
import PropTypes from 'prop-types';

const Step2Container = ({ appliances }) => {
    // Calculate consumption for each appliance and sort them in descending order
    const sortedAppliances = appliances
        .map(appliance => ({
            applianceType: appliance[0],  // appliance type
            quantity: appliance[1],       // quantity
            dailyHours: appliance[2],     // daily hours
            energyConsumption: appliance[3], // energy consumption per hour
            consumption: appliance[2] * appliance[1] * appliance[3] // total consumption calculation
        }))
        .sort((a, b) => b.consumption - a.consumption);

    console.log(appliances);

    return (
        <div className="step2-container">
            <h2 className="ranking-title">Your Appliance Consumption Ranking</h2>
            <div className="ranking-display">
                <ul>
                    {sortedAppliances.map((appliance, index) => (
                        <li
                            key={index}
                            className={`rank-item ${index < 3 ? `rank-${index + 1}` : ''}`}
                            style={{ '--index': index }} /* Set index for animation delay */
                        >
                            <span className="rank-number">
                                {index + 1}
                                {index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
                            </span>
                            <div className="appliance-details">
                                <div>Appliance Type: {appliance.applianceType}</div>
                                <div>Total Consumption: {appliance.consumption.toFixed(5)} kWh/day</div>
                                <div>Quantity: {appliance.quantity}</div>
                                <div>Daily Hours: {appliance.dailyHours}</div>
                                <div>Energy Consumption: {appliance.energyConsumption} kWh/hour</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// PropTypes for type checking
Step2Container.propTypes = {
    appliances: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Step2Container;