import React from 'react';
import PropTypes from 'prop-types';
import './step3container.css';

const Step3Container = ({ formInput, handleInputChange }) => {
    const energyProviders = ['Provider A', 'Provider B', 'Provider C']; // Example providers

    return (
        <div className="step3-container">
            <h2 className="form-title-step3">Enter your information</h2>
            <div className="form-container-step3">
                <div className="form-group-step3">
                    <label className="form-label-step3">User Location</label>
                    <input
                        type="text"
                        name="userLocation"
                        value={formInput.userLocation || ''}
                        onChange={handleInputChange}
                        className="form-input-step3"
                    />
                </div>
                <div className="form-group-step3">
                    <label className="form-label-step3">Energy Provider</label>
                    <select
                        name="energyProvider"
                        value={formInput.energyProvider || ''}
                        onChange={handleInputChange}
                        className="form-input-step3"
                    >
                        {energyProviders.map((provider, index) => (
                            <option key={index} value={provider}>
                                {provider}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group-step3">
                    <label className="form-label-step3">Household</label>
                    <input
                        type="number"
                        name="household"
                        value={formInput.household || ''}
                        onChange={handleInputChange}
                        min="1"
                        className="form-input-step3"
                    />
                </div>
                <button className="estimate-button-step3">Estimate Now</button>
            </div>
        </div>
    );
};

Step3Container.propTypes = {
    formInput: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

export default Step3Container;
