import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import App from "./components/App";
import DoctorContainer from "./components/DoctorContainer";
// import DoctorCards from "./components/DoctorCards";
import PatientPortal from "./components/PatientPortal";
import Appointments from "./components/Appointments";


const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,  // layout component
      children: [
        { index: true, element: <HomePage /> },
        { path: 'appointments', element: <Appointments /> },
        { path: 'doctors', element: <DoctorContainer /> },
        { path: 'portal', element: <PatientPortal /> },
      ],
    }
  ]);


export default router;