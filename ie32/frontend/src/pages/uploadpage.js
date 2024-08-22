import React from 'react';
import './uploadpage.css'; // Import CSS for styling the page

const Upload = () => {
    return (
        <div className="upload-page">
            <div className="progress-bar-container">
                <div className="nav-arrow-container">
                    <button className="nav-arrow left-arrow">
                        <span>&larr;</span>
                    </button>
                </div>
                <div className="progress-bar">
                    <div className="step">
                        <div className="circle active">1</div>
                        <div className="step-label">Fill in appliance details</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className="circle">2</div>
                        <div className="step-label">Appliance Consumption List</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className="circle">3</div>
                        <div className="step-label">Fill in home energy details</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className="circle">4</div>
                        <div className="step-label">See your customized insights</div>
                    </div>
                </div>
                <div className="nav-arrow-container">
                    <button className="nav-arrow right-arrow">
                        <span>&rarr;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
