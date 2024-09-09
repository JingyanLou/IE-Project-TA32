import React, { useState, useRef } from 'react';
import './buynew.css';

const BuyNew = () => {
    const [selectedAppliance, setSelectedAppliance] = useState('Air Conditioner');
    const [selectedApplianceImage, setSelectedApplianceImage] = useState('/images/aircondition.png');
    const brands = ['Sony', 'AGL', 'STK', 'HX', 'Hisense', 'Newbie', 'Dafuq'];
    const appliances = [
        { name: 'Air Conditioner', image: 'aircondition.png' },
        { name: 'Cloth Dryer', image: 'clothdryer.png' },
        { name: 'Dishwasher', image: 'dishwasher.png' },
        { name: 'Electric Light', image: 'electriclight.png' },
        { name: 'Florescent Lamp', image: 'florescentlamp.png' },
        { name: 'Heater', image: 'heater.png' },
        { name: 'Lamp', image: 'lamp.png' }
    ];

    const applianceCardsRef = useRef(null);
    const [imageOpacity, setImageOpacity] = useState(1);


    const highlightText = (text) => {
        return text.split(' ').map((word, index) =>
            word.toLowerCase() === 'lowest' || word.toLowerCase() === 'highest' ?
                <span key={index} className="highlight">{word}</span> :
                word + ' '
        );
    };

    const handleMouseDown = (e) => {
        const slider = applianceCardsRef.current;
        let startX = e.pageX - slider.offsetLeft;
        let scrollLeft = slider.scrollLeft;

        const handleMouseMove = (e) => {
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleApplianceSelect = (appliance) => {
        setImageOpacity(0);
        setTimeout(() => {
            setSelectedAppliance(appliance.name);
            setSelectedApplianceImage(`/images/${appliance.image}`);
            setImageOpacity(1);
        }, 300);
    };



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
                <img
                    className="appliance-image"
                    src={selectedApplianceImage}
                    alt="Selected Appliance"
                    style={{ opacity: imageOpacity }}
                />
            </section>

            <div
                className="appliance-cards"
                ref={applianceCardsRef}
                onMouseDown={handleMouseDown}
            >
                {appliances.map((appliance, index) => (
                    <div
                        key={index}
                        className="appliance-card"
                        onClick={() => handleApplianceSelect(appliance)}
                    >
                        <img src={`/images/${appliance.image}`} alt={appliance.name} />
                    </div>
                ))}
            </div>

            <section className="brand-comparison">
                <div className="brand-comparison-text">
                    <h3>{highlightText("Compare annual energy consumption across brands for your selected appliance from the lowest  to highest")}</h3>
                    <p>Your Selected Appliances: {selectedAppliance}</p>
                </div>
                <div className="energy-chart">
                    {brands.map((brand, index) => {
                        const height = Math.random() * 80 + 20;
                        const lowestConsumption = Math.floor(height * 10);
                        const highestConsumption = Math.floor(height * 15);
                        return (
                            <div key={index} className="chart-bar" style={{ height: `${height}%` }}>
                                <span>{brand}</span>
                                <div className="tooltip">
                                    Lowest: {lowestConsumption} kWh<br />
                                    Highest: {highestConsumption} kWh
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <div className="brand-selection">
                {[...Array(11)].map((_, index) => (
                    <button key={index} className="brand-button">Brand</button>
                ))}
            </div>

            <section className="model-suggestion">
                <h3>Top pick for your selected appliances</h3>
                <div className="model-list">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="model-item">
                            <span>Brand Model Name</span>
                            <span>3.75 Stars</span>
                            <button className="buy-now">Buy Now</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BuyNew;