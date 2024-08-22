import React, { useState } from 'react';
import './uploadpage.css'; // Import CSS for styling the page

const Upload = () => {
    const [currentStep, setCurrentStep] = useState(1);

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
        </div>
    );
};

export default Upload;
