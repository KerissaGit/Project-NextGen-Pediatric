import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DoctorContainer from "./DoctorContainer";
import PatientPortal from "./PatientPortal";
// import { FormikContext } from "formik"

function Appointments() {
  const [parents, setParents] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("/parents")
      .then(resp => resp.json())
      .then(setParents);
      
    fetch("/appointments")
      .then(resp => resp.json())
      .then(setAppointments);

    fetch("/doctors")
      .then(resp => resp.json())
      .then(setDoctors);
  }, []);
      

  return (
    <div className="appointments">
      <DoctorContainer />
      <PatientPortal />
      <Outlet context={{ parents, doctors, appointments }} />
    </div>
  );
}

export default Appointments;