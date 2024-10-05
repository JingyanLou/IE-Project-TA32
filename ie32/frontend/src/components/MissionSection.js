import React from 'react';
import './missionsection.css';

const MissionSection = () => {
    return (
        <div className="mission-section">
            <div className="mission-content-wrapper">
                <div className="images-container">
                    <img src="images/melbourne1.jpg" alt="Melbourne cityscape 1" className="melbourne-image melbourne1" />
                    <img src="images/melbourne2.jpg" alt="Melbourne cityscape 2" className="melbourne-image melbourne2" />
                </div>
                <div className="mission-content">
                    <h2 className="mission-heading">Our mission is to contribute to the development of resilient, inclusive cities that promote sustainability and enhance the well-being of all residents. We are dedicated to fostering communities where people can thrive, with a focus on environmental responsibility and long-term urban sustainability.</h2>
                </div>
            </div>
            <h2 className="problems-heading">Current Problems</h2>
            <div className="problems-grid">
                <div className="problem">
                    <div className="problem-underscore"></div>
                    <h3 className="problem-title">Energy Poverty</h3>
                    <p className="problem-description">28% of Australians are struggling to pay their energy bills, with 37% expecting further difficulties.</p>
                </div>
                <div className="problem">
                    <div className="problem-underscore"></div>
                    <h3 className="problem-title">Rising Electricity Costs</h3>
                    <p className="problem-description">Increasing energy prices are forcing middle-income residents to make sacrifices, like reducing heating and cutting back on essentials.</p>
                </div>
                <div className="problem">
                    <div className="problem-underscore"></div>
                    <h3 className="problem-title">Unsustainable Consumption</h3>
                    <p className="problem-description">Current energy usage is not sustainable, leading to higher costs and environmental impact.</p>
                </div>
                <div className="problem">
                    <div className="problem-underscore"></div>
                    <h3 className="problem-title">Central Challenge</h3>
                    <p className="problem-description">How can middle-to-low-income residents of Melbourne reduce their energy bills while making their energy consumption more efficient and sustainable?</p>
                </div>
            </div>
        </div>
    );
};

export default MissionSection;