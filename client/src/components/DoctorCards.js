import React from "react";


function DoctorCards({ name, specialty, education, years_experience, reviews }) {

    const avgRating = reviews && reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "No reviews yet.";

    return(
        <ul className='doctor-card'>
            <div>
                <h4> Doctor: {name} </h4>
                <p> I Specialize in: {specialty}</p>
                <p> Education: {education}</p>
                <p> Years of Experience: {years_experience}</p>
                <p> Review Average: {avgRating} ⭐️</p>
            </div>
        </ul>
    )
}


export default DoctorCards;
