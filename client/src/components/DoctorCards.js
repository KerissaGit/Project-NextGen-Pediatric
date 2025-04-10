import React, { useState } from "react";


function DoctorCards({ id, name, reasonVisit}) {
    const [viewDoctor, setViewDoctor] = useState(false);

    

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


export default DoctorCards;
