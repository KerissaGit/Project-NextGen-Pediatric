import React, { useEffect, useState } from "react";
import DoctorCards from "./DoctorCards";
// import { useOutletContext } from "react-router-dom";



function DoctorContainer(){
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        // THE LOCAL HOST PAGE NEEDS TO BE UPDATED HERE
        fetch("http://localhost:5000/doctors")
        .then((resp) => resp.json())
        .then((data) => setDoctors(data))
        .catch(error => console.error("Error fetching in DoctorContainer.", error))
    }, [setDoctors])

    const renderDoctors = doctors.map(({id, name, reasonVisit}) => 
        (<DoctorCards
            key={id}
            name={name}
            reasonVisit={reasonVisit}
        />))

    return(
        <div>
            <h2> Doctors List </h2>
            <ul className="doctor-list">
                {Array.isArray(doctors) && doctors.length > 0 ? (
                    doctors.map(({ id, name }) => (
                    <DoctorCards key={id} name={name} />
                    ))
                ) : (
                <p>Loading or no doctors available...</p>
            )}
             </ul>

        </div>
    )
}

export default DoctorContainer;