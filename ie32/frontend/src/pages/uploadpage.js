import React, { useState } from 'react';
import './uploadpage.css'; // Import CSS for styling the page
import { applianceData } from '../utils/data'; // Import the appliance data

const Upload = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [appliances, setAppliances] = useState([]);
    const [formInput, setFormInput] = useState({
        applianceType: applianceData[0].type,
        dailyHours: applianceData[0].dailyHours || 10, // Default daily hours
        quantity: 1
    });

    const handleNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'applianceType') {
            const selectedAppliance = applianceData.find(appliance => appliance.type === value);
            setFormInput({
                ...formInput,
                applianceType: value,
                dailyHours: selectedAppliance?.dailyHours || 10,
            });
        } else {
            setFormInput({
                ...formInput,
                [name]: value
            });
        }
    };

    const handleAddAppliance = () => {
        setAppliances([...appliances, formInput]);
        setFormInput({
            applianceType: applianceData[0].type,
            dailyHours: applianceData[0].dailyHours || 10,
            quantity: 1
        });
    };

    const handleDeleteAppliance = (indexToDelete) => {
        setAppliances(appliances.filter((_, index) => index !== indexToDelete));
    };

    return (
        <div className="upload-page">
            {/* Background images */}
            <div className="background-image one"></div>
            <div className="background-image two"></div>
            <div className="background-image three"></div>

            <div className="progress-bar-container">
                <div className="nav-arrow-container">
                    <button className="nav-arrow left-arrow" onClick={handlePrevStep}>
                        <span>&larr;</span>
                    </button>
                </div>
                <div className="progress-bar">
                    <div className="step">
                        <div className={`circle ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                        <div className="step-label">Fill in appliance details</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                        <div className="step-label">Appliance Consumption List</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                        <div className="step-label">Fill in home energy details</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 4 ? 'active' : ''}`}>4</div>
                        <div className="step-label">See your customized insights</div>
                    </div>
                </div>
                <div className="nav-arrow-container">
                    <button className="nav-arrow right-arrow" onClick={handleNextStep}>
                        <span>&rarr;</span>
                    </button>
                </div>
            </div>

            {/* Only show the form and appliance display in step 1 */}
            {currentStep === 1 && (
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

                    <h2 className="appliance-title">Your Appliance</h2>
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
            )}
        </div>
    );
};

export default Upload;
