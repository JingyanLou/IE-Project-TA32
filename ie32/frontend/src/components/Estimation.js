import React from 'react';
import './Estimation.css';

const Estimation = () => {
    return (
        <div className="section-two">
            <div className="image-section"></div>
            <div className="info-section">
                <div className="content">
                    <h1>Identify Your Home’s Energy Consumption</h1>
                    <div className="stats">
                        <div className="stat-item">
                            <h2>Average Home Consumption</h2>
                            <p>3000Kwh/M</p>
                        </div>
                        <div className="stat-item">
                            <h2>Average Bill Cost</h2>
                            <p>$542.27/M</p>
                        </div>
                    </div>
                    <p className="description">Upload images of your home to discover which appliances are driving up your energy bills. Our advanced image detection tool will analyze your energy consumption and provide tailored tips to help you save.</p>

                </div>
            </div>
        </div>
    );
}

export default Estimation;
