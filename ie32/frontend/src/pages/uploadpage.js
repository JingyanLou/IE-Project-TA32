import React, { useState } from 'react';
import './uploadpage.css'; // Import CSS for styling the page

const Upload = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [appliances, setAppliances] = useState([]);
    const [formInput, setFormInput] = useState({
        brand: '',
        applianceType: '',
        usageFrequency: '',
        energyRating: '',
        modelName: ''
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
        setFormInput({ ...formInput, [name]: value });
    };

    const handleAddAppliance = () => {
        setAppliances([...appliances, formInput]);
        setFormInput({
            brand: '',
            applianceType: '',
            usageFrequency: '',
            energyRating: '',
            modelName: ''
        });
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
                            <label>Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formInput.brand}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Appliance type</label>
                            <input
                                type="text"
                                name="applianceType"
                                value={formInput.applianceType}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Usage Frequency</label>
                            <input
                                type="text"
                                name="usageFrequency"
                                value={formInput.usageFrequency}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Energy Rating</label>
                            <input
                                type="text"
                                name="energyRating"
                                value={formInput.energyRating}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Model name (optional)</label>
                            <input
                                type="text"
                                name="modelName"
                                value={formInput.modelName}
                                onChange={handleInputChange}
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
                                    <div>Brand: {appliance.brand}</div>
                                    <div>Type: {appliance.applianceType}</div>
                                    <div>Usage: {appliance.usageFrequency}</div>
                                    <div>Rating: {appliance.energyRating}</div>
                                    <div>Model: {appliance.modelName || 'None'}</div>
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
