import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Products from "./components/Products";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
