import React, { useEffect, useState } from "react";
import DoctorCards from "./DoctorCards";
import ReviewForm from "./ReviewForm";



function DoctorContainer(){
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // THE LOCAL HOST PAGE NEEDS TO BE UPDATED HERE
        fetch("http://localhost:5000/doctors")
        .then((resp) => resp.json())
        .then((data) => {setDoctors(data); setLoading(false);})
        .catch(error => {console.error("Error fetching in DoctorContainer.", error); setLoading(false);})
    }, [setDoctors])

    const renderDoctors = doctors.map(({id, name, specialty, education, year_experience, reviews, reasonVisit}) => 
        (<DoctorCards
            key={id}
            name={name}
            specialty={specialty}
            education={education}
            year_experience={year_experience}
            reviews={reviews}
            // reasonVisit={reasonVisit}
        />))

    return(
        <div>
            <h2> Doctors List </h2>
            <ul className="doctor-list">
                {loading ? (
                    <p>Loading doctors...</p>
                ) : doctors.length > 0 ? (
                    renderDoctors
                ) : (
                <p>Loading or Doctors are currently available. 🙁</p>
                )}
             </ul>
             <br />
             <ReviewForm />

        </div>
    )
}

export default DoctorContainer;