import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Menu from './Menu';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="navbar">
                <ul className="brand">
                    <li><Link to="/">EnergiseSmart</Link></li>
                </ul>
                <ul className={`nav-items ${isMenuOpen ? 'hidden' : ''}`}>
                    <li><Link to="/">Home</Link></li>

                    <li><Link to="#" onClick={toggleMenu}>Menu</Link></li>
                </ul>
            </nav>
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}

export default Navbar;