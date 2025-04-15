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
      element: <App />, 
      children: [
        { index: true, element: <HomePage /> },
        { path: 'appointments', element: <Appointments /> },
        { path: 'doctors', element: <DoctorContainer /> },
        { path: 'portal', element: <PatientPortal /> },
      ],
    }
  ]);


export default router;


// This was the router code I had changed to attempt to get the appointments to work.
// Saving here incase it is what is needed.
// 
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       { index: true, element: <HomePage /> },
//       {
//         path: 'appointments',
//         element: <Appointments />,
//         children: [
//           { path: 'new', element: <NewApptForm /> } 
//         ]
//       },
//       { path: 'doctors', element: <DoctorContainer /> },
//       { path: 'portal', element: <PatientPortal /> },
//     ],
//   }
// ]);

// export default router;