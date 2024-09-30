import React from 'react';
import './estimationversion2.css';

const EstimationVersion2 = () => {
    return (
        <div className="estimation-container-v2">
            <div className="content-wrapper-v2">
                <h1 className="title-v2">Identify Your Home's Energy Consumption</h1>
                <div className="stats-container-v2">
                    <div className="stat-item-v2">
                        <h2 className="stat-value-v2">$1290/Year</h2>
                        <p className="stat-label-v2">Average Electricity Bill</p>
                    </div>
                    <div className="stat-item-v2">
                        <h2 className="stat-value-v2">18.71kWh/Day</h2>
                        <p className="stat-label-v2">Average Energy Usage</p>
                    </div>
                </div>
                <p className="description-v2">
                    Upload details about your appliances to identify which ones
                    drive up your energy bill. Receive a personalized estimate for
                    your household, compare your usage with benchmarks, and
                    see how it measures up against neighbouring homes.
                </p>
                <button className="estimate-button-v2">Estimate now</button>
                <div className="image-section-v2">
                    <div className="image-container-v2">
                        <img src="/images/product.jpg" alt="Energy consumption dashboard" className="product-image-v2" />
                        <div className="image-layer-v2 layer-1-v2"></div>
                        <div className="image-layer-v2 layer-2-v2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstimationVersion2;