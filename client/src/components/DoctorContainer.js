import React, { useEffect, useState } from "react";
import DoctorCards from "./DoctorCards";
import ReviewForm from "./ReviewForm";



function DoctorContainer(){
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    //This code works without refreshing doctor reviews*
    // useEffect(() => {
    //   fetch("http://localhost:5555/doctors")
    //     .then((resp) => resp.json())
    //     .then((data) => {setDoctors(data); setLoading(false);})
    //     .catch(error => {console.error("Error fetching in DoctorContainer.", error); setLoading(false);})
    // }, [setDoctors])


    //This code is to work through the doctor reviews and add them as it is submitted actively.
    const fetchDoctors = () => {
      fetch("http://localhost:5555/doctors")
        .then((resp) => resp.json())
        .then((data) => {
          setDoctors(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching in DoctorContainer.", error);
          setLoading(false);
        });
    };
  
    useEffect(fetchDoctors, []);


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
      <ReviewForm  onReviewSubmit={fetchDoctors} />
    </div>
  );
}

export default DoctorContainer;