import React, { useState } from "react";
import DoctorContainer from "./DoctorContainer";
import PatientPortal from "./PatientPortal";


function Appointments() {


    return(
        <div className="home-page">
            <DoctorContainer />
            <PatientPortal />
        </div>
    );
}

export default Appointments;
