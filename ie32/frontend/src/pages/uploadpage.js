import React, { useState } from 'react';
import './uploadpage.css';
import { applianceData } from '../utils/data';
import Step1Container from '../components/Step1Container';
import Step2Container from '../components/Step2Container';
import Step3Container from '../components/Step3Container';
import Step4Container from '../components/Step4Container';

const Upload = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState({
        'Appliances-list': [], // Initially, the appliance list is an empty array
        'User information': [], // Initially, the user information is an empty array
    });

    const [formInput, setFormInput] = useState({
        applianceType: applianceData[0].type,
        dailyHours: applianceData[0].dailyHours || 10,
        quantity: 1,
        userLocation: '',
        energyProvider: '',
        household: 1,
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
            const selectedAppliance = applianceData.find(
                appliance => appliance.type === value
            );
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
        const selectedAppliance = applianceData.find(appliance => appliance.type === formInput.applianceType);
        const newAppliance = [
            formInput.applianceType,
            formInput.quantity,
            formInput.dailyHours
        ];

        // Update the appliances list in the data object
        setData(prevData => ({
            ...prevData,
            'Appliances-list': [...prevData['Appliances-list'], newAppliance]
        }));

        setFormInput({
            applianceType: applianceData[0].type,
            dailyHours: applianceData[0].dailyHours || 10,
            quantity: 1
        });
    };

    const handleDeleteAppliance = (indexToDelete) => {
        // Update the appliances list in the data object
        setData(prevData => ({
            ...prevData,
            'Appliances-list': prevData['Appliances-list'].filter((_, index) => index !== indexToDelete)
        }));
    };

    const handleUserInformation = () => {
        // Add user information to the data object
        setData(prevData => ({
            ...prevData,
            'User information': [
                formInput.userLocation,
                formInput.energyProvider,
                formInput.household
            ]
        }));

        handleNextStep(); // Move to the next step after setting the user information
    };

    return (
        <div className="upload-page">
            <div className="progress-bar-container">
                <div className="nav-arrow-container">
                    <button
                        className="nav-arrow left-arrow"
                        onClick={handlePrevStep}
                        disabled={currentStep === 1}
                    >
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
                    <button
                        className="nav-arrow right-arrow"
                        onClick={handleNextStep}
                        disabled={currentStep === 4}
                    >
                        <span>&rarr;</span>
                    </button>
                </div>
            </div>

            {currentStep === 1 && (
                <Step1Container
                    appliances={data['Appliances-list']}
                    formInput={formInput}
                    handleInputChange={handleInputChange}
                    handleAddAppliance={handleAddAppliance}
                    handleDeleteAppliance={handleDeleteAppliance}
                />
            )}

            {currentStep === 2 && <Step2Container appliances={data['Appliances-list']} />}

            {currentStep === 3 && (
                <Step3Container
                    formInput={formInput}
                    handleInputChange={handleInputChange}
                    handleNextStep={handleUserInformation} // Pass handleUserInformation to move to Step 4 with updated data
                />
            )}

            {currentStep === 4 && (
                <Step4Container
                    data={data} // Pass the entire data object containing both appliances list and user information
                />
            )}
        </div>
    );
};

export default Upload;
