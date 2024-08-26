import React from 'react';
import PropTypes from 'prop-types';
import './step4container.css';

const Step4Container = ({ appliances, userInformation }) => {
    // Calculate the estimated monthly bill based on appliances data
    const totalConsumption = appliances.reduce((total, appliance) => {
        return total + appliance.dailyHours * appliance.energyConsumption * appliance.quantity;
    }, 0);

    const estimatedMonthlyBill = (totalConsumption * 30).toFixed(2); // Example calculation

    // Define a fixed benchmark for now
    const benchmark = 38; // kWh

    return (
        <div className="step4-container">
            <div className="left-section">
                <div className="insight-section">
                    <div className="insight-bill insight">
                        <h3>Your Estimated Monthly Bill</h3>
                        <p className="insight-value">{estimatedMonthlyBill} AUD</p>
                    </div>
                    <div className="insight-benchmark insight">
                        <h3>Your Estimated Benchmark</h3>
                        <p className="insight-value">{benchmark} kWh</p>
                    </div>
                </div>
                <div className="treemap-section">
                    <h3>Your Home Appliance Consumption Ranking</h3>
                    <div className="treemap">
                        {appliances.length > 0 ? (
                            appliances.map((appliance, index) => (
                                <div key={index} className="treemap-item">
                                    <p>Object {index + 1}</p>
                                    <p>{appliance.applianceType}</p>
                                </div>
                            ))
                        ) : (
                            <div className="treemap-placeholder">Treemap Placeholder</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="map-section">
                <div className="map-placeholder">Map Placeholder</div>
            </div>
        </div>
    );
};

Step4Container.propTypes = {
    appliances: PropTypes.array.isRequired,
    userInformation: PropTypes.object.isRequired,
};

export default Step4Container;
