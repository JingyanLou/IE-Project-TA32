import React, { useState } from 'react';
import './buynew.css';

const BuyNew = () => {
    const [selectedAppliance, setSelectedAppliance] = useState('Air Conditioner');
    const brands = ['Sony', 'AGL', 'STK', 'HX', 'Hisense', 'Newbie', 'Dafuq'];
    const appliances = ['aircondition', 'clothdryer', 'dishwasher', 'electriclight', 'florescentlamp', 'heater', 'lamp'];

    return (
        <div className="buy-new-container">
            <section className="appliance-selection">
                <div className="appliance-details">
                    <h2>Select the appliances that you are interested to replace</h2>
                    <div className="appliance-details-bottom">
                        <h3>{selectedAppliance}</h3>
                        <p>9 Different Brand Options Available</p>
                        <p>25 Different Model Options Available</p>
                    </div>
                </div>
                <img className="appliance-image" src="/images/aircondition.png" alt="Selected Appliance" />
            </section>

            <div className="appliance-cards">
                {appliances.map((appliance, index) => (
                    <div key={index} className="appliance-card">
                        <img src={`/images/${appliance}.png`} alt={appliance} />
                    </div>
                ))}
            </div>

            <section className="brand-comparison">
                <div className="brand-comparison-text">
                    <h3>Compare annual energy consumption across brands for your selected appliance from the lowest to highest</h3>
                    <p>Your Selected Appliances: {selectedAppliance}</p>
                </div>
                <div className="energy-chart">
                    {brands.map((brand, index) => (
                        <div key={index} className="chart-bar" style={{ height: `${Math.random() * 80 + 20}%` }}>
                            <span>{brand}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="brand-selection">
                {[...Array(11)].map((_, index) => (
                    <button key={index} className="brand-button">Brand</button>
                ))}
            </div>

            <section className="model-suggestion">
                <h3>Top pick for your selected appliances</h3>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="model-item">
                        <span>Brand Model Name</span>
                        <span>3.75 Stars</span>
                        <button className="buy-now">Buy Now</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default BuyNew;