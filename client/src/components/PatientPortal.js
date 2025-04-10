import React, { useState } from "react";
import PatientCards from "./PatientCards";
import NewApptForm from "./NewApptForm";
import Auth from "./components/Auth.js"
import { Outlet } from 'react-router-dom'


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

