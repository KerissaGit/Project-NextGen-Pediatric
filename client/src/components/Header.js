import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className='header'>
            <h1>NextGen Pediatrics</h1>
            <nav className="nav">
                <ul className="nav-links">
                    <li>
                        <NavLink 
                            to="/" 
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/portal" 
                        >
                            Patient Portal
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/doctors" 
                        >
                            Doctors
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/appointments" 
                        >
                            Appointments
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
