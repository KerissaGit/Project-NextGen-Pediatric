import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import App from "./components/App";
import DoctorContainer from "./components/DoctorContainer";
import PatientPortal from "./components/PatientPortal";
import Appointments from "./components/Appointments";
import NewApptForm from "./components/NewApptForm"; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'appointments',
        element: <Appointments />,
        children: [
          { path: 'new', element: <NewApptForm /> } 
        ]
      },
      { path: 'doctors', element: <DoctorContainer /> },
      { path: 'portal', element: <PatientPortal /> },
    ],
  }
]);

export default router;
