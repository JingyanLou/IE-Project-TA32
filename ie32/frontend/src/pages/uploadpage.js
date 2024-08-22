import React from 'react';
import './uploadpage.css'; // Import CSS for styling the page

const Upload = () => {
    return (
        <div className="upload-page">
            <div className="progress-bar-container">
                <button className="nav-arrow left-arrow">&larr;</button>
                <div className="progress-bar">
                    <div className="step active">1. Fill in appliance details</div>
                    <div className="step">2. Appliance Consumption List</div>
                    <div className="step">3. Fill in home energy details</div>
                    <div className="step">4. See your customized insights</div>
                </div>
                <button className="nav-arrow right-arrow">&rarr;</button>
            </div>
            {/* Further content will go here */}
        </div>
    );
};

export default Upload;