import React, { useState } from "react";


function DoctorCards({ id, name, specialty, education, year_experience, reviews, reasonVisit}) {
    const [viewDoctor, setViewDoctor] = useState(false);

    const avgRating = reviews && reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "No reviews yet.";

    return(
        <ul className='doctor-card'>
            <div>
                <h4> Doctors name: {name} </h4>
                <p> I Specialize in: {specialty}</p>
                <p> Education: {education}</p>
                <p> Years of Experience: {year_experience}</p>
                <p> Review Average: {avgRating} ⭐️</p>
            </div>
            {/* Here is where the star rating/reviews can be place for each doctors car profile */}
        </ul>
    )
}


export default DoctorCards;
