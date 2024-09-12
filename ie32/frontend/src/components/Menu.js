import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

const Menu = ({ isOpen, onClose }) => {

    if (!isOpen) return null;


    return (
        <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
            <div className="menu-content">
                <button className="close-button" onClick={onClose}>×</button>
                <div className="menu-section">
                    <h2>Estimate your home electricity bill</h2>
                    <ul>
                        <li><Link to="/start-now" onClick={onClose}>Start now</Link></li>
                        <li><Link to="/estimation-guide" onClick={onClose}>Estimation user guide</Link></li>
                    </ul>
                </div>
                <div className="menu-section">
                    <h2>Explore more on home electricity saving tips</h2>
                    <ul>
                        <li><Link to="/replace-appliances" onClick={onClose}>Replace your appliances</Link></li>
                        <li><Link to="/saving-tips" onClick={onClose}>Appliances saving tips</Link></li>
                        <li><Link to="/government-programs" onClick={onClose}>Government programs</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;