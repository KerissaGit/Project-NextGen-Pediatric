import React, { useEffect, useState } from "react";

import DoctorCard from "./DoctorCards";



function DoctorContainer(){
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        // THE LOCOAL HOST PAGE NEEDS TO BE UPDATED HERE
        fetch("http://localhost:3000/doctors")
        .then((resp) => resp.json())
        .then((allDoctors) => setDoctors(allDoctors))
    }, [])

    const renderDoctors = doctors.map(({id, name, specialty, ageOfCare}) => 
        (<DoctorCard 
            key={id}
            name={name}
            specialty={specialty}
            ageOfCare={ageOfCare}
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