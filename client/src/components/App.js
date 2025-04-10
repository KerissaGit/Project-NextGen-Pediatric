import "../index.css";

import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet } from "react-router-dom";


import Header from './Header';
import HomePage from './HomePage';
import Appointments from './Appointments';
import Footer from './Footer';



function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Appointments />
      <Footer />
    </div>
  );
}

export default App;
