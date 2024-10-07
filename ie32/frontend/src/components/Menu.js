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
                    <ul>
                        <li><Link to="/" onClick={onClose}>Home</Link></li>
                    </ul>
                </div>


                <div className="menu-section">
                    <h2>Estimate Your home electricity bill</h2>
                    <ul>
                        <li><Link to="/estimation-introduction" onClick={onClose}>Estimation user guide</Link></li>
                        <li><Link to="/upload" onClick={onClose}>Start now</Link></li>

                    </ul>
                </div>

                <div className="menu-section">
                    <h2>Explore more on home electricity saving tips</h2>
                    <ul>
                        <li><Link to="/selection" onClick={onClose}>Saving tips user guide</Link></li>
                        <li><Link to="/buynew" onClick={onClose}>Replace your appliances</Link></li>
                        <li><Link to="/recommendations" onClick={onClose}>Appliances saving tips (3D room tour)</Link></li>
                        <li><Link to="/governmentinfo" onClick={onClose}>Government programs</Link></li>

                    </ul>
                </div>

                <div className="menu-section">
                    <h2>Discover historical energy insights</h2>
                    <ul>
                        <li><Link to="/insight" onClick={onClose}>Discover now</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;