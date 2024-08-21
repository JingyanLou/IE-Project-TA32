import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="brand">
                <li><span>EnergiseSmart</span></li> {/* Replaced <a> with <span> */}
            </ul>
            <ul className="nav-items">
                <li><a href="/energy-analysis">Home</a></li>
                <li><a href="/insights">Placeholder</a></li>
                <li><a href="/cost-saving">Placeholder</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
