import React, { useEffect, useState } from "react";
import DoctorCards from "./DoctorCards";
import ReviewForm from "./ReviewForm";



function DoctorContainer(){
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5555/doctors")
        .then((resp) => resp.json())
        .then((data) => {setDoctors(data); setLoading(false);})
        .catch(error => {console.error("Error fetching in DoctorContainer.", error); setLoading(false);})
    }, [setDoctors])

    // const renderDoctors = doctors.map(({id, name, specialty, education, year_experience, reviews, reasonVisit}) => 
    //     (<DoctorCards
    //         key={id}
    //         name={name}
    //         specialty={specialty}
    //         education={education}
    //         year_experience={year_experience}
    //         reviews={reviews}
    //         // reasonVisit={reasonVisit}
    //     />))


return (
    <div className="main-container doctor-page">
      <h2>Doctors List</h2>
      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length > 0 ? (
        <ul className="doctor-list">
          {doctors.map((doc) => (
            <DoctorCards
              key={doc.id}
              name={doc.name}
              specialty={doc.specialty}
              education={doc.education}
              year_experience={doc.years_experience}
              reviews={doc.reviews}
            />
          ))}
        </ul>
      ) : (
        <p>No doctors currently available. 🙁</p>
      )}
      <br />
      <ReviewForm />
    </div>
  );
}

export default DoctorContainer;