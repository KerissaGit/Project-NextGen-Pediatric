import { CreateBrowserRouter } from "react-router-dom":

import App from "./components/App";
import HomePage from "./HomePage";
import DoctorContainer from "./DoctorContainer";
import PatientPortal from "./PatientPortal";

const routes = [
    {
        path: '/',
        element: <App/>,
        children: [
            { index: true, element: <HomePage/>},
            {
                path: 'doctors',
                element: <DoctorContainer/>,
                children: [
                    {index: true, element: <DoctorCards/>}
                ]
            },
            { index: true, element: <PatientPortal/>}
        ]
    }
]
