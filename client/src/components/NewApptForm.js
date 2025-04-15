import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function NewApptForm() {
  const { parents, doctors, setAppointments } = useOutletContext();

  const [formData, setFormData] = useState({
    child_id: "",
    doctor_id: "",
    start_time: "",
    end_time: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { child_id, doctor_id, start_time, end_time } = formData;
    if (!child_id || !doctor_id || !start_time || !end_time) {
      alert("Please fill out all fields.");
      return;
    }

    fetch("http://localhost:5555/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create appointment.");
        return res.json();
      })
      .then(newAppt => {
        alert("Appointment created!");
        setAppointments(prev => [...prev, newAppt]);
        setFormData({
          child_id: "",
          doctor_id: "",
          start_time: "",
          end_time: ""
        });
      })
      .catch(err => console.error("Error:", err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Appointment</h3>

      <select name="child_id" value={formData.child_id} onChange={handleChange}>
        <option value="">Select Patient</option>
        {parents.map(child => (
          <option key={child.id} value={child.id}>{child.name}</option>
        ))}
      </select>

      <select name="doctor_id" value={formData.doctor_id} onChange={handleChange}>
        <option value="">Select Doctor</option>
        {doctors.map(doc => (
          <option key={doc.id} value={doc.id}>{doc.name}</option>
        ))}
      </select>

      <input
        type="datetime-local"
        name="start_time"
        value={formData.start_time}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="end_time"
        value={formData.end_time}
        onChange={handleChange}
      />

      <button type="submit">Book Appointment</button>
    </form>
  );
}

export default NewApptForm;