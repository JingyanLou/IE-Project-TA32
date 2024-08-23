import React from 'react';
import './step1container.css'; // Import CSS for styling
import PropTypes from 'prop-types';

const Step1Container = ({
    applianceData,
    formInput,
    appliances,
    handleInputChange,
    handleAddAppliance,
    handleDeleteAppliance
}) => {
    return (
        <div className="step1-container">
            <h2 className="form-title">Manually fill-in</h2>
            <div className="form-container">
                <div className="form-group">
                    <label>Appliance Type</label>
                    <select
                        name="applianceType"
                        value={formInput.applianceType}
                        onChange={handleInputChange}
                    >
                        {applianceData.map((appliance, index) => (
                            <option key={index} value={appliance.type}>
                                {appliance.type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Daily Hours</label>
                    <input
                        type="number"
                        name="dailyHours"
                        value={formInput.dailyHours}
                        onChange={handleInputChange}
                        min="1"
                        max="24"
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formInput.quantity}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                    />
                </div>
                <button className="add-appliance-button" onClick={handleAddAppliance}>
                    Add Appliance
                </button>
            </div>

            <h2 className="appliance-title">Your Appliances</h2>
            <div className="appliance-display">
                <ul>
                    {appliances.map((appliance, index) => (
                        <li key={index}>
                            <div>Appliance Type: {appliance.applianceType}</div>
                            <div>Quantity: {appliance.quantity}</div>
                            <div>Daily Hours: {appliance.dailyHours}</div>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteAppliance(index)}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// PropTypes for type checking and better maintenance
Step1Container.propTypes = {
    applianceData: PropTypes.array.isRequired,
    formInput: PropTypes.object.isRequired,
    appliances: PropTypes.array.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleAddAppliance: PropTypes.func.isRequired,
    handleDeleteAppliance: PropTypes.func.isRequired,
};

export default Step1Container;
