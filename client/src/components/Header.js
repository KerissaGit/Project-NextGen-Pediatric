import React from "react";
// import { NavLink } from "react-router-dom";

function Header() {
    return(
        <header className='header'>
            <h1>
                NextGen Pediatrics
            </h1>
            <div>
                {/* Navlinks go here */}
                <h2>Home Page</h2>
                {/* Navlinks go here */}
                <h2>Patient Portal</h2>
                {/* Navlinks go here */}
                <h2>Doctors</h2>
            </div>
        </header>
    )
}

export default Header;