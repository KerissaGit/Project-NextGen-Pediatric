// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import DoctorContainer from "./DoctorContainer";
// import PatientPortal from "./PatientPortal";

// function Appointments() {
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5555/children")
//       .then(res => res.json())
//       .then(data => setPatients(data))
//       .catch(err => console.error("Error fetching patients", err));

//     fetch("http://localhost:5555/doctors")
//       .then(res => res.json())
//       .then(data => setDoctors(data))
//       .catch(err => console.error("Error fetching doctors", err));
//   }, []);

//   return (
//     <div className="home-page">
//       <DoctorContainer />
//       <PatientPortal />
//       <Outlet context={{ patients, doctors, setAppointments }} />
//     </div>
//   );
// }

// export default Appointments;



import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DoctorContainer from "./DoctorContainer";
import PatientPortal from "./PatientPortal";

function Appointments() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("/patients")
      .then(resp => resp.json())
      .then(setPatients);

    fetch("/doctors")
      .then(resp => resp.json())
      .then(setDoctors);
  }, []);

  return (
    <div className="home-page">
      <DoctorContainer />
      <PatientPortal />
      <Outlet context={{ patients, doctors, setAppointments }} />
    </div>
  );
}

export default Appointments;
