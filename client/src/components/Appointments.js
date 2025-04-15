// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import DoctorContainer from "./DoctorContainer";
// import PatientPortal from "./PatientPortal";

// function Appointments() {
//   const [parents, setParents] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5555/children")
//       .then(res => res.json())
//       .then(data => setParents(data))
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
//       <Outlet context={{ parents, doctors, setAppointments }} />
//     </div>
//   );
// }

// export default Appointments;


// THIS IS WHERE I STOPPED. Code before was what I had to start and I was trying this
// code below to attempt a fix but had to walk away. Bottom code is probably the way to go.
// The bottom code IS NOT FINISHED but I think it's almost there.


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

    fetch("/doctors")
      .then(resp => resp.json())
      .then(setDoctors);
  }, []);

  return (
    <div className="home-page">
      <DoctorContainer />
      <PatientPortal />
      <Outlet context={{ parents, doctors, setAppointments }} />
    </div>
  );
}

export default Appointments;