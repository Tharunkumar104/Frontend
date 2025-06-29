import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">Integrated Coding</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/skills">Skills</Link>
                <Link to="/progress">Progress</Link>
                <Link to="/problems">Problems</Link>
                <Link to="/contest">Contact</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
                <Link to="/profile">Profile</Link>

            </div>
        </nav>
    );
}
export default Navbar;
