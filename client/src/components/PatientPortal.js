import React, { useState } from "react";
// import PatientCards from "./PatientCards";
// import NewApptForm from "./NewApptForm";
import { Outlet } from 'react-router-dom'
import Auth from "./Auth";


function PatientPortal(){
    const [loggedInParent, setLoggedInParent] = useState(null)

    return <div>{
        !!loggedInParent ?
        <Outlet/> :
        <Auth setParent={setLoggedInParent}/>       
        }
          </div>
}
export default PatientPortal;

