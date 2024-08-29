import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation to Home page
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="brand">
                <li><span>EnergiseSmart</span></li> {/* Brand or title of the website */}
            </ul>
            <ul className="nav-items">
                {/* Link to the homepage */}
                <li><Link to="/">Home</Link></li>

                {/* Placeholder links with no actual navigation */}

            </ul>
        </nav>
    );
}

export default Navbar;
