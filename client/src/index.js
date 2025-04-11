import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom'; // ✅ import this
import router from './router'; // ✅ your router.js file

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} /> {/* ✅ this replaces BrowserRouter + App */}
    </ThemeProvider>
  </React.StrictMode>
);
