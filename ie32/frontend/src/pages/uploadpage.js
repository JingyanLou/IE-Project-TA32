import React, { useState } from 'react';
import './uploadpage.css'; // Import CSS for styling the page

const Upload = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [appliances, setAppliances] = useState([]);
    const [formInput, setFormInput] = useState({
        applianceType: 'Refrigerator',
        dailyHours: 10,
        quantity: 1
    });

    const applianceOptions = ['Refrigerator', 'Washing Machine', 'Television', 'Air Conditioner'];

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
        setFormInput({ ...formInput, [name]: value });
    };

    const handleAddAppliance = () => {
        setAppliances([...appliances, formInput]);
        setFormInput({
            applianceType: 'Refrigerator',
            dailyHours: 10,
            quantity: 1
        });
    };

    return (
        <div className="upload-page">
            {/* Background images */}

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
                                {applianceOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
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
