import React from "react";
import { Outlet } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

function App() {
  console.log("Header:", Header);
  console.log("Footer:", Footer);
  console.log("Outlet:", Outlet);

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
