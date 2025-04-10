import React, { useState } from "react";


function Doctors({ id, name, reasonVisit}) {

    return(
        <li className='doctor-card'>
            <div>
                <h4> Doctors name: {name} </h4>
                <p> Short Bio </p>
            </div>
            {/* Here is where the star rating can be place for each doctors car profile */}
        </li>
    )
}


export default Doctors;
