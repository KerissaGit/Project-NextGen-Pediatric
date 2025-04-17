import React, { useState, useEffect } from 'react';

function ReviewForm({ onReviewSubmit }) {
    const [doctors, setDoctors]= useState([]);
    
    const [formData, setFormData] = useState({
        doctor_id: "",
        rating: "",
        comment: "",
    });

 
    const fetchDoctors = () => {
        fetch("http://localhost:5555/doctors")
        .then((resp) => resp.json())
        .then(setDoctors)
        .catch((error) => console.error("Error loading Doctors review form.", error));
    };
    
    useEffect(fetchDoctors, []);

    //Testing 
    // useEffect(() => {
    //     fetch("http://localhost:5555/doctors")
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             console.log("Fetched doctors:", data);
    //             setDoctors(data);
    //         })
    //         .catch((error) => console.error("Error loading Doctors review form.", error));
    // }, []);
    

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = {...formData,  doctor_id: parseInt(formData.doctor_id), rating: parseInt(formData.rating), }
        fetch("http://localhost:5555/reviews", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data), 
           
        })
        .then((resp) => resp.json())
        .then(() => {
            setFormData({
                doctor_id: "",
                rating: "",
                comment: ""
            });
            if (onReviewSubmit) onReviewSubmit();
        })
        .catch((error) => console.error("Error submitting review.", error));
    }

    return (
        <div className="main-container">
            <form className="review-form" onSubmit={handleSubmit}>
                <h3>Leave a Review</h3>
                <label>Select Doctor:</label>
                <select name='doctor_id' value={formData.doctor_id} onChange={handleChange} required>
                    <option value=''>Choose Doctor</option>
                    {doctors.map((doctor) =>
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>)}
                </select>
                <br />
                <label>Rate your Doctor (1-5):</label>
                <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} required />
                <br />
                <label>Leave a Comment:</label>
                <br />
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write your review here."
                    required
                />
                <br />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    )
}


export default ReviewForm;