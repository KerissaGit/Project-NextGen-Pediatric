import "../index.css";

import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";


import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';



function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
