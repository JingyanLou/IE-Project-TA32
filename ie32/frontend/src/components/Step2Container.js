import React from 'react';
import './step2container.css';
import PropTypes from 'prop-types';

const Step2Container = ({ appliances }) => {
    // Calculate consumption for each appliance and sort them in descending order
    const sortedAppliances = appliances
        .map(appliance => ({
            ...appliance,
            consumption: appliance.dailyHours * appliance.energyConsumption * appliance.quantity
        }))
        .sort((a, b) => b.consumption - a.consumption);

    return (
        <div className="step2-container">
            <h2 className="ranking-title">Your Appliance Consumption Ranking</h2>
            <div className="ranking-display">
                <ul>
                    {sortedAppliances.map((appliance, index) => (
                        <li key={index} className={`rank-item ${index < 3 ? `rank-${index + 1}` : ''}`}>
                            <span className="rank-number">
                                {index + 1}
                                {index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}
                            </span>
                            <div className="appliance-details">
                                <div>Appliance Type: {appliance.applianceType}</div>
                                <div>Consumption: {appliance.consumption.toFixed(2)} kWh</div>
                                <div>Quantity: {appliance.quantity}</div>
                                <div>Daily Hours: {appliance.dailyHours}</div>
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
    appliances: PropTypes.array.isRequired,
};

export default Step2Container;
