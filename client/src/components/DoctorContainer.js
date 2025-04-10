import React, { useEffect, useState } from "react";

import DoctorCard from "./DoctorCards";



function DoctorContainer(){
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        // THE LOCAL HOST PAGE NEEDS TO BE UPDATED HERE
        fetch("http://localhost:3000/doctors")
        .then((resp) => resp.json())
        .then((allDoctors) => setDoctors(allDoctors))
    }, [])

    const renderDoctors = doctors.map(({id, name, reasonVisit}) => 
        (<DoctorCard 
            key={id}
            name={name}
            reasonVisit={reasonVisit}
        />))

    return(
        <main>
            <ul className='doctor-list'>
                { renderDoctors }
            </ul>

        </main>
    )
}

export default DoctorContainer;