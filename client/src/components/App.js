import "../index.css";
import React from "react";
// import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


import Header from './Header';
// import HomePage from './HomePage';
// import Appointments from './Appointments';
import Footer from './Footer';



function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
