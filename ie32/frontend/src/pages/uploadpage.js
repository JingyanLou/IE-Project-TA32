import React, { useState } from 'react';
import './uploadpage.css';
import { applianceData } from '../utils/data';
import Step1Container from '../components/Step1Container';
import Step2Container from '../components/Step2Container';
import Step3Container from '../components/Step3Container';
import Step4Container from '../components/Step4Container';

const Upload = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [appliances, setAppliances] = useState([]);
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
        setAppliances([...appliances, { ...formInput, energyConsumption: selectedAppliance.energyConsumption }]);
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
                    appliances={appliances}
                    formInput={formInput}
                    handleInputChange={handleInputChange}
                    handleAddAppliance={handleAddAppliance}
                    handleDeleteAppliance={handleDeleteAppliance}
                />
            )}

            {currentStep === 2 && <Step2Container appliances={appliances} />}

            {currentStep === 3 && (
                <Step3Container
                    formInput={formInput}
                    handleInputChange={handleInputChange}
                    handleNextStep={handleNextStep} // Pass handleNextStep to Step3Container
                />
            )}

            {currentStep === 4 && (
                <Step4Container
                    appliances={appliances}
                    userInformation={formInput} // Pass the entire formInput for user info
                />
            )}
        </div>
    );
};

export default Upload;
