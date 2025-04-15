import React from "react";
import { NavLink } from "react-router-dom";


function Header() {
    return(
        <header className='header'>
            <h1>
                NextGen Pediatrics
            </h1>
            {/* <div> */}
                {/* Navlinks go here */}
                {/* <h2>Home Page</h2> */}
                {/* Navlinks go here */}
                {/* <h2>Patient Portal</h2> */}
                {/* Navlinks go here */}
                {/* <h2>Doctors</h2>
            </div> */}
            {/* <nav className="nav-links">
                <NavLink to="/" className="nav-link">
                Home Page
                </NavLink>
                <NavLink to="/portal" className="nav-link">
                Patient Portal
                </NavLink>
                <NavLink to="/doctors" className="nav-link">
                Doctors
                </NavLink>
            </nav> */}
        </header>
    )
}

export default Header;