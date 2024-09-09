import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar">
            <ul className="brand">
                <li><Link to="/">EnergiseSmart</Link></li>
            </ul>
            <ul className="nav-items">
                <li><Link to="/">Home</Link></li>
                <li
                    className={`dropdown ${isDropdownOpen ? 'active' : ''}`}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                >
                    <span onClick={toggleDropdown}>Features</span>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li><Link to="/estimation-introduction">Estimation</Link></li>
                            <li><Link to="/selection">Energy Saving Tips</Link></li>
                        </ul>
                    )}
                </li>
                <li><Link to="/">About us</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;