import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="brand">
                <li><a href="/">Bytebusters</a></li>
            </ul>
            <ul className="nav-items">
                <li><a href="/energy-analysis">Energy Analysis</a></li>
                <li><a href="/insights">Insights</a></li>
                <li><a href="/cost-saving">Cost-saving</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
