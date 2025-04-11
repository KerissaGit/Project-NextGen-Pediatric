import React, { useState } from "react";
// import PatientCards from "./PatientCards";
// import NewApptForm from "./NewApptForm";
import { Outlet } from 'react-router-dom'
import Auth from "./Auth";


function PatientPortal(){
    const [loggedInPArent, setLoggedInPArent] = useState(null)

    return <div>{
        !!loggedInPArent ?
        <Outlet/> :
        <Auth setParent={setLoggedInPArent}/>       
        }
          </div>
}
export default PatientPortal;

